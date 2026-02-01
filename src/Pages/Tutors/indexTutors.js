import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../Style/course.scss";
import {
  getTutors,
  searchTutor,
  filterTutor,
} from "../../Services/tutorService";
import swal from "sweetalert";
import { getCookie } from "../../Helpers/cookie";

function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [pageActive, setPageActive] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const token = getCookie("token");
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        if (search.trim()) {
          const data = await searchTutor(search);
          //console.log(data);
          if (data.tutors.length === 0) {
            swal("Không tìm thấy kết quả nào", "Vui lòng thử lại", "error");
          }
          setTutors(data.tutors);
          setTotalPage(data.pagination.totalPages);
        } else if (filter.trim()) {
          const data = await filterTutor(filter);
          setTutors(data.tutors);
          setTotalPage(data.pagination.totalPages);
        } else {
          const data = await getTutors(pageActive);
          //console.log(data.data);
          setTutors(data.data);
          setTotalPage(data.pagination.totalPages);
        }
      } catch (error) {
        console.error("There was a problem with fetching tutors:", error);
      }
    };

    fetchTutors();
  }, [pageActive, search, filter]);

  const handlePageChange = (newPage) => {
    setPageActive(newPage);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    setFilter("");
    setSearch(e.target[0].value);
    //console.log("search", search);
  };
  const handleFilter = async (e) => {
    e.preventDefault();
    setSearch("");
    //console.log(e.target[0].value);
    setFilter(e.target[0].value);
  };
  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(0, pageActive - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPage, startPage + maxPagesToShow);

    for (let i = startPage; i < endPage; i++) {
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
            {i + 1}
          </button>
        </li>
      );
    }

    if (endPage < totalPage) {
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

  return (
    <>
      <section className="ftco-search-course">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="full-wrap d-flex ">
                <div className="one-third order-last p-5">
                  <h3 className=" text-center mb-4">Bạn muốn tìm kiếm ?</h3>
                  <form
                    action="#"
                    className="course-search-form"
                    onSubmit={handleSearch}
                  >
                    <div className="form-group d-flex">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập Gia sư bạn muốn tìm kiếm"
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
                      <select className="form-control" defaultValue="">
                        <option value="" disabled>
                          Chọn môn học
                        </option>
                        <option value="Tiếng Anh">Tiếng Anh</option>
                        <option value="Toán học">Toán học</option>
                        <option value="Lịch sử">Lịch sử</option>
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

      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3"></div>
          <div className="row">
            {tutors.map((tutor) => (
              <div className="col-lg-4 mb-sm-4" key={tutor._id}>
                <div className="staff">
                  <div className="d-flex mb-4">
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(${
                          tutor.avatar
                            ? tutor.avatar
                            : require("../../images/image_default.png")
                        })`,
                      }}
                    />
                    <div className="info ml-4">
                      <h3>
                        <Link
                          to={token ? `/tutors/${tutor.slug}` : "#"}
                          className="text-decoration-none text-black"
                        >
                          {tutor.name}
                        </Link>
                      </h3>
                      <span className="position">{tutor.specialization}</span>
                      <p className="ftco-social d-flex">
                        <Link
                          to="#"
                          className="d-flex justify-content-center align-items-center text-decoration-none"
                        >
                          <span className="fab fa-twitter" />
                        </Link>
                        <Link
                          to="#"
                          className="d-flex justify-content-center align-items-center text-decoration-none"
                        >
                          <span className="fab fa-facebook" />
                        </Link>
                        <Link
                          to="#"
                          className="d-flex justify-content-center align-items-center text-decoration-none"
                        >
                          <span className="fab fa-instagram" />
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="text">
                    <p>{tutor.introduction}</p>
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
                    pageActive === 0 ? "pagination__item--disabled" : ""
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
                    pageActive === totalPage - 1
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

export default Tutors;
