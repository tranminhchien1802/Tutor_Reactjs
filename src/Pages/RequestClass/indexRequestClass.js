import React, { useState, useEffect } from "react";
import { get, post } from "../../Utils/request";
import { useNavigate } from "react-router-dom";

const IndexRequestClass = () => {
  const [courses, setCourses] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await get("courses/registrations", true);
        setCourses(
          response.pendingRegistrations.map((reg) => ({
            id: reg.registrationId,
            subject: reg.course.subject,
            grade: reg.course.grade,
            salary: reg.course.salary,
            address: reg.course.address,
            sexTutor: reg.course.sexTutor,
            requirements: reg.course.requirements,
            slug: reg.course.slug,
          }))
        );
      } catch (error) {
        setErrorMessage("Không thể tải danh sách lớp học.");
      }
    };

    fetchCourses();
  }, []);

  const navigate = useNavigate();

  const handlePayment = async (courseSlug) => {
    setIsProcessing(true);
    setErrorMessage("");
    try {
      const createResponse = await post(
        `transactions/${courseSlug}`,
        { paymentMethod: "QR Scan" },
        true
      );
      const transactionId = createResponse.transaction._id;
      navigate(`/payment/${transactionId}`);
    } catch (error) {
      setErrorMessage("Không thể tạo giao dịch. Vui lòng thử lại sau.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-5">
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {isProcessing && <p>Đang xử lý, vui lòng chờ...</p>}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                {course.subject} - {course.grade}
              </h3>
              <p><b>Lương:</b> {course.salary}</p>
              <p><b>Địa chỉ:</b> {course.address}</p>
              <p><b>Yêu cầu:</b> {course.requirements}</p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => handlePayment(course.slug)}
                disabled={isProcessing}
              >
                Thanh toán
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có lớp học nào cần thanh toán.</p>
      )}
    </div>
  );
};

export default IndexRequestClass;
