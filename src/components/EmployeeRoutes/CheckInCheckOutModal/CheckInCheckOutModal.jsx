import React from "react";
import { addMinutes, format, startOfDay } from "date-fns";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useStateContext } from "../../Contexts/StateContext";
import { RxCross1 } from "react-icons/rx";

const CheckInCheckOutModal = () => {
  const { applicationColor } = useThemeContext();
  const { checkInModal, setCheckInModal, eventData, setEventData } =
    useStateContext();

  const formatDate = (date) => format(new Date(date), "MMM dd, yyyy");

  const formatWorkedHours = (workedHours) => {
    const hours = Math.floor(workedHours);
    const minutes = Math.round((workedHours - hours) * 60);

    const date = addMinutes(startOfDay(new Date()), hours * 60 + minutes);
    return format(date, "H'hr' m'min'");
  };

  return (
    <div className="modal">
      <div
        className="modal-content"
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
      >
        <div className="close">
          <h4 className="modal-heading">
            {eventData ? formatDate(eventData.start) : ""}
          </h4>
          <span
            className="icon"
            onClick={() => {
              setCheckInModal(false);
              setEventData(null);
            }}
          >
            <RxCross1 />
          </span>
        </div>

        {eventData && (
          <div>
            {/* <p
              style={{
                fontWeight: "400",
                fontSize: "1rem",
                color: applicationColor.readColor2,
              }}
            >
              Date{" "}
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  marginLeft: "6px",
                  color: applicationColor.readColor1,
                }}
              >
                {formatDate(eventData.start)}
              </span>
            </p> */}
            <p
              style={{
                fontWeight: "400",
                fontSize: "1rem",
                color: applicationColor.readColor2,
              }}
            >
              Check In Time{" "}
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  marginLeft: "6px",
                  color: applicationColor.readColor1,
                }}
              >
                {eventData?.checkin || "00:00"}
              </span>
            </p>
            <p
              style={{
                fontWeight: "400",
                fontSize: "1rem",
                color: applicationColor.readColor2,
              }}
            >
              Check Out Time{" "}
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  marginLeft: "6px",
                  color: applicationColor.readColor1,
                }}
              >
                {eventData?.checkout || "00:00"}
              </span>
            </p>
            <p
              style={{
                fontWeight: "400",
                fontSize: "1rem",
                color: applicationColor.readColor2,
              }}
            >
              Worked Hours{" "}
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  marginLeft: "6px",
                  color: applicationColor.readColor1,
                }}
              >
                {formatWorkedHours(eventData?.workedHours) || "00:00"}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInCheckOutModal;
