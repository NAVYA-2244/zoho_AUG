// import React from "react";
// // import "./BirthdaysAndNewHires.scss";
// import { FaLocationDot } from "react-icons/fa6";
// import { MdEmail } from "react-icons/md";
// import { MdOutlineWork } from "react-icons/md";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import Loader from "../../Loader/Loader";
// import { useStateContext } from "../../Contexts/StateContext";
// import { HiOutlineMail } from "react-icons/hi";
// import { Link, useNavigate } from "react-router-dom";
// import { CgProfile } from "react-icons/cg";

// const BirthdaysAndNewHires = ({
//   data,
//   heading,
//   img,
//   loadMoreRef,
//   getMoreDataType,
//   setrecentHire,
// }) => {
//   const { applicationColor } = useThemeContext();
//   const { loadingTerm, orgDetails, recentHire } = useStateContext();
//   {
//     console.log(setrecentHire, "iuytfg");
//   }
//   {
//     console.log(recentHire, "oiuyt");
//   }
//   const recentHiresToDisplay = recentHire?.slice(0, 5) || [];

//   // console.log(orgDetails, "recent hire");
//   return (
//     // <section
//     //   className="lists"
//     //   style={{
//     //     color: applicationColor.readColor1,
//     //   }}
//     // >
//     //   <h5 className="heading">{heading}</h5>
//     //   <section className="list-array">
//     //     {data?.length > 0 ? (
//     //       data.map((item, index) => {
//     //         if (data.length === index + 1) {
//     //           return (
//     //             <section
//     //               className="list-card"
//     //               key={item.employeeId}
//     //               style={{
//     //                 background: applicationColor.cardBg2,
//     //               }}
//     //               ref={loadMoreRef}
//     //             >
//     //               <div className="person-img">
//     //                 <img
//     //                   src="https://img.freepik.com/free-photo/portrait-man-having-great-time_23-2149443790.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1717027200&semt=ais_user"
//     //                   alt={item?.firstName}
//     //                 />
//     //               </div>
//     //               <div className="person-data">
//     //                 <div className="id_name">
//     //                   <span>
//     //                     {item?.employeeId} -{" "}
//     //                     <span className="name">{item?.firstName}</span>
//     //                   </span>
//     //                 </div>
//     //                 {/* <div
//     //     className="role"
//     //     style={{
//     //       color: .readableColor_2,
//     //     }}
//     //   >
//     //     <span>
//     //       <MdOutlineWork /> {item?.role} role
//     //     </span>
//     //     <span>
//     //       {" "}
//     //       <FaLocationDot /> {item?.location}location
//     //     </span>
//     //   </div> */}
//     //                 <div
//     //                   className="email"
//     //                   style={{
//     //                     color: applicationColor.readColor2,
//     //                   }}
//     //                 >
//     //                   <span>
//     //                     <MdEmail /> {item.email}
//     //                   </span>
//     //                 </div>
//     //               </div>
//     //             </section>
//     //           );
//     //         } else {
//     //           return (
//     //             <section
//     //               className="list-card"
//     //               key={item.employeeId}
//     //               style={{
//     //                 background: `${
//     //                   data.length === index + 1
//     //                     ? "red"
//     //                     : applicationColor.cardBg2
//     //                 }`,
//     //               }}
//     //             >
//     //               <div className="person-img">
//     //                 <img
//     //                   src="https://img.freepik.com/free-photo/portrait-man-having-great-time_23-2149443790.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1717027200&semt=ais_user"
//     //                   alt={item?.firstName}
//     //                 />
//     //               </div>
//     //               <div className="person-data">
//     //                 <div className="id_name">
//     //                   <span>
//     //                     {item?.employeeId} -{" "}
//     //                     <span className="name">{item?.firstName}</span>
//     //                   </span>
//     //                 </div>
//     //                 {/* <div
//     //   className="role"
//     //   style={{
//     //     color: .readableColor_2,
//     //   }}
//     // >
//     //   <span>
//     //     <MdOutlineWork /> {item?.role} role
//     //   </span>
//     //   <span>
//     //     {" "}
//     //     <FaLocationDot /> {item?.location}location
//     //   </span>
//     // </div> */}
//     //                 <div
//     //                   className="email"
//     //                   style={{
//     //                     color: applicationColor.readColor2,
//     //                   }}
//     //                 >
//     //                   <span>
//     //                     <MdEmail /> {item.email}
//     //                   </span>
//     //                 </div>
//     //               </div>
//     //             </section>
//     //           );
//     //         }
//     //       })
//     //     ) : (
//     //       <div className="no-items">
//     //         <img src={img} alt="" />
//     //       </div>
//     //     )}
//     //   </section>

