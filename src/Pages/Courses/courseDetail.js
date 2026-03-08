import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseDetail } from "../../Services/courseService";
import { registerCourse } from "../../Services/tutorService";
import { post } from "../../Utils/request";
import { getCookie } from "../../Helpers/cookie";
import { parseJwt } from "../../Helpers/JWT";
import Swal from "sweetalert2";

function CourseDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const token = getCookie("token");
  const [course, setCourse] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = parseJwt(token);
        setIsLoggedIn(true);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const data = await getCourseDetail(slug);
        setCourse(data.course || data.data);
      } catch (error) {
        console.error("There was a problem with fetching course detail:", error);
        Swal.fire("Lỗi", "Không tìm thấy lớp học", "error");
      }
    };
    fetchCourseDetail();
  }, [slug]);

  const handleRegisterCourse = async () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Chưa đăng nhập",
        text: "Vui lòng đăng nhập để nhận lớp",
        icon: "warning"
      }).then(() => navigate("/login"));
      return;
    }

    if (userRole !== "tutor") {
      Swal.fire({
        title: "Không đủ quyền",
        text: "Chỉ gia sư mới có thể nhận lớp",
        icon: "error"
      });
      return;
    }

    try {
      console.log("Registering course:", course);
      const response = await registerCourse(course);
      console.log("Register response:", response);
      
      if (response && response.success) {
        Swal.fire({
          title: "Đăng ký nhận lớp thành công!",
          text: "Chúng tôi sẽ liên hệ với bạn sớm nhất!",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Thanh toán phí",
          cancelButtonText: "Để sau"
        }).then((result) => {
          console.log("Swal result:", result);
          if (result.isConfirmed) {
            handlePayment();
          }
        });
      } else {
        Swal.fire({
          title: "Lỗi",
          text: response?.message || "Đăng ký thất bại",
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Register error:", error);
      Swal.fire({
        title: "Lỗi",
        text: error.response?.data?.message || "Đăng ký thất bại",
        icon: "error"
      });
    }
  };

  const handlePayment = async () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Chưa đăng nhập",
        text: "Vui lòng đăng nhập để thanh toán",
        icon: "warning"
      }).then(() => navigate("/login"));
      return;
    }

    try {
      const response = await post("transactions/create", {
        amount: 500000,
        paymentMethod: "QR_CODE",
        courseId: course._id || course.id
      }, true);

      if (response.success) {
        Swal.fire({
          title: "Tạo giao dịch thành công!",
          text: `Mã giao dịch: ${response.transaction.transactionId}`,
          icon: "success",
          confirmButtonText: "Đến trang thanh toán"
        }).then(() => {
          navigate(`/payment/${response.transaction.transactionId}`);
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Lỗi",
        text: "Không thể tạo giao dịch: " + error.message,
        icon: "error"
      });
    }
  };

  if (!course) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-3">Đang tải thông tin lớp học...</p>
        </div>
      </div>
    );
  }

  // Get image from course data
  const courseImage = course.image 
    ? require(`../../images/${course.image}`)
    : require("../../images/course-1.jpg");

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-12 mb-5">
                  <div className="teacher-details d-md-flex">
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(${courseImage})`,
                      }}
                    />
                    <div className="text">
                      <h3 className="mb-3">
                        {course.subject} - Lớp {course.grade}
                      </h3>
                      
                      <div className="course-info mb-4">
                        <span className="position d-block mb-2">
                          <b>Lương:</b> <span className="text-danger font-weight-bold">{course.salary}</span>
                          <span className="mx-2">|</span>
                          <b>Phí:</b> {course.fee}
                        </span>
                      </div>

                      <div className="details-list">
                        <p><b>Hình thức:</b> Dạy {course.teachingMode}</p>
                        <p><b>Thời gian:</b> {course.schedule}</p>
                        <p><b>Giới tính gia sư:</b> {course.sexTutor}</p>
                        <p><b>Địa chỉ:</b> {course.address}</p>
                        <p><b>Thông tin học sinh:</b> {course.studentInfo}</p>
                        <p><b>Yêu cầu:</b> {course.requirements}</p>
                        <p><b>Liên hệ:</b> <span className="text-primary">{course.contact}</span></p>
                      </div>

                      <div className="mt-4 d-flex gap-2 flex-wrap">
                        {isLoggedIn && userRole === "tutor" ? (
                          <>
                            <button
                              className="btn btn-danger btn-lg mr-2 mb-2"
                              onClick={handleRegisterCourse}
                            >
                              📝 Đăng ký nhận lớp
                            </button>
                            <button
                              className="btn btn-primary btn-lg mb-2"
                              onClick={handlePayment}
                            >
                              💳 Thanh toán phí
                            </button>
                          </>
                        ) : isLoggedIn && (userRole === "student" || userRole === "parent") ? (
                          <>
                            <button
                              className="btn btn-success btn-lg mr-2 mb-2"
                              onClick={() => navigate("/registerCourse")}
                            >
                              📝 Đăng ký tạo lớp mới
                            </button>
                            <button
                              className="btn btn-primary btn-lg mb-2"
                              onClick={handlePayment}
                            >
                              💳 Thanh toán
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn btn-warning btn-lg"
                            onClick={() => navigate("/login")}
                          >
                            🔐 Đăng nhập để nhận lớp
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseDetail;
