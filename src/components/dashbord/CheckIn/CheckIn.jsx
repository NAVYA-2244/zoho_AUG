// import React, { useEffect, useState } from "react";
// import { SlCalender } from "react-icons/sl";
// // import "./CheckIn.scss";
// import { format } from "date-fns";
// import {
//   convertTo12HourFormat,
//   formatTime,
//   getCurrentLocation,
//   getIpAddress,
// } from "../../../Utils/Helpers";
// import { useStateContext } from "../../Contexts/StateContext";
// import Loader from "../../Loader/Loader";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { backEndCallObjNothing } from "../../../services/mainService";
// // import Clock from "react-flip-clock";

// const CheckIn = () => {
//   const {
//     loading,
//     setLoading,
//     checkInTime,
//     checkOutTime,
//     checkin,
//     setCheckIn,
//     setCheckOutTime,
//     setCheckInTime,
//     loadingTerm,
//     setLoadingTerm,
//     orgDetails,
//   } = useStateContext();

//   const { applicationColor } = useThemeContext();
//   const [fakeTimer, setFakeTimer] = useState("00:00:00");
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);

//   const handleCheckIn = async () => {
//     try {
//       setLoading(true);
//       setLoadingTerm("checkIn_checkOut");
//       const Co_Ordinates = await getCurrentLocation();
//       const { ip } = await getIpAddress();
//       const data = {
//         type: "checkin",
//         latitude: Co_Ordinates.latitude.toString() || "0",
//         longitude: Co_Ordinates.longitude.toString() || "0",
//         location: "divya sree solitaire",
//         ip: ip,
//       };
//       const response = await backEndCallObjNothing(
//         "/emp/checkin_checkout",
//         data
//       );

//       console.log(response.data, "checkin");

//       setCheckInTime(formatTime(response?.data?.in_time));

//       setCheckIn(false);
//       setLoading(false);
//       setLoadingTerm("");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       setLoadingTerm("");
//       toastOptions.error(
//         error?.response?.data ||
//         "Please Retry to check In , something went wrong"
//       );
//     } finally {
//       setLoading(false);
//       setLoadingTerm("");
//     }
//   };

//   const handleCheckOut = async () => {
//     try {
//       setLoading(true);
//       setLoadingTerm("checkIn_checkOut");
//       const Co_Ordinates = await getCurrentLocation();
//       console.log(Co_Ordinates);
//       const { ip } = await getIpAddress();
//       const data = {
//         type: "checkout",
//         latitude: Co_Ordinates.latitude.toString() || "0",
//         longitude: Co_Ordinates.longitude.toString() || "0",
//         location: "divya sree solitaire",
//         ip: ip,
//         // notes: form.notes,
//       };
//       console.log(data, "eee");

//       const response = await backEndCallObjNothing(
//         "/emp/checkin_checkout",
//         data
//       );

//       console.log(response, "checkout");

//       setCheckOutTime(formatTime(response?.data?.out_time));
//       setCheckIn(true);

//       setLoadingTerm("");
//     } catch (error) {
//       setLoading(false);
//       toastOptions.error(
//         error?.response?.data ||
//         "Please Retry to check out something went wrong"
//       );
//     } finally {
//       setLoading(false);
//       setLoadingTerm("");
//     }
//   };

//   useEffect(() => {
//     if (checkInTime && !checkin) {
//       const [hours, minutes, seconds] = checkInTime.split(":").map(Number);
//       const checkInTimeSeconds = hours * 3600 + minutes * 60 + seconds;
//       const now = new Date();
//       const currentTimeSeconds =
//         now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
//       setElapsedSeconds(currentTimeSeconds - checkInTimeSeconds);
//     }
//   }, [checkInTime, checkin]);

//   useEffect(() => {
//     let interval;
//     if (checkInTime && !checkin) {
//       interval = setInterval(() => {
//         setElapsedSeconds((prevSeconds) => prevSeconds + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [checkInTime, checkin]);

//   const formattedTime = format(
//     new Date(0, 0, 0, 0, 0, elapsedSeconds),
//     "HH : mm : ss"
//   );

//   useEffect(() => {
//     let interval;
//     interval = setInterval(() => {
//       setFakeTimer(format(new Date(), "hh:mm:ss"));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [fakeTimer]);

//   let checkinTwelveHr = checkInTime
//     ? convertTo12HourFormat(checkInTime)
//     : "00:00:00";

//   let checkOutTwelveHr = checkOutTime
//     ? convertTo12HourFormat(checkOutTime)
//     : "00:00:00";

