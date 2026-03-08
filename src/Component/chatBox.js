import React, { useState, useEffect } from "react";
import "../Style/chatBox.scss";
import { getCookie } from "../Helpers/cookie";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketError, setSocketError] = useState(false);

  const adminId = 109;

  useEffect(() => {
    const token = getCookie("token");
    console.log("Token:", token);
    
    if (!token) {
      console.log("No token found - chat disabled");
      return;
    }

    // Try to connect to socket.io, but don't crash if it fails
    try {
      const io = require("socket.io-client").default;
      const newSocket = io("http://localhost:5000", {
        auth: { token },
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
      });

      newSocket.on("connect", () => {
        console.log("Socket connected");
        setSocketError(false);
      });

      newSocket.on("connect_error", (error) => {
        console.log("Socket connection failed - chat disabled:", error.message);
        setSocketError(true);
      });

      newSocket.on("chat message", (newMessage) => {
        if (newMessage) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      newSocket.on("load-messages", (loadedMessages) => {
        if (Array.isArray(loadedMessages)) {
          setMessages(loadedMessages);
        }
      });

      const userId = parseInt(getCookie("userId"), 10);
      const chatRoomId = [Math.min(userId, adminId), Math.max(userId, adminId)].join("-");
      newSocket.emit("load-messages", { chatRoomId });

      setSocket(newSocket);

      return () => {
        if (newSocket) newSocket.close();
      };
    } catch (error) {
      console.log("Socket.io not available - chat disabled");
      setSocketError(true);
    }
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
