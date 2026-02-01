import MapComponent from "../../Component/map";
import "../../Style/contact.css";
function Contact() {
  return (
    <>
      {/* <div
        className="hero-wrap hero-wrap-2"
        style={{
          backgroundImage: `url(${require("../../images/bg_2.jpg")})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="overlay" />
        <div className="container">
          <div
            className="row no-gutters slider-text align-items-center justify-content-center"
            data-scrollax-parent="true"
          >
            <div className="col-md-8  text-center">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="index.html">Home</a>
                </span>{" "}
                <span>Contact</span>
              </p>
              <h1 className="mb-3 bread">Contact Us</h1>
            </div>
          </div>
        </div>
      </div> */}

      <section className="ftco-section contact-section ftco-degree-bg">
        <div className="container">
          <div className="row d-flex mb-5 contact-info">
            <div className="col-md-12 mb-4">
              <h2 className="h4">THÔNG TIN LIÊN HỆ</h2>
            </div>
            <div className="w-100" />
            <div className="col-md-6">
              <p>
                <span>Address:</span> 1 Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP. HCM
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <span>Phone:</span> <a href="tel://1234567920">+ 0786160270</a>
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <span>Email:</span>{" "}
                <a href="mailto:info@yoursite.com">chien180203@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="d-flex row block-9">
            <div className="col-md-6 pr-md-5">
              <h4 className="mb-4">Bạn có thắc mắc gì với chúng tôi?</h4>
              <form action="#">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ tên"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Chủ đề"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={7}
                    className="form-control"
                    placeholder="Lời nhắn"
                    defaultValue={""}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    defaultValue="Send Message"
                    className="btn btn-primary py-3 px-5"
                    value="Gửi tin nhắn"
                  />
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <MapComponent className="map" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Contact;