//     //   <span>{loadingTerm === getMoreDataType ? <Loader /> : null}</span>
//     // </section>

//     <section
//       className="list-array"
//       style={{
//         color: applicationColor.readColor1,
//       }}
//     >
//       <h5 className="heading">{heading}</h5>
//       {recentHiresToDisplay.length > 0 ? (
//         recentHiresToDisplay.map((item) => (
//           <section
//             className="list-card"
//             key={item.employee_id}
//             style={{
//               background: applicationColor.cardBg2,
//             }}
//           >
//             <div className="person-img">
//               <img
//                 src="https://img.freepik.com/free-photo/portrait-man-having-great-time_23-2149443790.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1717027200&semt=ais_user"
//                 alt={item.basic_info?.firstName || "User"}
//               />
//             </div>
//             <div className="new-hires-info">
//               <p className="fw-semibold">
//                 {item.basic_info.first_name || "Unknown"} -{" "}
//                 {item.employee_id || "Unknown"}
//               </p>
//               <p className="d-flex align-items-center text-muted">
//                 <span className="pe-1">
//                   <HiOutlineMail />
//                 </span>
//                 {item.basic_info.email || "Unknown"}
//               </p>
//             </div>
//             {/* <div className="new-hire-dropdown">...</div> */}
//             <div className="dropdown new-hire-dropdown">
//               <Link
//                 className="user-image fs-4"
//                 role="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 ...
//               </Link>

//               <ul className="dropdown-menu user-dropdown">
//                 <Link
//                   className="dropdown-item"
//                   to={`/admin/employee/${item?.employee_id}`}
//                 >
//                   <CgProfile />
//                   Profile
//                 </Link>
//               </ul>
//             </div>
//           </section>
//         ))
//       ) : (
//         // <div className="no-items">
//         //   <img src={img} alt="No items" />
//         // </div>
//         <div className="no-items shimmer">
//           <div className="shimmer-item"></div>
//           <div className="shimmer-item"></div>
//           <div className="shimmer-item"></div>
//           <div className="shimmer-item"></div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default BirthdaysAndNewHires;

// // import React from "react";
// // import { useStateContext } from "../../Contexts/StateContext";
// // import { Link } from "react-router-dom";
// // import dummyUser from "../../../assets/Header/dummy-user.jpg";

