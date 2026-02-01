import React from "react";

const MapComponent = () => {
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <div style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        maxWidth: "400px"
      }}>
        <h3 style={{ margin: "0 0 5px 0", fontSize: "16px", color: "#333" }}>
          Trường Đại học Công nghệ Kỹ thuật Thành phố Hồ Chí Minh
        </h3>
        <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
          01 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh
        </p>
        <div style={{ margin: "5px 0", fontSize: "14px", color: "#666", display: "flex", alignItems: "center" }}>
          <span style={{ color: "#FFCC00", marginRight: "5px" }}>★</span>
          <span style={{ fontWeight: "bold", color: "#333", marginRight: "5px" }}>4,3</span>
          <span style={{ color: "#666" }}>/ 5 sao</span>
        </div>
        <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
          2.552 bài viết • <a href="https://www.google.com/maps/dir/?api=1&destination=10.85135098929837,106.7727213748491" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#1a73e8" }}>Chỉ đường</a>
        </p>
        <a
          href="https://www.google.com/maps/search/Trường+Đại+học+Công+nghệ+Kỹ+thuật+Thành+phố+Hồ+Chí+Minh/@10.85135098929837,106.7727213748491?hl=vi-VN&gl=US"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "5px",
            fontSize: "14px",
            color: "#1a73e8",
            textDecoration: "none"
          }}
        >
          Xem bản đồ lớn hơn
        </a>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.682388598594!2d106.7727213748491!3d10.85135098929837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175273d52dd4b5f%3A0x5e0a1a0a1a0a1a0a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUaMOgbmcgdHLDtCBL4bu5IFRo4buRdCBUaMOgbmgIHBoxrDhu51jIEjGsMahbmc!5e0!3m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapComponent;
