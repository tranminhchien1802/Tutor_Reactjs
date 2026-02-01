import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import images from "../../Component/imgCourse";
import { getCourseDetail } from "../../Services/courseService";
import { registerCourse } from "../../Services/tutorService";
import { getCookie } from "../../Helpers/cookie";
import { parseJwt } from "../../Helpers/JWT";
import swal from "sweetalert";
const randomImage = images[Math.floor(Math.random() * images.length)];
function CourseDetail() {
  const token = getCookie("token");
  const role = parseJwt(token).role;
  //console.log(role);
  const { slug } = useParams();
  const [course, setCourse] = useState([]);
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const data = await getCourseDetail(slug);
        setCourse(data.course);
      } catch (error) {
        console.error(
          "There was a problem with fetching course detail:",
          error
        );
      }
    };

    fetchCourseDetail();
  }, [slug]);
  const handleClick = async () => {
    try {
      const courseData = await registerCourse(course);
      //console.log(courseData);
      if (courseData) {
        swal("Đăng ký nhận lớp thành công", {
          icon: "success",
        });
      } else {
        swal("Đăng ký nhận lớp thất bại", {
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
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
                        backgroundImage: `url(${randomImage})`,
                      }}
                    />
                    <div className="text">
                      <h3>
                        {course.subject} - Lớp {course.grade}
                      </h3>
                      <span className="position">
                        Lương: {course.salary} - Phí: {course.fee}
                      </span>
                      <p>
                        <b>Hình thức: </b>
                        Dạy {course.teachingMode}
                      </p>
                      <p>
                        <b>Thời gian: </b> {course.schedule}
                      </p>
                      <p>
                        <b>Giới tính: </b> {course.sexTutor}
                      </p>
                      <p>
                        <b>Địa chỉ: </b>
                        {course.address}
                      </p>
                      <p>
                        <b>Thông tin: </b>
                        {course.studentInfo}
                      </p>
                      <p>
                        <b>Yêu cầu: </b>
                        {course.requirements}
                      </p>
                      <p>
                        <b>Liên hệ: </b>
                        {course.contact}
                      </p>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          if (role === "tutor") {
                            handleClick();
                          } else {
                            swal("Bạn không thể đăng ký nhận lớp", {
                              icon: "error",
                            });
                          }
                        }}
                      >
                        Đăng ký nhận lớp
                      </button>
                      <div className="mt-4"></div>
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
