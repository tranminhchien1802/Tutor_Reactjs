import "../../Style/signin.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Login } from "../../Services/userService";
import { setCookie } from "../../Helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../Action/login";
import swal from "sweetalert";
function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    // mai.nguyen@example.com
    try {
      const data = await Login(email, password);
     // console.log('data',data)
      if (data.length !== 0) {
        setCookie("token", data.token, 1);
        setCookie("name", data.name, 1);
        setCookie("userId", data._id, 1); // Lưu userId
        dispatch(checkLogin(true));
        swal("Thành công!", "Bạn đã đăng nhập thành công!", "success");
        navigate("/");
      } else {
        swal("Lỗi", "Thông tin đăng nhập không hợp lệ", "error");
      }
    } catch (err) {
      swal("Lỗi", "Thông tin đăng nhập không hợp lệ", "error");
    }
  };
  return (
    <>
      <div className="signIn d-flex mt-4">
        <div className="signUp__img mr-5 ml-5">
          <img src={require("../../images/course-1.jpg")}></img>
        </div>
        <div className="signUp__form">
          <form className="form" onSubmit={handleLogin}>
            <h2 className="title">Dom Con </h2>
            <p className="message">Đăng nhập để tận hưởng mọi lợi ích. </p>

            <label>
              <input
                required=""
                placeholder=""
                type="email"
                className="input email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Email</span>
            </label>
            <label>
              <input
                required=""
                placeholder=""
                type="password"
                className="input password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Mật khẩu</span>
            </label>

            <button className="submit">Đăng nhập</button>
            <p className="signin">
              <Link to="/forget">Quên mật khẩu</Link>
            </p>
            <p className="signin">
              Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </p>
            <div className="socialSign">
              <p className="message">---------- Hoặc ----------</p>
              <div className="social">
                <button className="social__icon">
                  <i className="fa-brands fa-facebook mr-2"></i>
                  <span>Facebook</span>
                </button>
                <button className="social__icon">
                  <i className="fab fa-google mr-2"></i>
                  <span>Google</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Signin;
