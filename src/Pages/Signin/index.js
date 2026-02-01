import "../../css/signin.css";
function Signin() {
  return (
    <>
      <div className="signUp d-flex">
        <div className="signUp__img">
          <img src={require("../../images/course-1.jpg")}></img>
        </div>
        <div className="signUp__form">
          <form className="form ">
            <h2 className="title">Dom Con </h2>
            <p className="message">
              Signin now and get full access to our app.{" "}
            </p>

            <label>
              <input
                required=""
                placeholder=""
                type="email"
                className="input"
              />
              <span>Email</span>
            </label>
            <label>
              <input
                required=""
                placeholder=""
                type="password"
                className="input"
              />
              <span>Password</span>
            </label>

            <button className="submit">Submit</button>
            <div class="social-message">
              <div class="line"></div>
              <p class="message">Login with social accounts</p>
              <div class="line"></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Signin;
