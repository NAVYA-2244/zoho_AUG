import React from "react";
// import "./BirthdaysAndNewHires.scss";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { useThemeContext } from "../../Contexts/ThemesContext";
import Loader from "../../Loader/Loader";
import { useStateContext } from "../../Contexts/StateContext";

const BirthdaysAndNewHires = ({
  data,
  heading,
  img,
  loadMoreRef,
  getMoreDataType,
}) => {
  const {  applicationColor } = useThemeContext();
  const { loadingTerm } = useStateContext();
  return (
    <section
      className="lists"
      style={{
        color: applicationColor.readColor1,
      }}
    >
      <h5 className="heading">{heading}</h5>
      <section className="list-array">
        {data?.length > 0 ? (
          data.map((item, index) => {
            if (data.length === index + 1) {
              return (
                <section
                  className="list-card"
                  key={item.employeeId}
                  style={{
                    background: applicationColor.cardBg2,
                  }}
                  ref={loadMoreRef}
                >
                  <div className="person-img">
                    <img
                      src="https://img.freepik.com/free-photo/portrait-man-having-great-time_23-2149443790.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1717027200&semt=ais_user"
                      alt={item?.firstName}
                    />
                  </div>
                  <div className="person-data">
                    <div className="id_name">
                      <span>
                        {item?.employeeId} -{" "}
                        <span className="name">{item?.firstName}</span>
                      </span>
                    </div>
                    {/* <div
        className="role"
        style={{
          color: .readableColor_2,
        }}
      >
        <span>
          <MdOutlineWork /> {item?.role} role
        </span>
        <span>
          {" "}
          <FaLocationDot /> {item?.location}location
        </span>
      </div> */}
                    <div
                      className="email"
                      style={{
                        color: applicationColor.readColor2,
                      }}
                    >
                      <span>
                        <MdEmail /> {item.email}
                      </span>
                    </div>
                  </div>
                </section>
              );
            } else {
              return (
                <section
                  className="list-card"
                  key={item.employeeId}
                  style={{
                    background: `${
                      data.length === index + 1
                        ? "red"
                        : applicationColor.cardBg2
                    }`,
                  }}
                >
                  <div className="person-img">
                    <img
                      src="https://img.freepik.com/free-photo/portrait-man-having-great-time_23-2149443790.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1717027200&semt=ais_user"
                      alt={item?.firstName}
                    />
                  </div>
                  <div className="person-data">
                    <div className="id_name">
                      <span>
                        {item?.employeeId} -{" "}
                        <span className="name">{item?.firstName}</span>
                      </span>
                    </div>
                    {/* <div
      className="role"
      style={{
        color: .readableColor_2,
      }}
    >
      <span>
        <MdOutlineWork /> {item?.role} role
      </span>
      <span>
        {" "}
        <FaLocationDot /> {item?.location}location
      </span>
    </div> */}
                    <div
                      className="email"
                      style={{
                        color: applicationColor.readColor2,
                      }}
                    >
                      <span>
                        <MdEmail /> {item.email}
                      </span>
                    </div>
                  </div>
                </section>
              );
            }
          })
        ) : (
          <div className="no-items">
            <img src={img} alt="" />
          </div>
        )}
      </section>

      <span>{loadingTerm === getMoreDataType ? <Loader /> : null}</span>
    </section>
  );
};

export default BirthdaysAndNewHires;
