// import React, { useState } from "react";
// import BasicEmployeeData from "../../AdminRoutes/EmployeeForm/BasicEmployeeData";
// import WorkInformationData from "../../AdminRoutes/EmployeeForm/WorkInformationData";
// import HierarchyData from "../../AdminRoutes/EmployeeForm/HierarchyData";
// import PersonalDetailsData from "../../AdminRoutes/EmployeeForm/PersonalDetailsData";
// import Loader from "../../Loader/Loader";
// import "./ReusableProfileForm.scss";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { useStateContext } from "../../Contexts/StateContext";
// // import "./ReusableProfileForm.scss";
// import ProfilePhoto from "../../AdminRoutes/EmployeeForm/ProfilePhoto";

// const ReusableProfileForm = ({ form, type, submit }) => {
//   const { loading, loadingTerm } = useStateContext();
//   const [formData, setFormData] = useState(form);
//   const { applicationColor } = useThemeContext();

//   const handleSubmit = async (e) => {
//     console.log(e, "eee")
//     e.preventDefault();
//     await submit(formData, setFormData);
//   };

//   return (
//     <>
//       <form className="profile-form" onSubmit={handleSubmit}>
//         {/* <ProfilePhoto formData={formData} setFormData={setFormData} /> */}
//         <BasicEmployeeData formData={formData} setFormData={setFormData} type={type} />
//         <WorkInformationData
//           formData={formData}
//           setFormData={setFormData}
//           className={"workInformationData"}
//         />
//         <HierarchyData formData={formData} setFormData={setFormData} />
//         <PersonalDetailsData formData={formData} setFormData={setFormData} />

//         <div className="edit-details">
//           {/* {loading && loadingTerm === type ? (
//             <>
//               <Loader />
//             </>
//           ) : ( */}
//           <button
//             style={{ background: applicationColor.buttonColor }}
//             disabled={loadingTerm === type}
//             type="submit"
//           >
//             {loading && loadingTerm === type ? <Loader /> : type}
//           </button>
//           {/* )} */}
//         </div>
//       </form>
//     </>
//   );
// };

// export default ReusableProfileForm;
import React, { useState } from "react";
import BasicEmployeeData from "../../AdminRoutes/EmployeeForm/BasicEmployeeData";
import WorkInformationData from "../../AdminRoutes/EmployeeForm/WorkInformationData";
import HierarchyData from "../../AdminRoutes/EmployeeForm/HierarchyData";
import PersonalDetailsData from "../../AdminRoutes/EmployeeForm/PersonalDetailsData";
import Loader from "../../Loader/Loader";
import "./ReusableProfileForm.scss";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useStateContext } from "../../Contexts/StateContext";

const ReusableProfileForm = ({ form, type, submit }) => {
  const { loading, loadingTerm } = useStateContext();
  const [formData, setFormData] = useState(form);
  const { applicationColor } = useThemeContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit(formData, setFormData);
  };
  console.log("formdata", form);
  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <BasicEmployeeData
        formData={formData}
        setFormData={setFormData}
        type={type}
      />

      <WorkInformationData
        formData={formData}
        setFormData={setFormData}
        className={"workInformationData"}
      />
      <HierarchyData formData={formData} setFormData={setFormData} />
      <PersonalDetailsData formData={formData} setFormData={setFormData} />

      <div className="edit-details">
        <button
          style={{ background: applicationColor.buttonColor }}
          disabled={loadingTerm === type}
          type="submit"
        >
          {loading && loadingTerm === type ? <Loader /> : type}
        </button>
      </div>
    </form>
  );
};

export default ReusableProfileForm;
