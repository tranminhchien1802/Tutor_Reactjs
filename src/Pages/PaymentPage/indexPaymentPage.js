import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, post } from "../../Utils/request";

const PaymentPage = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(300); // 300 giây = 5 phút

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        console.log("Fetching transaction details...");
        const response = await get(`transactions/${transactionId}`, true);
        console.log("Transaction fetched:", response);

        setTransaction({
          ...response.transaction,
          qrCode: response.qrCode || null,
        });
        setPaymentStatus(response.transaction.status);
      } catch (error) {
        console.error("Error fetching transaction:", error);
        setErrorMessage("Không thể tải thông tin giao dịch.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  useEffect(() => {
    if (paymentStatus === "pending") {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setPaymentStatus("failed");
            setErrorMessage("Thanh toán hết thời gian. Vui lòng thử lại.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const checkPaymentInterval = setInterval(async () => {
        try {
          console.log("Checking payment status...");
          const response = await post("transactions/processPayment", { transactionId }, true);
          console.log("Payment status response:", response);
          setPaymentStatus(response.transaction.status);
          setTransaction(response.transaction);

          if (response.transaction.status === "completed") {
            clearInterval(checkPaymentInterval);
            clearInterval(interval);
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
        }
      }, 10000); // Kiểm tra thanh toán mỗi 10 giây

      return () => {
        clearInterval(interval);
        clearInterval(checkPaymentInterval);
      };
    }
  }, [paymentStatus, transactionId]);

  const formatCountdown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Đang tải thông tin...</p>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="error-screen">
        <p>Không tìm thấy giao dịch.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-5 text-center bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Thanh Toán</h2>
      {errorMessage && <p className="text-red-500 font-semibold">{errorMessage}</p>}
      <div className="payment-details mb-6">
        <p className="text-lg">
          <b>Số tiền:</b> <span className="text-green-600">{transaction.amount.toLocaleString()} VND</span>
        </p>
        <p className="text-lg">
          <b>Phương thức thanh toán:</b> {transaction.paymentMethod}
        </p>
        <p className="text-lg">
          <b>Trạng thái thanh toán:</b>{" "}
          <span
            className={
              paymentStatus === "completed"
                ? "text-green-600"
                : paymentStatus === "failed"
                ? "text-red-500"
                : "text-yellow-600"
            }
          >
            {paymentStatus}
          </span>
        </p>
      </div>
      {paymentStatus === "pending" && (
        <div className="pending-state">
          <img
            className="qr-code-image mx-auto mb-4 border-2 border-gray-300 shadow-lg"
            src={transaction.qrCode}
            alt="QR Code"
            onError={() => console.error("QR Code failed to load:", transaction.qrCode)}
          />
          <p className="text-lg text-gray-600">Quét mã QR để thanh toán.</p>
          <p className="text-4xl font-bold text-blue-600 mt-4">
            Thời gian còn lại: <span>{formatCountdown(countdown)}</span>
          </p>
        </div>
      )}
      {paymentStatus === "completed" && (
        <p className="mt-4 text-xl text-green-600 font-semibold">
          Thanh toán thành công! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
        </p>
      )}
      {paymentStatus === "failed" && (
        <p className="mt-4 text-xl text-red-500 font-semibold">
          Thanh toán thất bại. Vui lòng thử lại.
        </p>
      )}
    </div>
  );
};

export default PaymentPage;
