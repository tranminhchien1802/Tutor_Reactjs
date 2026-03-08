import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../Helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../Action/login";
import Swal from "sweetalert2";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    deleteAllCookies();
    dispatch(checkLogin(false));
    Swal.fire({
      title: "Thành công!",
      text: "Bạn đã đăng xuất thành công!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      navigate("/login");
    });
  }, []);

  return null;
}

export default Logout;