//   return (
//     <section
//       className="check-in"
//       style={{
//         color: applicationColor.readColor1,
//       }}
//     >
//       <section className="date-section">
//         <div className="calender-date">
//           <p className="calender">
//             {" "}
//             <SlCalender />
//           </p>
//           <p className="date">{format(new Date(), "EEE MMM-dd-yyyy")}</p>
//         </div>

//         <div className="check-in-ckeckout-buttons">
//           {checkin ? (
//             <button
//               className="check-in-button"
//               style={{
//                 background:
//                   Object.keys(orgDetails).length > 0
//                     ? applicationColor.cardBg2
//                     : "#000",
//                 color: applicationColor.readColor1,
//               }}
//               onClick={handleCheckIn}
//               disabled={Object.keys(orgDetails).length > 0 ? false : true}
//             >
//               <span>
//                 {Object.keys(orgDetails).length > 0 ? "Check In" : <Loader />}
//               </span>
//               <span style={{ letterSpacing: "0.1rem" }}>
//                 {" "}
//                 {loading && loadingTerm === "checkIn_checkOut" ? (
//                   <Loader />
//                 ) : (
//                   fakeTimer
//                 )}
//               </span>
//             </button>
//           ) : (
//             <button
//               className="check-in-button check-out"
//               onClick={handleCheckOut}
//               disabled={Object.keys(orgDetails).length > 0 ? false : true}
//               style={{
//                 background:
//                   Object.keys(orgDetails).length > 0
//                     ? applicationColor.cardBg2
//                     : "#000",
//                 color: applicationColor.readColor1,
//               }}
//             >
//               <span>
//                 {Object.keys(orgDetails).length > 0 ? "Check Out" : <Loader />}
//               </span>
//               {loading && loadingTerm === "checkIn_checkOut" ? (
//                 <Loader />
//               ) : (
//                 fakeTimer
//               )}
//             </button>
//           )}
//         </div>
//       </section>

//       <section className="notes-check-in-card">
//         <div className="checkin-checkout">
//           <div className="checkin-at-clock">
//             {Object.keys(orgDetails).length > 0 && (
//               <div className="check-in-at">
//                 {checkOutTime && checkOutTime !== "" ? (
//                   <h6>
//                     Last Check Out At{" "}
//                     <span className="time"> {checkOutTwelveHr}</span>{" "}
//                   </h6>
//                 ) : (
//                   <h6>
//                     Last Check In At{" "}
//                     <span className="time"> {checkinTwelveHr}</span>{" "}
//                   </h6>
//                 )}
//               </div>
//             )}
//           </div>
//           <h6 className="check-in-time">
//             {elapsedSeconds > 0 ? formattedTime : "00 : 00 : 00"}
//           </h6>
//           <span className="day">Today</span>
//         </div>
//       </section>
//     </section>
//   );
// };

// export default CheckIn;
import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { format } from "date-fns";
import {
  convertTo12HourFormat,
  formatTime,
  getCurrentLocation,
  getIpAddress,
} from "../../../Utils/Helpers";
import { useStateContext } from "../../Contexts/StateContext";
import Loader from "../../Loader/Loader";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../../services/mainService";

