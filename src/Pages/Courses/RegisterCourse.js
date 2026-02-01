import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createCourse } from "../../Services/parentService";
import swal from "sweetalert";
import { getCookie } from "../../Helpers/cookie";
import { parseJwt } from "../../Helpers/JWT";
const RegisterCourse = () => {
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    address: "",
    salary: "",
    sessions: "",
    schedule: "",
    studentInfo: "",
    requirements: "",
    teachingMode: "",
    contact: "",
    sexTutor: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const token = getCookie("token");
  const role = parseJwt(token).role;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subject) newErrors.subject = "Vui lòng nhập môn học.";
    if (!formData.grade) newErrors.grade = "Vui lòng nhập lớp.";
    if (!formData.address) newErrors.address = "Vui lòng nhập địa chỉ.";
    if (!formData.salary || formData.salary <= 0)
      newErrors.salary = "Lương phải lớn hơn 0.";
    if (!formData.sessions || formData.sessions <= 0)
      newErrors.sessions = "Số buổi phải lớn hơn 0.";
    if (!formData.schedule) newErrors.schedule = "Vui lòng nhập lịch học.";
    if (!formData.studentInfo)
      newErrors.studentInfo = "Vui lòng nhập thông tin học sinh.";
    if (!formData.requirements)
      newErrors.requirements = "Vui lòng nhập yêu cầu gia sư.";
    if (!formData.teachingMode)
      newErrors.teachingMode = "Vui lòng chọn hình thức dạy.";
    if (!formData.contact)
      newErrors.contact = "Vui lòng nhập thông tin liên hệ.";
    if (!formData.sexTutor) newErrors.sexTutor = "Vui lòng chọn giới tính.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // setIsSubmitted(true);
      // console.log("Form Data Submitted:", formData);
      if (role === "Tutor") {
        swal(
          "Đăng ký thất bại!",
          "Chỉ phụ huynh mới có thể đăng ký lớp học!",
          "error"
        );
        return;
      } else {
        try {
          const response = await createCourse(formData);
          console.log(response);
          if (response) {
            swal(
              "Đăng ký thành công!",
              "Chúng tôi sẽ liên hệ sớm nhất có thể!",
              "success"
            );
          } else {
            swal("Đăng ký thất bại!", "Vui lòng thử lại sau!", "error");
          }
        } catch (error) {
          console.error("Error:", error);
          swal("Đăng ký thất bại!", "Vui lòng thử lại sau!", "error");
        }
      }
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <>
      {" "}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Đăng ký khóa học</h1>
          <form onSubmit={handleSubmit}>
            {/* Môn */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Môn học</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Nhập môn học"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            {/* Lớp */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Lớp</label>
              <input
                type="number"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Nhập lớp"
              />
              {errors.grade && (
                <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
              )}
            </div>

            {/* Địa chỉ */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Nhập địa chỉ"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Lương */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Lương</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Nhập lương đề xuất"
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
              )}
            </div>

            {/* Số buổi */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Số buổi một tuần
              </label>
              <input
                type="number"
                name="sessions"
                value={formData.sessions}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Nhập số buổi học trong tuần"
              />
              {errors.sessions && (
                <p className="text-red-500 text-sm mt-1">{errors.sessions}</p>
              )}
            </div>

            {/* Lịch học */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Lịch học</label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Nhập lịch học"
              />
              {errors.schedule && (
                <p className="text-red-500 text-sm mt-1">{errors.schedule}</p>
              )}
            </div>

            {/* Mô tả thông tin */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Thông tin học sinh (VD: học lực học sinh, yêu cầu học sinh, ...)
              </label>
              <textarea
                name="studentInfo"
                value={formData.studentInfo}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Thông tin về học sinh"
                rows="3"
              />
              {errors.studentInfo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.studentInfo}
                </p>
              )}
            </div>

            {/* Yêu cầu gia sư */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Yêu cầu gia sư
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Yêu cầu về gia sư"
                rows="3"
              />
              {errors.requirements && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.requirements}
                </p>
              )}
            </div>

            {/* Hình thức dạy */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Hình thức
              </label>
              <select
                name="teachingMode"
                value={formData.teachingMode}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Chọn hình thức</option>
                <option value="Offline">Trực tiếp</option>
                <option value="Online">Online</option>
              </select>
              {errors.teachingMode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.teachingMode}
                </p>
              )}
            </div>

            {/* Liên hệ */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Liên hệ</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Nhập số điện thoại"
                pattern="[0-9]{10}" // Đảm bảo rằng số điện thoại có 10 chữ số
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
              )}
            </div>

            {/* Giới tính gia sư */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Giới tính gia sư
              </label>
              <select
                name="sexTutor"
                value={formData.sexTutor}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
              {errors.sexTutor && (
                <p className="text-red-500 text-sm mt-1">{errors.sexTutor}</p>
              )}
            </div>

            {/* Nút đăng ký */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Đăng ký
              </button>
            </div>
          </form>

          {/* Thông báo thành công */}
          {isSubmitted && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
              <p>Đăng ký thành công!</p>
              <Link to="/courses" className="btn btn-warning">
                Trở về
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterCourse;
