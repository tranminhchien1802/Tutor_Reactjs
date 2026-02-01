import React from "react";

const MapComponent = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.157193996186!2d106.79659497581835!3d10.875646089279208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a1768e1d03%3A0x38d3ea53e0581ae0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puLCDEkEhRRy1IQ00sIEPGoSBz4bufIExpbmggVHJ1bmcu!5e0!3m2!1svi!2s!4v1733505338030!5m2!1svi!2s"
        width="600"
        height="450"
      ></iframe>
    </div>
  );
};

export default MapComponent;
