import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../Utils/request";
import { getCookie } from "../../Helpers/cookie";
import Swal from "sweetalert2";

const TestPayment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = getCookie("token");

  const handleCreateTransaction = async () => {
    if (!token) {
      Swal.fire({
        title: "Chưa đăng nhập",
        text: "Vui lòng đăng nhập để test thanh toán",
        icon: "warning"
      }).then(() => navigate("/login"));
      return;
    }

    setLoading(true);
    try {
      const response = await post("transactions/create", {
        amount: 500000,
        paymentMethod: "QR_CODE",
        courseId: "1"
      }, true);

      console.log("Transaction created:", response);
      
      if (response.success) {
        Swal.fire({
          title: "Tạo giao dịch thành công!",
          text: `Mã giao dịch: ${response.transaction.transactionId}`,
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Đến trang thanh toán",
          cancelButtonText: "Ở lại đây"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/payment/${response.transaction.transactionId}`);
          }
        });
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      Swal.fire({
        title: "Lỗi",
        text: "Không thể tạo giao dịch: " + error.message,
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <h2 className="card-title mb-4">Test Thanh Toán</h2>
              <p className="card-text mb-4">
                Click nút bên dưới để tạo giao dịch thanh toán demo
              </p>
              <div className="alert alert-info">
                <p className="mb-2"><b>Thông tin demo:</b></p>
                <ul className="mb-0 text-left">
                  <li>Số tiền: 500.000 VND</li>
                  <li>Phương thức: QR Code</li>
                  <li>Thời gian countdown: 5 phút</li>
                  <li>Thanh toán tự động completed sau 30 giây</li>
                </ul>
              </div>
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleCreateTransaction}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Tạo Giao Dịch Thanh Toán"}
              </button>
              <div className="mt-4">
                <p className="text-muted">
                  <small>
                    Lưu ý: Bạn cần đăng nhập để test thanh toán.
                    <br />
                    Đăng nhập bằng: student@email.com / student123
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPayment;
