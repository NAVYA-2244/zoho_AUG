// import React, { useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// import { toastOptions } from "../../../Utils/FakeRoutes";
// import { useStateContext } from "../../Contexts/StateContext";

// const MapComponent = ({ lat, lng }) => {
//   console.log("lat", lat, lng);
//   const { setLocation } = useStateContext();
//   useEffect(() => {
//     if (lat && lng) {
//       toastOptions.success("done success");
//     }
//   }, [lng, lat, setLocation]);
//   return (
//     <>
//       <h2 style={{ fontSize: "30rem" }}>hello world</h2>
//       <MapContainer
//         center={[lat, lng]}
//         zoom={13}
//         style={{ height: "400px", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[lat, lng]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </>
//   );
// };

// export default MapComponent;
