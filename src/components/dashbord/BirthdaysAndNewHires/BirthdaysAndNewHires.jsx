import React from "react";
// import "./BirthdaysAndNewHires.scss";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { useThemeContext } from "../../Contexts/ThemesContext";
import Loader from "../../Loader/Loader";
import { useStateContext } from "../../Contexts/StateContext";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
const BirthdaysAndNewHires = ({
  data,
  heading,
  img,
  loadMoreRef,
  getMoreDataType,
  setrecentHire,
}) => {
  const { applicationColor } = useThemeContext();
  const { loadingTerm, orgDetails, employeeDetails, recentHire } =
    useStateContext();

  const recentHiresToDisplay = recentHire?.slice(0, 5) || [];

  return (
    <section
      className="lists"
      style={{
        color: applicationColor.readColor1,
      }}
    >
      <section
        className="list-array"
        style={{
          color: applicationColor.readColor1,
        }}
      >
        <h5 className="heading">{heading}</h5>
        {recentHiresToDisplay?.length > 0 ? (
          recentHiresToDisplay?.map((item) => (
            <section
              className="list-card"
              key={item.employee_id}
              style={{
                background: applicationColor.cardBg2,
              }}
            >
              <div className="person-img">
                <img
                  src="https://img.freepik.com/free-photo/portrait-man-having-great-time_23-2149443790.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1717027200&semt=ais_user"
                  alt={item.basic_info?.firstName || "User"}
                />
              </div>
              <div className="new-hires-info">
                <p className="fw-semibold">
                  {item.basic_info.first_name || "Unknown"} -{" "}
                  {item.employee_id || "Unknown"}
                </p>
                <p className="d-flex align-items-center text-muted">
                  <span className="pe-1">
                    <HiOutlineMail />
                  </span>
                  {item.basic_info.email || "Unknown"}
                </p>
              </div>
            </section>
          ))
        ) : (
          <div className="no-items shimmer">
            <div className="shimmer-item"></div>
            <div className="shimmer-item"></div>
            <div className="shimmer-item"></div>
            <div className="shimmer-item"></div>
          </div>
        )}
      </section>
    </section>
  );
};
export default BirthdaysAndNewHires;
