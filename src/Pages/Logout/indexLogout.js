import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../Helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../Action/login";
import swal from "sweetalert";
function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  deleteAllCookies();
  useEffect(() => {
    dispatch(checkLogin(false));
    swal("Thành công!", "Bạn đã đăng xuất thành công!", "success");
    navigate("/login");
  }, []);

  return;
  <></>;
}
export default Logout;
