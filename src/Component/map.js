import React from "react";

const MapComponent = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.682388598594!2d106.7727213748491!3d10.85135098929837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175273d52dd4b5f%3A0x5e0a1a0a1a0a1a0a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgUGjhu6VuIEvhu7NpIFRo4buRdCwgVGjDtG5nIExpbmggQ2hp4buHdCwgVGjDoG5oIHBo4buRIFRQLkhDTQ!5e0!3m2!1svi!2s"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapComponent;
