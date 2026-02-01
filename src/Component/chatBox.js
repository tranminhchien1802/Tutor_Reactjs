import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../Style/chatBox.scss";
import { getCookie } from "../Helpers/cookie"; // Đảm bảo đường dẫn đúng

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);

  const adminId = 109; // ID của admin (có thể thay đổi theo ứng dụng của bạn)

  // Kết nối socket khi component được mount
  useEffect(() => {
    const token = getCookie("token"); // Lấy token từ cookie
    console.log("Token:", token); // Kiểm tra token được lấy đúng
    if (!token) {
      console.error("No token found in cookies");
      return;
    }

    const newSocket = io("http://localhost:5000", {
      auth: { token },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    // Lắng nghe sự kiện nhận tin nhắn mới từ server
    newSocket.on("chat message", (newMessage) => {
      if (newMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    // Lắng nghe sự kiện tải tin nhắn từ server
    newSocket.on("load-messages", (loadedMessages) => {
      if (Array.isArray(loadedMessages)) {
        setMessages(loadedMessages);
      } else {
        console.error("Invalid message data:", loadedMessages);
      }
    });

    const userId = parseInt(getCookie("userId"), 10); // Lấy ID người dùng từ cookie
    //console.log("user", userId);
    const chatRoomId = [Math.min(userId, adminId), Math.max(userId, adminId)].join("-");
    
    // Gửi yêu cầu tải lại tin nhắn từ server khi kết nối socket
    newSocket.emit("load-messages", { chatRoomId });

    return () => newSocket.close();
  }, []);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);

    // Khi chat box mở và socket tồn tại, yêu cầu tải lại tin nhắn
    if (!isOpen && socket) {
      const userId = parseInt(getCookie("userId"), 10); // Lấy ID người dùng từ cookie
      const chatRoomId = [Math.min(userId, adminId), Math.max(userId, adminId)].join("-");

      socket.emit("load-messages", { chatRoomId });
    }
  };

  const handleSend = () => {
    if (input.trim() !== "" && socket) {
      const userId = parseInt(getCookie("userId"), 10); // Lấy ID người dùng từ cookie
      const chatRoomId = [Math.min(userId, adminId), Math.max(userId, adminId)].join("-");

      const messageData = {
        senderId: userId,
        receiverId: adminId, // ID của admin
        content: input,
        timestamp: new Date().toISOString(),
        chatRoomId,
      };

      // Gửi tin nhắn qua socket
      socket.emit("chat message", messageData);

      // Cập nhật tin nhắn trên giao diện ngay lập tức
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-toggle" onClick={toggleChatBox}>
        <i className="fa-solid fa-headset"></i>
      </div>

      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h4>Hỗ trợ khách hàng</h4>
            <button onClick={toggleChatBox}>✖</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.senderId === adminId ? "admin" : "user"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
