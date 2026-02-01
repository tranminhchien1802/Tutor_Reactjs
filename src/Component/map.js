import React, { useCallback, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

// Tọa độ của Trường Đại học Sư Phạm Kỹ Thuật TP.HCM
const center = {
  lat: 10.85135098929837,
  lng: 106.7727213748491
};

// Thông tin trường
const schoolInfo = {
  name: "Trường Đại học Sư Phạm Kỹ Thuật TP.HCM",
  address: "1 Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP. HCM",
  rating: 4.5,
  reviews: 1250
};

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyCkfPop_Of3zxo0jf4fF7Jpbyik30_YO00"; // Sử dụng API key mặc định cho demo

const MapComponent = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onClickMarker = useCallback((position) => {
    setSelectedMarker(position);
  }, []);

  const onMarkerLoad = React.useCallback((marker) => {
    // Không cần thiết phải làm gì ở đây
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      loadingElement={<div style={{ height: "100%" }}>Đang tải bản đồ...</div>}
    >
      <div style={{ width: "100%", height: "400px" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            gestureHandling: "auto"
          }}
        >
          <Marker
            position={center}
            onClick={() => onClickMarker(center)}
            onLoad={onMarkerLoad}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: { width: 40, height: 40 },
            }}
          />

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "16px" }}>{schoolInfo.name}</h3>
                <p style={{ margin: "5px 0" }}><strong>Địa chỉ:</strong> {schoolInfo.address}</p>
                <p style={{ margin: "5px 0" }}><strong>Đánh giá:</strong> ⭐ {schoolInfo.rating}/5.0 ({schoolInfo.reviews} đánh giá)</p>
                <button
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${schoolInfo.name}`, '_blank')}
                >
                  Xem trên Google Maps
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
