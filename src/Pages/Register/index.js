import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Style/signup.css";
import { Register } from "../../Services/userService";
import swal from "sweetalert";
function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [introduction, setIntroduction] = useState("");
  // Validation for password
  const [password, setPassword] = useState("");
  const [errorPassMessage, setErrorPassMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // console.log(newPassword);
    // console.log(isValid);
    if (newPassword.length === 0) setIsValid(true);
    else if (validatePassword(newPassword)) {
      setIsValid(true);
    } else {
      setErrorPassMessage(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
      setIsValid(false);
    }
  };
  // Validation for email
  const [email, setEmail] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail.length === 0) setIsValidEmail(true);
    else if (validateEmail(newEmail)) {
      setIsValidEmail(true);
    } else {
      setErrorEmailMessage("Email phải có dạng @gmail.com");
      setIsValidEmail(false);
    }
  };
  // Role change handler
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      name,
      email,
      password,
      address,
      phoneNumber,
      role,
      specialization,
      introduction,
      confirmPassword,
    };

    try {
      const response = await Register(options);
      //console.log(response);
      if (response.message === "Đăng ký thành công.") {
        swal("Thành công", response.message, "success");
        navigate("/login"); // Navigate to the login page after successful registration
      } else {
        swal(
          "Lỗi",
          response.message || "Thông tin đăng ký không hợp lệ",
          "error"
        );
      }
    } catch (error) {
      console.error("There was a problem with the signup operation:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        swal("Lỗi", error.response.data.message, "error");
      } else {
        swal("Lỗi", "Đăng ký thất bại", "error");
      }
    }
  };
  return (
    <>
      <div className="signUp d-flex mt-4">
        <div className="signUp__img mr-5 ml-5">
          <img src={require("../../images/course-1.jpg")} alt="Signup" />
        </div>
        <div className="signUp__form">
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="title">Đăng ký</h2>
            <label>
              <input
                required
                placeholder=""
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>Họ và Tên</span>
            </label>

            <label>
              <input
                required
                placeholder=""
                type="email"
                className="input"
                value={email}
                onChange={handleChangeEmail}
              />
              <span>Email</span>
              {!isValidEmail && (
                <span id="email-error" className="text-danger">
                  {errorEmailMessage}
                </span>
              )}
            </label>
            <label>
              <input
                required
                placeholder=""
                type="text"
                className="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <span>Địa chỉ</span>
            </label>
            <label>
              <input
                required
                placeholder=""
                type="text"
                className="input"
                value={phoneNumber}
                onChange={(e) => setPhone(e.target.value)}
              />
              <span>Số điện thoại</span>
            </label>
            <label>
              <input
                required
                placeholder=""
                type="password"
                className="input"
                value={password}
                onChange={handlePasswordChange}
              />
              <span>Mật khẩu</span>
              {!isValid && (
                <span id="password-error" className="text-danger">
                  {errorPassMessage}
                </span>
              )}
            </label>
            <label>
              <input
                required
                placeholder=""
                type="password"
                className="input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span>Xác nhận mật khẩu</span>
            </label>

            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="input"
            >
              <option value="">-- Chọn vai trò --</option>
              <option value="tutor">Gia sư</option>
              <option value="parent">Phụ huynh</option>
            </select>

            {/* Các trường bổ sung cho gia sư */}
            {role === "tutor" && (
              <div>
                <label className="tutor">
                  <input
                    required
                    placeholder=""
                    type="text"
                    className="input"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  />
                  <span>Chuyên môn</span>
                </label>
                <label className="tutor Intro">
                  <textarea
                    required
                    placeholder="Giới thiệu"
                    className="input"
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                  />
                  {/* <span>Introduction</span> */}
                </label>
                {/* Thêm các trường khác cho gia sư tại đây */}
              </div>
            )}

            <button className="submit">Đăng ký</button>
            <p className="signin">
              Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
