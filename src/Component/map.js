import React from "react";

const MapComponent = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.685391617933!2d106.76565567490684!3d10.842641395578528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175273d52dd4b5f%3A0x5e0a1a0a1a0a1a0a!2zVHLGsOG7nW5nIMSQ4buLbmggU-G6oWNoIFRo4bupIFRodeG6vyBUUC5IQ00!5e0!3m2!1svi!2s!4v1720470440000!5m2!1svi!2s"
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
