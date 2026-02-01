import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Style/home.scss";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import useCounters from "../../Hooks/useCounter";
import Slider from "react-slick";
function Home() {
  const counters = [
    { id: 1, value: 10300, label: "Đánh giá tích cực" },
    { id: 2, value: 7896, label: "Lớp học hoàn thành" },
    { id: 3, value: 400, label: "Gia sư uy tín" },
    { id: 4, value: 200, label: "Phụ huynh hài lòng" },
  ];
  const counts = useCounters(counters);

  const owlSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div
        className="hero-wrap"
        style={{
          backgroundImage: `url(${require("../../images/bg_1.jpg")})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="overlay " />
        <div className="container mt-4">
          <div
            className="row no-gutters slider-text align-items-center justify-content-center"
            data-scrollax-parent="true"
          >
            <div className="col-md-8 text-center">
              <h1 className="mb-4">Hệ Thống Gia Sư Đóm Con Tại Việt Nam</h1>
              <p>
                <NavLink
                  to="/tutors"
                  className="btn btn__feature btn-primary px-4 py-3"
                >
                  Xem Gia sư
                </NavLink>
                <NavLink
                  to="/courses"
                  className="btn btn__feature btn-secondary px-4 py-3"
                >
                  Xem Lớp học
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="ftco-counter bg-light" id="section-counter">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="row">
                {counters.map((counter, index) => (
                  <div
                    key={counter.id}
                    className="col-md-3 d-flex justify-content-center counter-wrap statics"
                  >
                    <div className="block-18 text-center">
                      <div className="text">
                        <strong className="number">{counts[index]}</strong>
                        <span>{counter.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" ftco-section testimony-section">
        <div className="container">
          <div className="row justify-content-center mb-3 pb-3">
            <div className="col-md-7 heading-section text-center">
              <h1 className="mb-4">Đánh giá về chúng tôi</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Slider {...owlSettings}>
                <div className="testimony-wrap text-center">
                  <div
                    className="user-img mt-2 mb-4"
                    style={{
                      backgroundImage: `url(${require("../../images/person_1.jpg")})`,
                    }}
                  ></div>
                  <div className="text">
                    <p className="mb-5">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts.
                    </p>
                    <p className="name">Dennis Green</p>
                    <span className="position">CSE Student</span>
                  </div>
                </div>
                <div className="testimony-wrap text-center">
                  <div
                    className="user-img mt-2 mb-4"
                    style={{
                      backgroundImage: `url(${require("../../images/person_2.jpg")})`,
                    }}
                  ></div>
                  <div className="text">
                    <p className="mb-5">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts.
                    </p>
                    <p className="name">Dennis Green</p>
                    <span className="position">Math Student</span>
                  </div>
                </div>
                <div className="testimony-wrap text-center">
                  <div
                    className="user-img mt-2 mb-4"
                    style={{
                      backgroundImage: `url(${require("../../images/person_3.jpg")})`,
                    }}
                  ></div>
                  <div className="text">
                    <p className="mb-5">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts.
                    </p>
                    <p className="name">Dennis Green</p>
                    <span className="position">Math Student</span>
                  </div>
                </div>
                <div className="testimony-wrap text-center">
                  <div
                    className="user-img mt-2 mb-4"
                    style={{
                      backgroundImage: `url(${require("../../images/person_4.jpg")})`,
                    }}
                  ></div>
                  <div className="text">
                    <p className="mb-5">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts.
                    </p>
                    <p className="name">Dennis Green</p>
                    <span className="position">Math Student</span>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section text-center">
              <h1 className="mb-4">Gia sư tiêu biểu</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-sm-4">
              <div className="staff">
                <div className="d-flex mb-4">
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url(${require("../../images/person_1.jpg")})`,
                    }}
                  />
                  <div className="info ml-4">
                    <h3>
                      <Link to="/detail" className="text-decoration-none">
                        Ivan Jacobson
                      </Link>
                    </h3>
                    <span className="position">CSE Teacher</span>
                    <p className="ftco-social d-flex">
                      <a
                        href="#"
                        className="d-flex justify-content-center align-items-center text-decoration-none"
                      >
                        <span className="fab fa-twitter" />
                      </a>
                      <a
                        href="#"
                        className="d-flex justify-content-center align-items-center text-decoration-none"
                      >
                        <span className="fab fa-facebook" />
                      </a>
                      <a
                        href="#"
                        className="d-flex justify-content-center align-items-center text-decoration-none"
                      >
                        <span className="fab fa-instagram" />
                      </a>
                    </p>
                  </div>
                </div>
                <div className="text">
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic life One day
                    however a small line of blind text by the name
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-sm-4">
              <div className="staff">
                <div className="d-flex mb-4">
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url(${require("../../images/person_2.jpg")})`,
                    }}
                  />
                  <div className="info ml-4">
                    <h3>
                      <Link to="/detail" className="text-decoration-none">
                        Ivan Jacobson
                      </Link>
                    </h3>
                    <span className="position">CSE Teacher</span>
                    <p className="ftco-social d-flex">
                      <a
                        href="#"
                        className="d-flex justify-content-center align-items-center text-decoration-none"
                      >
                        <span className="fab fa-twitter" />
                      </a>
                      <a
                        href="#"
                        className="d-flex justify-content-center align-items-center text-decoration-none"
                      >
                        <span className="fab fa-facebook" />
                      </a>
                      <a
                        href="#"
                        className="d-flex justify-content-center align-items-center text-decoration-none"
                      >
                        <span className="fab fa-instagram" />
                      </a>
                    </p>
                  </div>
                </div>
                <div className="text">
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic life One day
                    however a small line of blind text by the name
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-sm-4">
              <div className="staff">
                <div className="d-flex mb-4">
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url(${require("../../images/person_3.jpg")})`,
                    }}
                  />
                  <div className="info ml-4">
                    <h3>
                      <Link to="/detail" className="text-decoration-none">
                        Ivan Jacobson
                      </Link>
                    </h3>
                    <span className="position">CSE Teacher</span>
                    <p className="ftco-social d-flex">
                      <a
                        href="#"
                        className="d-flex justify-content-center align-items-center text-decoration-none"
                      >
                        <span className="fab fa-twitter" />
                      </a>
                      <a
                        href="#"
                        className="d-flex justify-content-center align-items-center text-decoration-none"
                      >
                        <span className="fab fa-facebook" />
                      </a>
                      <a
                        href="#"
                        className="d-flex justify-content-center align-items-center text-decoration-none"
                      >
                        <span className="fab fa-instagram" />
                      </a>
                    </p>
                  </div>
                </div>
                <div className="text">
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic life One day
                    however a small line of blind text by the name
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5 text">
          <div className="col-md-10">
            <p>
              <strong>Khi cô đến ngôi trường đầu tiên</strong> trong hành trình
              làm gia sư, cô đã có một cái nhìn cuối cùng về những học sinh mà
              mình từng dạy, những lớp học mà cô đã gắn bó và con đường dẫn đến
              lớp học của mình. Một câu hỏi về sự nghiệp giảng dạy lướt qua tâm
              trí cô, rồi cô tiếp tục con đường của mình.
            </p>
            <p>
              <span>Bạn muốn xem nhiều hơn?</span>
              <Link to="/tutors" className="text-decoration-none">
                {" "}
                Xem tất cả Gia sư
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="ftco-freeTrial mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center">
                <div className="free-trial ">
                  <h3>Try our free trial course</h3>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic life
                  </p>
                </div>
                <div className="btn-join ">
                  <p>
                    <Link to="/signup" className="btn btn-primary py-3 px-4">
                      Join now!
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Home;
