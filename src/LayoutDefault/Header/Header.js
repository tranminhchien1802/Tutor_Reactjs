import "../../Style/header.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link, useLocation } from "react-router-dom";
import { getCookie } from "../../Helpers/cookie";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { parseJwt } from "../../Helpers/JWT";

function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const location = useLocation();
  const token = getCookie("token");
  let role = "";
  if (token) {
    role = parseJwt(token).role;
  }
  //console.log(role);
  const fullName = getCookie("name");
  const nameUser =
    fullName.split(" ")[fullName.split(" ").length - 1] +
    " " +
    fullName.split(" ")[0];
  // console.log(nameUser);

  const isLogin = useSelector((state) => state.loginReducer);
  const toggleLinks = () => {
    setShowLinks(!showLinks); // Chuyển trạng thái ẩn/hiện
  };
  useEffect(() => {
    if (
      location.pathname === "/profile" ||
      location.pathname === "/logout" ||
      location.pathname === "/request-class" ||
      location.pathname === "/received-classes"||
      location.pathname === "/parent-class" ||
      location.pathname === "/home" ||
      location.pathname === "/about" ||
      location.pathname === "/courses" ||
      location.pathname === "/tutors" ||
      location.pathname === "/contact"
    ) {
      setShowLinks(false);
    }
  }, [location.pathname]);
  return (
    <>
      <Navbar variant="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <i className="fas fa-university"></i> Dom Con <br />
            <small>Gia sư</small>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={NavLink} to="/" className="navbar__item">
                Trang chủ
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="navbar__item">
                Chúng tôi
              </Nav.Link>
              <Nav.Link as={NavLink} to="/courses" className="navbar__item">
                Lớp học
              </Nav.Link>
              <Nav.Link as={NavLink} to="/tutors" className="navbar__item">
                Gia sư
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className="navbar__item">
                Liên hệ
              </Nav.Link>
              <div className="navbar__item cta">
                {token ? (
                  <Nav className="user">
                    <span onClick={toggleLinks} className="user__name">
                      {nameUser}
                    </span>
                    {showLinks && (
                      <div className="user__links">
                        <NavLink to="/profile" className="user__link">
                          Hồ sơ
                        </NavLink>
                        {role === "tutor" ? (
                          <>
                          <NavLink to="/request-class" className="user__link">
                            Lớp học chờ thanh toán
                          </NavLink>
                          <NavLink to="/received-classes" className="user__link">
                            Lớp học đã nhận
                          </NavLink>
                          </>
                        ) : (
                          <NavLink to="/parent-class" className="user__link">
                            Lớp học đã đăng ký
                          </NavLink>
                        )}

                        <NavLink to="/logout" className="user__link">
                          Đăng xuất
                        </NavLink>
                      </div>
                    )}
                  </Nav>
                ) : (
                  <Nav.Link as={NavLink} to="/register">
                    <span>Đăng ký</span>
                  </Nav.Link>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
