function About() {
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-6 d-flex">
              <div
                className="img img-about align-self-stretch"
                style={{
                  backgroundImage: `url(${require("../../images/bg_3.jpg")})`,
                  width: "100%",
                }}
              />
            </div>
            <div className="col-md-6 pl-md-5">
              <h2 className="mb-4">Chào mừng bạn đến với Gia sư Đóm con</h2>
              <p>
                Gia sư Đóm con là nơi tìm kiếm gia sư uy tín, chất lượng dành
                cho học sinh, sinh viên, người đi làm. Với hệ thống gia sư chất
                lượng, uy tín, giá cả phải chăng, Gia sư Đóm con sẽ giúp bạn
                nhanh chóng tìm được gia sư phù hợp với nhu cầu học tập của
                mình.
              </p>
              <p>
                Gia sư Đóm con cung cấp dịch vụ gia sư tại nhà, gia sư online,
                gia sư qua video call, gia sư qua điện thoại, gia sư qua chat
                trực tuyến, gia sư qua email, gia sư qua tin nhắn. Bạn có thể
                chọn lựa hình thức học phù hợp với mình.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mb-5 ftco-section-3 img"
        style={{ backgroundImage: `url(${require("../../images/bg_4.jpg")})` }}
      >
        <div className="overlay" />
        <div className="container">
          <div className="row d-md-flex justify-content-center">
            <div className="col-md-9 about-video text-center">
              <h2 className="">
                Gia sư Đóm con - Nơi tìm kiếm gia sư uy tín, chất lượng
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default About;