const CheckIn = () => {
  const {
    loading,
    setLoading,
    checkInTime,
    checkOutTime,
    checkin,
    setCheckIn,
    setCheckOutTime,
    setCheckInTime,
    loadingTerm,
    setLoadingTerm,
    orgDetails,
  } = useStateContext();

  const { applicationColor } = useThemeContext();
  const [fakeTimer, setFakeTimer] = useState("00:00:00");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      setLoadingTerm("checkIn_checkOut");
      const Co_Ordinates = await getCurrentLocation();
      const { ip } = await getIpAddress();
      const data = {
        type: "checkin",
        latitude: Co_Ordinates.latitude.toString() || "0",
        longitude: Co_Ordinates.longitude.toString() || "0",
        location: "divya sree solitaire",
        ip: ip,
      };
      const response = await backEndCallObjNothing(
        "/emp/checkin_checkout",
        data
      );

      console.log(response.data, "checkin");

      setCheckInTime(formatTime(response?.data?.in_time));

      setCheckIn(false);
      setLoading(false);
      setLoadingTerm("");
    } catch (error) {
      console.error(error);
      setLoading(false);
      setLoadingTerm("");
      if (error.message.includes("Geolocation")) {
        toastOptions.error("Failed to retrieve location. Please check your network and API key.");
      } else {
        toastOptions.error(
          error?.response?.data ||
          "Please Retry to check in, something went wrong"
        );
      }
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      setLoadingTerm("checkIn_checkOut");
      const Co_Ordinates = await getCurrentLocation();
      console.log(Co_Ordinates);
      const { ip } = await getIpAddress();
      const data = {
        type: "checkout",
        latitude: Co_Ordinates.latitude.toString() || "0",
        longitude: Co_Ordinates.longitude.toString() || "0",
        location: "divya sree solitaire",
        ip: ip,
        // notes: form.notes,
      };
      console.log(data, "eee");

      const response = await backEndCallObjNothing(
        "/emp/checkin_checkout",
        data
      );

      console.log(response, "checkout");

      setCheckOutTime(formatTime(response?.data?.out_time));
      setCheckIn(true);

      setLoadingTerm("");
    } catch (error) {
      setLoading(false);
      toastOptions.error(
        error?.response?.data ||
        "Please Retry to check out, something went wrong"
      );
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  useEffect(() => {
    if (checkInTime && !checkin) {
      const [hours, minutes, seconds] = checkInTime.split(":").map(Number);
      const checkInTimeSeconds = hours * 3600 + minutes * 60 + seconds;
      const now = new Date();
      const currentTimeSeconds =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      setElapsedSeconds(currentTimeSeconds - checkInTimeSeconds);
    }
  }, [checkInTime, checkin]);

  useEffect(() => {
    let interval;
    if (checkInTime && !checkin) {
      interval = setInterval(() => {
        setElapsedSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [checkInTime, checkin]);

  const formattedTime = format(
    new Date(0, 0, 0, 0, 0, elapsedSeconds),
    "HH : mm : ss"
  );

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setFakeTimer(format(new Date(), "hh:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, [fakeTimer]);

  let checkinTwelveHr = checkInTime
    ? convertTo12HourFormat(checkInTime)
    : "00:00:00";

  let checkOutTwelveHr = checkOutTime
    ? convertTo12HourFormat(checkOutTime)
    : "00:00:00";

  return (
    <section
      className="check-in"
      style={{
        color: applicationColor.readColor1,
      }}
    >
      <section className="date-section">
        <div className="calender-date">
          <p className="calender">
            {" "}
            <SlCalender />
          </p>
          <p className="date">{format(new Date(), "EEE MMM-dd-yyyy")}</p>
        </div>

        <div className="check-in-ckeckout-buttons">
          {checkin ? (
            <button
              className="check-in-button"
              style={{
                background:
                  Object.keys(orgDetails).length > 0
                    ? applicationColor.cardBg2
                    : "#000",
                color: applicationColor.readColor1,
              }}
              onClick={handleCheckIn}
              disabled={Object.keys(orgDetails).length > 0 ? false : true}
            >
              <span>
                {Object.keys(orgDetails).length > 0 ? "Check In" : <Loader />}
              </span>
              <span style={{ letterSpacing: "0.1rem" }}>
                {" "}
                {loading && loadingTerm === "checkIn_checkOut" ? (
                  <Loader />
                ) : (
                  fakeTimer
                )}
              </span>
            </button>
          ) : (
            <button
              className="check-in-button check-out"
              onClick={handleCheckOut}
              disabled={Object.keys(orgDetails).length > 0 ? false : true}
              style={{
                background:
                  Object.keys(orgDetails).length > 0
                    ? applicationColor.cardBg2
                    : "#000",
                color: applicationColor.readColor1,
              }}
            >
              <span>
                {Object.keys(orgDetails).length > 0 ? "Check Out" : <Loader />}
              </span>
              {loading && loadingTerm === "checkIn_checkOut" ? (
                <Loader />
              ) : (
                fakeTimer
              )}
            </button>
          )}
        </div>
      </section>

      <section className="notes-check-in-card">
        <div className="checkin-checkout">
          <div className="checkin-at-clock">
            {Object.keys(orgDetails).length > 0 && (
              <div className="check-in-at">
                {checkOutTime && checkOutTime !== "" ? (
                  <h6>
                    Last Check Out At{" "}
                    <span className="time"> {checkOutTwelveHr}</span>{" "}
                  </h6>
                ) : (
                  <h6>
                    Last Check In At{" "}
                    <span className="time"> {checkinTwelveHr}</span>{" "}
                  </h6>
                )}
              </div>
            )}
          </div>
          <h6 className="check-in-time">
            {elapsedSeconds > 0 ? formattedTime : "00 : 00 : 00"}
          </h6>
          <span className="day">Today</span>
        </div>
      </section>
    </section>
  );
};

export default CheckIn;
