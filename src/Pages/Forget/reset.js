import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Lấy email từ localStorage
  const email = localStorage.getItem("email");

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Xác nhận mật khẩu không đúng.");
      setSuccessMessage("");
    } else if (password.length < 6) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự.");
      setSuccessMessage("");
    } else {
      try {
        // Gửi yêu cầu đến backend để đặt lại mật khẩu
        const response = await fetch("http://localhost:5000/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword: password }), // Gửi email từ localStorage
        });

        if (response.ok) {
          setSuccessMessage("Đổi mật khẩu thành công. Quay lại đăng nhập...");
          setErrorMessage("");

          // Chuyển hướng sau khi thành công
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Đặt lại mật khẩu thất bại.");
          setSuccessMessage("");
        }
      } catch (error) {
        setErrorMessage(
          "Đã xảy ra lỗi khi đặt lại mật khẩu. Vui lòng thử lại."
        );
        setSuccessMessage("");
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Đặt Lại Mật Khẩu
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Nhập mật khẩu mới và xác nhận mật khẩu.
        </p>

        {/* Password Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="password"
          >
            Mật khẩu mới:
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập mật khẩu mới"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="confirm-password"
          >
            Xác nhận mật khẩu:
          </label>
          <input
            type="password"
            id="confirm-password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-lg font-semibold text-center mb-4">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="text-green-500 text-lg font-semibold text-center mb-4">
            {successMessage}
          </p>
        )}

        <button
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none"
          onClick={handleResetPassword}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
