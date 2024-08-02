// import { useStateContext } from "../../Contexts/StateContext";

// const Birthday = () => {
//   const { Birthday } = useStateContext;
//   return (
//     <>
//       {/* <h1>Many More Happy Returns Of The Day Srilekha </h1> */}
//       <section className="list-array">
//         <h1>hiii</h1>
//         <section className="list-card"></section>
//       </section>
//     </>
//   );
// };

// export default Birthday;

// import "./BirthdaysAndNewHires.scss";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { useThemeContext } from "../../Contexts/ThemesContext";
import Loader from "../../Loader/Loader";
import { useStateContext } from "../../Contexts/StateContext";
const Birthday = ({
  data,
  heading,
  img,
  loadMoreRef,
  getMoreDataType,
  setrecentHire,
}) => {
  const { applicationColor } = useThemeContext();
  const { loadingTerm, orgDetails } = useStateContext();
  {
    console.log(setrecentHire, "iuytfg");
  }
  // console.log(orgDetails, "recent hire");
  return (
    <section
      className="lists"
      style={{
        color: applicationColor.readColor1,
      }}
    >
      <h5 className="heading">{heading}</h5>
      {console.log(heading)}
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
export default Birthday;
// import React from "react";
// import { useStateContext } from "../../Contexts/StateContext";
// import { Link } from "react-router-dom";
// import dummyUser from "../../../assets/Header/dummy-user.jpg";
// function BirthdaysAndNewHires() {
//   const { recentHire } = useStateContext();
//   console.log(recentHire, " recentHire ");
//   return (
//     <div>
//       {recentHire &&
//         recentHire.map((item) => (
//           <div
//             style={
//               {
//                 // background: applicationColor.cardBg1,
//                 // color: applicationColor.readColor1,
//               }
//             }
//           >
//             <div>
//               <div>
//                 <img
//                   src={dummyUser}
//                   alt="userImage"
//                   width="30px"
//                   height="30px"
//                   className="rounded-circle"
//                 />
//                 <div className="details">
//                   <span className="id">{item.basic_info.first_name}</span>
//                   <span className="email">{item.basic_info.email}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }
// export default BirthdaysAndNewHires;