// // function BirthdaysAndNewHires() {
// //   const { recentHire } = useStateContext();
// //   console.log(recentHire, " recentHire ");
// //   return (
// //     <div>
// //       {recentHire &&
// //         recentHire.map((item) => (
// //           <div
// //             style={
// //               {
// //                 // background: applicationColor.cardBg1,
// //                 // color: applicationColor.readColor1,
// //               }
// //             }
// //           >
// //             <div>
// //               <div>
// //                 <img
// //                   src={dummyUser}
// //                   alt="userImage"
// //                   width="30px"
// //                   height="30px"
// //                   className="rounded-circle"
// //                 />
// //                 <div className="details">
// //                   <span className="id">{item.basic_info.first_name}</span>
// //                   <span className="email">{item.basic_info.email}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //     </div>
// //   );
// // }
// // export default BirthdaysAndNewHires;

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
  {
    console.log(setrecentHire, "iuytfg");
  }
  {
    console.log(recentHire, "oiuyt");
  }
  const recentHiresToDisplay = recentHire?.slice(0, 5) || [];
  // console.log(orgDetails, "recent hire");
  return (
    // <section
    //   className="lists"
    //   style={{
    //     color: applicationColor.readColor1,
    //   }}
    // >
    //   <h5 className="heading">{heading}</h5>
    //   <section className="list-array">
    //     {data?.length > 0 ? (
    //       data.map((item, index) => {
    //         if (data.length === index + 1) {
    //           return (
    //             <section
    //               className="list-card"
    //               key={item.employeeId}
    //               style={{
    //                 background: applicationColor.cardBg2,
    //               }}
    //               ref={loadMoreRef}
    //             >
    //               <div className="person-img">
    //                 <img
    //                   src="https://img.freepik.com/free-photo/portrait-man-having-great-time_23-2149443790.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1717027200&semt=ais_user"
    //                   alt={item?.firstName}
    //                 />
    //               </div>
    //               <div className="person-data">
    //                 <div className="id_name">
    //                   <span>
    //                     {item?.employeeId} -{" "}
    //                     <span className="name">{item?.firstName}</span>
    //                   </span>
    //                 </div>
    //                 {/* <div
    //     className="role"
    //     style={{
    //       color: .readableColor_2,
    //     }}
    //   >
    //     <span>
    //       <MdOutlineWork /> {item?.role} role
    //     </span>
    //     <span>
    //       {" "}
    //       <FaLocationDot /> {item?.location}location
    //     </span>
    //   </div> */}
    //                 <div
    //                   className="email"
    //                   style={{
    //                     color: applicationColor.readColor2,
    //                   }}
    //                 >
    //                   <span>
    //                     <MdEmail /> {item.email}
    //                   </span>
    //                 </div>
    //               </div>
    //             </section>
    //           );
    //         } else {
    //           return (
    //             <section
    //               className="list-card"
    //               key={item.employeeId}
    //               style={{
    //                 background: `${
    //                   data.length === index + 1
    //                     ? "red"
    //                     : applicationColor.cardBg2
    //                 }`,
    //               }}
    //             >
    //               <div className="person-img">
    //                 <img
    //                   src="https://img.freepik.com/free-photo/portrait-man-having-great-time_23-2149443790.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1717027200&semt=ais_user"
    //                   alt={item?.firstName}
    //                 />
    //               </div>
    //               <div className="person-data">
    //                 <div className="id_name">
    //                   <span>
    //                     {item?.employeeId} -{" "}
    //                     <span className="name">{item?.firstName}</span>
    //                   </span>
    //                 </div>
    //                 {/* <div
    //   className="role"
    //   style={{
    //     color: .readableColor_2,
    //   }}
    // >
    //   <span>
    //     <MdOutlineWork /> {item?.role} role
    //   </span>
    //   <span>
    //     {" "}
    //     <FaLocationDot /> {item?.location}location
    //   </span>
    // </div> */}
    //                 <div
    //                   className="email"
    //                   style={{
    //                     color: applicationColor.readColor2,
    //                   }}
    //                 >
    //                   <span>
    //                     <MdEmail /> {item.email}
    //                   </span>
    //                 </div>
    //               </div>
    //             </section>
    //           );
    //         }
    //       })
    //     ) : (
    //       <div className="no-items">
    //         <img src={img} alt="" />
    //       </div>
    //     )}
    //   </section>
    //   <span>{loadingTerm === getMoreDataType ? <Loader /> : null}</span>
    // </section>
    <section
      className="list-array"
      style={{
        color: applicationColor.readColor1,
      }}
    >
      <h5 className="heading">{heading}</h5>
      {recentHiresToDisplay.length > 0 ? (
        recentHiresToDisplay.map((item) => (
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
            {/* <div className="new-hire-dropdown">...</div> */}

            {employeeDetails.collection === "USER" ? (
              <div className="dropdown new-hire-dropdown">
                <Link
                  className="user-image fs-4"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  ...
                </Link>

                <ul className="dropdown-menu user-dropdown">
                  {employeeDetails.collection === "USER" ? (
                    <Link
                      to={`/admin/employee/${item?.employee_id}`}
                      className="dropdown-item"
                    >
                      <CgProfile />
                      Profile
                    </Link>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            ) : (
              ""
            )}
          </section>
        ))
      ) : (
        // <div className="no-items">
        //   <img src={img} alt="No items" />
        // </div>
        <div className="no-items shimmer">
          <div className="shimmer-item"></div>
          <div className="shimmer-item"></div>
          <div className="shimmer-item"></div>
          <div className="shimmer-item"></div>
        </div>
      )}
    </section>
  );
};
export default BirthdaysAndNewHires;
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
