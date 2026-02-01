import React from "react";
import { getMyCourse, deleteCourse } from "../../Services/parentService";
import { useEffect, useState } from "react";
const ParentClass = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getCourse = async () => {
      try {
        const data = await getMyCourse();
        //console.log(data.courses);
        setCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getCourse();
  }, [courses]);
  const handleDelete = async (slug) => {
    try {
      const data = await deleteCourse(slug);
      console.log(data);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };
  return (
    <div className="container mx-auto p-4 mt-5">
      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                {course.subject} - {course.grade}
              </h3>
              <p className="mb-1">
                <b>Lương:</b> <span className="price">{course.salary}</span>
              </p>
              <p className="mb-1">
                <b>Hình thức dạy:</b>{" "}
                <span className="mode">{course.teachingMode}</span>
              </p>
              <p className="mb-1">
                <b>Thời gian:</b>{" "}
                <span className="schedule">{course.schedule}</span>
              </p>
              <p className="mb-1">
                <b>Địa chỉ:</b> {course.address}
              </p>
              <p className="mb-1">
                <b>Giới tính yêu cầu:</b> {course.sexTutor}
              </p>
              <p className="mb-2">
                <b>Yêu cầu:</b> {course.requirements}
              </p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => handleDelete(course.slug)}
              >
                Hủy đăng ký
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h1>Bạn chưa đăng ký lớp học nào cả </h1>
      )}
    </div>
  );
};

export default ParentClass;
