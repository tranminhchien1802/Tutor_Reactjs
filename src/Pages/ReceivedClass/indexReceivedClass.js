import React, { useState, useEffect } from "react";
import { get } from "../../Utils/request";

const ReceivedClass = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      setIsLoading(true);
      try {
        const response = await get("courses/my-courses", true);
        if (response.courses) {
          setCourses(response.courses);
        } else {
          setErrorMessage(response.message || "No courses found.");
        }
      } catch (error) {
        setErrorMessage("Unable to load your courses.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="container mx-auto p-4 mt-5">
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {isLoading ? (
        <p>Loading your courses...</p>
      ) : (
        <>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="p-4 border rounded-lg shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {course.subject} - {course.grade}
                  </h3>
                  <p><b>Salary:</b> {course.salary}</p>
                      <p><b>Address:</b> {course.address}</p>
                      <p><b>Requirements:</b> {course.requirements}</p>
                      <p><b>Sessions:</b> {course.sessions}</p>
                      <p><b>Schedule:</b> {course.schedule}</p>
                      <p><b>Student Info:</b> {course.studentInfo}</p>
                      <p><b>Teaching Mode:</b> {course.teachingMode}</p>
                      <p><b>Contact:</b> {course.contact}</p>
                      <p><b>Sex Tutor:</b> {course.sexTutor}</p>
                     
                  {/* Add more course details or actions as needed */}
                </div>
              ))}
            </div>
          ) : (
            <p>You have no courses.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ReceivedClass;