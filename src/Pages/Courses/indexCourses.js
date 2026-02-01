import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../Style/course.scss";
import images from "../../Component/imgCourse";
import { getCourses, searchCourse } from "../../Services/courseService";
import { getCookie } from "../../Helpers/cookie";
import swal from "sweetalert";
function Courses() {
  const token = getCookie("token");
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalCourses] = useState(0);
  const [pageActive, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [filter, setFilter] = useState("");
  const assignRandomImages = (courses) => {
    return courses.map((course) => {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      return { ...course, image: randomImage };
    });
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (search.trim()) {
          const data = await searchCourse(search);
          if (data.courses.length === 0) {
            swal("Không tìm thấy kết quả nào", "Vui lòng thử lại", "error");
          }
          setCourses(assignRandomImages(data.courses));
          setTotalCourses(data.totalPages);
          //console.log("Courses:", data.courses);
        } else if (filter.trim()) {
          const data = await searchCourse(filter);
          setCourses(assignRandomImages(data.courses));
          setTotalCourses(data.totalPages);
          //console.log("Courses:", data.courses);
        } else {
          const data = await getCourses(pageActive);
          setCourses(assignRandomImages(data.courses));
          setTotalCourses(data.totalPages);
          //console.log("Courses:", data.courses);
        }
      } catch (error) {
        console.error(
          "There was a problem with the get courses operation:",
          error
        );
      }
    };
    fetchCourses();
  }, [pageActive, search, filter]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, pageActive - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`pagination__item ${
            i === pageActive ? "pagination__item--active" : ""
          }`}
        >
          <button
            className="pagination__link"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <li
          key="end-ellipsis"
          className="pagination__item pagination__item--disabled"
        >
          <span className="pagination__link">...</span>
        </li>
      );
    }

    return pages;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter("");
    //console.log(e.target[0].value);
    setSearch(searchResult);
  };
  const handleFilter = (e) => {
    e.preventDefault();
    setSearch("");
    setFilter(e.target[0].value);
    //console.log(filter);
  };
  return (
    <>
      <section className="ftco-search-course">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="full-wrap d-flex ">
                <div className="one-third order-last p-5">
                  <h3 className=" text-center mb-4">Bạn muốn tìm kiếm ?</h3>
                  {token ? (
                    <div className="d-flex justify-content-end align-items-center">
                      <p className="mb-0 me-3 text-warning">
                        Hoặc đăng nhu cầu
                      </p>
                      <Link to="/registerCourse" className="btn btn-warning">
                        TẠI ĐÂY
                      </Link>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end align-items-center"></div>
                  )}

                  <form className="course-search-form" onSubmit={handleSearch}>
                    <div className="form-group d-flex">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập lớp học bạn muốn tìm kiếm"
                        value={searchResult}
                        onChange={(e) => setSearchResult(e.target.value)}
                      />
                      <input
                        type="submit"
                        value="Tìm kiếm"
                        className="submit ml-2"
                      />
                    </div>
                  </form>
                  <form
                    action="#"
                    className="course-search-form"
                    onSubmit={handleFilter}
                  >
                    <div className="form-group d-flex">
                      <select
                        className="form-control"
                        defaultValue=""
                        name="filter"
                      >
                        <option value="" disabled>
                          Chọn môn học
                        </option>
                        <option value="Toán">Toán</option>
                        <option value="Ngữ văn">Ngữ văn</option>
                        <option value="Tiếng Anh">Tiếng Anh</option>
                        <option value="Lý">Lý</option>
                      </select>
                      <input
                        type="submit"
                        value="Lọc"
                        className="submit ml-2"
                      />
                    </div>
                  </form>
                </div>
                <div
                  className="one-forth order-first img"
                  style={{
                    backgroundImage: `url(${require("../../images/image_1.jpg")})`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section">
        <div className="container">
          <div className="row">
            {courses.map((course) => (
              <div className="col-md-4 d-flex" key={course.slug}>
                <div className="course align-self-stretch">
                  <a
                    href="#"
                    className="img"
                    style={{
                      backgroundImage: `url(${course.image})`,
                    }}
                  />
                  <div className="text p-4">
                    <p className="category">
                      Lương: <span className="price">{course.salary}</span>
                    </p>
                    <h3 className="mb-3">
                      <p className="text-decoration-none">
                        {course.subject} - {course.grade}
                      </p>
                    </h3>
                    <p>
                      <b>Địa chỉ:</b> {course.address}
                    </p>
                    <p>
                      <b>Giới tính:</b> {course.sexTutor}
                    </p>
                    <p>
                      <b>Yêu cầu: </b>
                      {course.requirements}
                    </p>
                    {token ? (
                      <p className="d-flex justify-content-around">
                        <Link to={`${course.slug}`} className="btn btn-primary">
                          Xem chi tiết
                        </Link>
                        <Link to={`${course.slug}`} className="btn btn-danger">
                          Nhận lớp
                        </Link>
                      </p>
                    ) : (
                      <p className="d-flex justify-content-around"></p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="ftco-page">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <nav>
              <ul className="pagination">
                <li
                  className={`pagination__item ${
                    pageActive === 1 ? "pagination__item--disabled" : ""
                  }`}
                >
                  <button
                    className="pagination__link"
                    onClick={() => handlePageChange(pageActive - 1)}
                  >
                    Previous
                  </button>
                </li>
                {renderPagination()}
                <li
                  className={`pagination__item ${
                    pageActive === totalPages
                      ? "pagination__item--disabled"
                      : ""
                  }`}
                >
                  <button
                    className="pagination__link"
                    onClick={() => handlePageChange(pageActive + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
export default Courses;
