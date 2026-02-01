import { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/signup.css";

function Signup() {
  const [role, setRole] = useState(""); // State để lưu trữ role

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <>
      <div className="signUp d-flex">
        <div className="signUp__img">
          <img src={require("../../images/course-1.jpg")} alt="Signup" />
        </div>
        <div className="signUp__form">
          <form className="form">
            <h2 className="title">Register</h2>
            <p className="message">Sign up now and get full access to our app.</p>

            <div className="flex">
              <label>
                <input
                  required
                  placeholder=""
                  type="text"
                  className="input"
                />
                <span>Firstname</span>
              </label>
              <label>
                <input
                  required
                  placeholder=""
                  type="text"
                  className="input"
                />
                <span>Lastname</span>
              </label>
            </div>

            <label>
              <input required placeholder="" type="email" className="input" />
              <span>Email</span>
            </label>
            <label>
              <input
                required
                placeholder=""
                type="password"
                className="input"
              />
              <span>Password</span>
            </label>
            <label>
              <input
                required
                placeholder=""
                type="password"
                className="input"
              />
              <span>Confirm password</span>
            </label> 

            {/* Label chọn role */}
            {/* <label htmlFor="role">Role:</label> */}
            <select id="role" value={role} onChange={handleRoleChange} className="input">
              <option value="">-- Chọn role --</option>
              <option value="tutor">Gia sư</option>
              <option value="parent">Phụ huynh</option>
            </select>

            {/* Các trường bổ sung cho gia sư */}
            {role === "tutor" && (
              <div>
                <label>
                  <input
                    required
                    placeholder=""
                    type="text"
                    className="input"
                  />
                  <span>Address</span>
                </label>
                <label>
                  <textarea
                    required
                    placeholder=""
                    className="input"
                  />
                  <span>Introduction</span>
                </label>
                <label>
                  <input
                    required
                    placeholder=""
                    type="text"
                    className="input"
                  />
                  <span>Specialization</span>
                </label>
                {/* Thêm các trường khác cho gia sư tại đây */}
              </div>
            )}

            <button className="submit">Submit</button>
            <p className="signin">
              Already have an acount ? <Link to="/signin">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;