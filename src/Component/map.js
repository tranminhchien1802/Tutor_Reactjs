import React from "react";

const MapComponent = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.586325328308!2d106.7678443!3d10.8426413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f2f2f2f2f2f%3A0xf0e3e8f3e8f3e8f3!2zMTAgVsO6IFbDqm4gTmfGsMahbixDTsO6biBUcuG7kSBEdSwgUGjGsMahbmcgVGjDonUsIFF14bqtbiBDaMOtIE1pbmMsIFTDom4gSMOgIMSQRywgVmnhu4d0IE5hbQ!5e0!3m2!1vi!2s"
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
