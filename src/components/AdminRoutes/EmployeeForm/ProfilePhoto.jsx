// // import React, { useState, useEffect, useRef } from "react";
// // import Joi from "joi";
// // import { useStateContext } from "../../Contexts/StateContext";
// // import { useThemeContext } from "../../Contexts/ThemesContext";
// // import { FaCamera } from "react-icons/fa";
// // import { backEndCallObjNothing } from "../../../services/mainService";
// // import { toastOptions } from "../../../Utils/FakeRoutes";
// // import "./ProfilePhoto.scss";

// // const ProfilePhoto = () => {
// //   // const { refs } = useStateContext();
// //   const { loading, setErrors, setLoading, orgDetails, setOrgDetails, setEmployeeDetails, employeeDetails, profilePhoto, setProfilePhoto } =
// //     useStateContext();
// //   const { applicationColor } = useThemeContext();
// //   const fileInputRef = useRef(null);
// //   const [formData, setFormData] = useState({ image: "" });
// //   const [showOverlay, setShowOverlay] = useState(false);
// //   const [error, setError] = useState("");

// //   const isValidBase64Image = (data) => {
// //     return typeof data === "string" && data.startsWith("data:image/");
// //   };

// //   const schema = Joi.object({
// //     image: Joi.string().required().messages({
// //       "any.required": "Profile photo is required.",
// //       "string.empty": "Profile photo should not be empty.",
// //     }),
// //   });

// //   const handleProfilePhotoSelection = () => {
// //     fileInputRef.current.click(); // Trigger file input click
// //   };

// //   const handleFileInputChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       if (file.size > 250 * 1024) {
// //         // setTimeout(() => {

// //         // }, timeout);
// //         setError("Profile photo size should not exceed 250KB.");
// //         toastOptions.error("Profile photo size should not exceed 250KB.")
// //         return;
// //       }

// //       const reader = new FileReader();
// //       reader.onload = (event) => {
// //         const base64String = event.target.result;

// //         setFormData({ image: base64String });
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   useEffect(() => {
// //     if (formData.image) {
// //       handleSubmit();
// //     }
// //   }, [formData.image]);

// //   const handleSubmit = async () => {
// //     try {
// //       await schema.validateAsync(formData, { abortEarly: false });
// //       const response = await backEndCallObjNothing("/emp/update_dp", {
// //         image: formData.image,
// //       });
// //       setProfilePhoto(response?.data || "")
// //       setFormData({ image: "" });
// //       setError("");
// //     } catch (error) {
// //       console.error("Error updating image:", error);
// //       setError(error.message);
// //     }
// //   };

// //   return (
// //     <div className="profile-photo">
// //       <h1>Profile Photo</h1>
// //       <div
// //         className="profile-image"
// //         onMouseEnter={() => setShowOverlay(true)}
// //         onMouseLeave={() => setShowOverlay(false)}
// //         onClick={handleProfilePhotoSelection}
// //       >
// //         <img
// //           className="main_profile_photo img-fluid"
// //           src={
// //             profilePhoto
// //               ? profilePhoto
// //               : "https://cdnb.artstation.com/p/assets/images/images/034/457/389/large/shin-min-jeong-.jpg?1612345145"
// //           }
// //           alt="profile_photo"
// //           width="100"
// //         />

// //         {showOverlay && (
// //           <div className="overlay">
// //             <FaCamera className="camera-icon" />
// //           </div>
// //         )}
// //       </div>

// //       {error && <div className="error-message">{error}</div>}
// //       <div className="banner-image mt-3">
// //         <img
// //           src="https://img.freepik.com/premium-vector/abstract-dark-blue-modern-futuristic-science-technology-hi-tech-digital-abstract-dark-blue-colorful-design-banner-background-vector-abstract-graphic-design-banner-pattern-background-web-template_181182-33425.jpg"
// //           alt="banner-bg-image"
// //         />
// //       </div>

// //       <form style={{ display: "none" }}>
// //         <input
// //           type="file"
// //           ref={fileInputRef}
// //           className="form-control"
// //           id="image"
// //           name="image"
// //           accept="image/*"
// //           onChange={handleFileInputChange}
// //         />
// //       </form>
// //     </div>
// //   );
// // };

// // export default ProfilePhoto;

// import React, { useState, useEffect, useRef } from "react";
// import Joi from "joi";
// import { useStateContext } from "../../Contexts/StateContext";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { FaCamera } from "react-icons/fa";
// import { backEndCallObjNothing } from "../../../services/mainService";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import "./ProfilePhoto.scss";
// import { Input_area } from "../../common/ALLINPUTS/AllInputs";

// const ProfilePhoto = () => {
//   const {
//     loading,
//     setErrors,
//     setLoading,
//     orgDetails,
//     setOrgDetails,
//     setEmployeeDetails,
//     employeeDetails,
//     profilePhoto,
//     setProfilePhoto,
//   } = useStateContext();
//   const { applicationColor } = useThemeContext();
//   const fileInputRef = useRef(null);
//   const [formData, setFormData] = useState({ image: "" });
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [error, setError] = useState("");

//   const isValidBase64Image = (data) => {
//     return typeof data === "string" && data.startsWith("data:image/");
//   };

//   const schema = Joi.object({
//     image: Joi.string().required().messages({
//       "any.required": "Profile photo is required.",
//       "string.empty": "Profile photo should not be empty.",
//     }),
//   });

//   const handleProfilePhotoSelection = () => {
//     fileInputRef.current.click(); // Trigger file input click
//   };

//   const handleFileInputChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 250 * 1024) {
//         setError("Profile photo size should not exceed 250KB.");
//         toastOptions.error("Profile photo size should not exceed 250KB.");
//         return;
//       }

//       // Clear the previous error toast if any
//       // if (error) {
//       //   toastOptions.dismiss();
//       // }

//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const base64String = event.target.result;
//         setFormData({ image: base64String });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     if (formData.image) {
//       handleSubmit();
//     }
//   }, [formData.image]);

//   const handleSubmit = async () => {
//     try {
//       await schema.validateAsync(formData, { abortEarly: false });
//       const response = await backEndCallObjNothing("/emp/update_dp", {
//         image: formData.image,
//       });
//       console.log(response?.data,"navyaa")
//       setProfilePhoto(response?.data || "");
//       setFormData({ image: "" });
//       setError("");
//       toastOptions.success("Profile photo updated successfully.");
//     } catch (error) {
//       console.error("Error updating image:", error);
//       setError(error.message);
//       toastOptions.error(error.message);
//     }
//   };

//   return (
//     <>
//     <div className="profile-photo">
//       {/* <h1>Profile Photo</h1> */}
//       <div
//         className="profile-image"
//         onMouseEnter={() => setShowOverlay(true)}
//         onMouseLeave={() => setShowOverlay(false)}
//         onClick={handleProfilePhotoSelection}
//       >
//         <img
//           className="main_profile_photo img-fluid"
//           src={
//             profilePhoto
//               ? profilePhoto
//               : "https://cdnb.artstation.com/p/assets/images/images/034/457/389/large/shin-min-jeong-.jpg?1612345145"
//           }
//           alt="profile_photo"
//           width="100"
//         />

//         {showOverlay && (
//           <div className="overlay">
//             <FaCamera className="camera-icon" />
//           </div>
//         )}
//       </div>

//       {error && <div className="error-message">{error}</div>}
//       <div className="banner-image">
//         <img
//           src="https://img.freepik.com/premium-vector/abstract-dark-blue-modern-futuristic-science-technology-hi-tech-digital-abstract-dark-blue-colorful-design-banner-background-vector-abstract-graphic-design-banner-pattern-background-web-template_181182-33425.jpg"
//           alt="banner-bg-image"
//         />
//       </div>

//       <form style={{ display: "none" }}>
//         <input
//           type="file"
//           ref={fileInputRef}
//           className="form-control"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={handleFileInputChange}
//         />
        
//       </form>
     
//     </div>
//     <div className="col-lg-12 col-md-4 col-sm-6">
//           <Input_area
//             type={"textarea"}
//             name={"about_me"}
//             placeholder={"About Me"}
//             value={formData.about_me}
//             setForm={setFormData}
//             schema={schema.about_me}
//             length={250}
//             maxLength={250}
//             // inputRef={(el) => (refs.current.about_me = el)}
//           />
//         </div>
//     </>
//   );
// };

// export default ProfilePhoto;
// import React, { useState, useEffect, useRef } from "react";
// import Joi from "joi";
// import { useStateContext } from "../../Contexts/StateContext";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { FaCamera } from "react-icons/fa";
// import { backEndCallObjNothing } from "../../../services/mainService";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import "./ProfilePhoto.scss";
// import { Input_area } from "../../common/ALLINPUTS/AllInputs";

// const ProfilePhoto = () => {
//   const {
//     setErrors,
//     setProfilePhoto,
//     profilePhoto,
//   } = useStateContext();
//   const { applicationColor } = useThemeContext();
//   const fileInputRef = useRef(null);

//   // Form data now includes both image and about_me fields
//   const [formData, setFormData] = useState({ image: "", about_me: "" });
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [error, setError] = useState("");

//   const isValidBase64Image = (data) => {
//     return typeof data === "string" && data.startsWith("data:image/");
//   };

//   // Joi schema now includes 'about_me' validation
//   const schema = Joi.object({
//     image: Joi.string().required().messages({
//       "any.required": "Profile photo is required.",
//       "string.empty": "Profile photo should not be empty.",
//     }),
//     about_me: Joi.string().max(250).optional().allow(null, "").messages({
//       "string.max": "About Me cannot exceed 250 characters.",
//     }),
//   });

//   const handleProfilePhotoSelection = () => {
//     fileInputRef.current.click(); // Trigger file input click
//   };

//   const handleFileInputChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 250 * 1024) {
//         setError("Profile photo size should not exceed 250KB.");
//         toastOptions.error("Profile photo size should not exceed 250KB.");
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const base64String = event.target.result;
//         setFormData({ ...formData, image: base64String });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     if (formData.image) {
//       handleSubmit();
//     }
//   }, [formData.image]);

//   const handleSubmit = async () => {
//     try {
//       await schema.validateAsync(formData, { abortEarly: false });
//       const response = await backEndCallObjNothing("/emp/update_dp", {
//         image: formData.image,
//         about_me: formData.about_me, // Include 'about_me' in the payload
//       });
//       setProfilePhoto(response?.data?.image || "");
//       setFormData({ image: "", about_me: "" });
//       setError("");
//       toastOptions.success("Profile photo updated successfully.");
//     } catch (error) {
//       console.error("Error updating image:", error);
//       setError(error.message);
//       toastOptions.error(error.message);
//     }
//   };

//   return (
//     <>
//       <div className="profile-photo">
//         <div
//           className="profile-image"
//           onMouseEnter={() => setShowOverlay(true)}
//           onMouseLeave={() => setShowOverlay(false)}
//           onClick={handleProfilePhotoSelection}
//         >
//           <img
//             className="main_profile_photo img-fluid"
//             src={
//               profilePhoto
//                 ? profilePhoto
//                 : "https://cdnb.artstation.com/p/assets/images/images/034/457/389/large/shin-min-jeong-.jpg?1612345145"
//             }
//             alt="profile_photo"
//             width="100"
//           />

//           {showOverlay && (
//             <div className="overlay">
//               <FaCamera className="camera-icon" />
//             </div>
//           )}
//         </div>

//         {error && <div className="error-message">{error}</div>}
//         <div className="banner-image">
//           <img
//             src="https://img.freepik.com/premium-vector/abstract-dark-blue-modern-futuristic-science-technology-hi-tech-digital-abstract-dark-blue-colorful-design-banner-background-vector-abstract-graphic-design-banner-pattern-background-web-template_181182-33425.jpg"
//             alt="banner-bg-image"
//           />
//         </div>

//         <form style={{ display: "none" }}>
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="form-control"
//             id="image"
//             name="image"
//             accept="image/*"
//             onChange={handleFileInputChange}
//           />
//         </form>
//       </div>

//       {/* Input field for "About Me" */}
//       <div className="col-lg-12 col-md-4 col-sm-6 mt-3">
//         <Input_area
//           type={"textarea"}
//           name={"about_me"}
//           placeholder={"About Me"}
//           value={formData.about_me}
//           setForm={setFormData}
//           schema={schema.about_me}
//           length={250}
//           maxLength={250}
//         />
//       </div>
//     </>
//   );
// };

// export default ProfilePhoto;
// import React, { useState, useEffect, useRef } from "react";
// import Joi from "joi";
// import { useStateContext } from "../../Contexts/StateContext";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { FaCamera } from "react-icons/fa";
// import { backEndCallObjNothing } from "../../../services/mainService";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import "./ProfilePhoto.scss"; // Assuming you have custom styles here
// import { Input_area } from "../../common/ALLINPUTS/AllInputs";

// const ProfilePhoto = () => {
//   const { setProfilePhoto, profilePhoto } = useStateContext();
//   const { applicationColor } = useThemeContext();
//   const fileInputRef = useRef(null);

//   const [formData, setFormData] = useState({ image: "", about_me: "" });
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [error, setError] = useState("");

//   const schema = Joi.object({
//     image: Joi.string().optional().allow(null, "").messages({
//       "any.required": "Profile photo is required.",
//     }),
//     about_me: Joi.string().max(250).optional().allow(null, "").messages({
//       "string.max": "About Me cannot exceed 250 characters.",
//     }),
//   });

//   const handleProfilePhotoSelection = () => {
//     fileInputRef.current.click(); // Trigger file input click
//   };

//   const handleFileInputChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 250 * 1024) {
//         setError("Profile photo size should not exceed 250KB.");
//         toastOptions.error("Profile photo size should not exceed 250KB.");
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const base64String = event.target.result;
//         setFormData({ ...formData, image: base64String });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     if (formData.image) {
//       handleSubmit();
//     }
//   }, [formData.image]);

//   const handleSubmit = async () => {
//     try {
//       await schema.validateAsync(formData, { abortEarly: false });
//       const response = await backEndCallObjNothing("/emp/update_dp", {
//         image: formData.image,
//         about_me: formData.about_me,
//       });
//       setProfilePhoto(response?.data?.dp || "");
//       setFormData({ image: "", about_me: "" });
//       setError("");
//       toastOptions.success("Profile photo updated successfully.");
//     } catch (error) {
//       console.error("Error updating image:", error);
//       setError(error.message);
//       toastOptions.error(error.message);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       {/* Profile Photo and About Me in a single row */}
//       <div className="row align-items-center">
//         <div className="col-md-4 d-flex justify-content-center " >
//           <div
//             className="profile-image position-relative d-inline-block"
//             onMouseEnter={() => setShowOverlay(true)}
//             onMouseLeave={() => setShowOverlay(false)}
//             onClick={handleProfilePhotoSelection}
//           >
//             <img
//               className="main_profile_photo img-fluid "
//               src={
//                 profilePhoto
//                   ? profilePhoto
//                   : "https://cdnb.artstation.com/p/assets/images/images/034/457/389/large/shin-min-jeong-.jpg?1612345145"
//               }
//               alt="profile_photo"
              
              
   

 
//     style={{
//      width:"150px",
//               height:"150px",
//       borderRadius: "100%",
//       marginTop: "0px",
//       objectFit: "contain",  // Choose either "cover" or "contain"
//       borderRadius: "100%", // Correct camelCase for border radius
//       marginTop: "0px"      // Correct camelCase for marginTop
//     }}
// />    
         
//             {showOverlay && (
//               <div className="overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 text-white rounded-circle">
//                 <FaCamera className="camera-icon" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* About Me Input */}
//         <div className="col-md-8">
//           <div className="form-group">
//             <Input_area
//               type={"textarea"}
//               name={"about_me"}
//               placeholder={"About Me"}
//               value={formData.about_me}
//               setForm={setFormData}
//               schema={schema.about_me}
//               length={250}
//               maxLength={250}
//               className="form-control"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Error message */}
//       {/* {error && <div className="text-danger mt-2">{error}</div>} */}

//       {/* Submit Button */}
//       <div className="row mt-3">
//         <div className="col-12 text-center">
//           <button
//             className="btn btn-primary"
//             onClick={handleSubmit}
//             style={{
//               backgroundColor: applicationColor,
//               borderColor: "white",
//             }}
//           >
//             Submit
//           </button>
//         </div>
//       </div>

//       {/* Hidden file input */}
//       <form style={{ display: "none" }}>
//         <input
//           type="file"
//           ref={fileInputRef}
//           className="form-control"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={handleFileInputChange}
//         />
//       </form>
//     </div>
//   );
// };

// export default ProfilePhoto;
import React, { useState, useEffect, useRef } from "react";
import Joi from "joi";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { FaCamera } from "react-icons/fa";
import { backEndCallObjNothing } from "../../../services/mainService";
import { toastOptions } from "../../../Utils/FakeRoutes";
import "./ProfilePhoto.scss"; // Assuming you have custom styles here
import { Input_area } from "../../common/ALLINPUTS/AllInputs";

const ProfilePhoto = () => {
  const { setProfilePhoto, profilePhoto , employeedata,setEmployeedata,aboutme, setAboutme} = useStateContext();
  console.log(aboutme,"about meeeeeeee")
  console.log(employeedata?.profile?.personal_details?.about_me,"profilePhoto")

  const { applicationColor } = useThemeContext();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({ image: "", about_me: "" });
const[btndisable,setBtndisabled]=useState(false)
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState("");
  const {
    
    employeeDetails,
    
  } = useStateContext();
  const schema = Joi.object({
    image: Joi.string().optional().allow(null, "").messages({
      "any.required": "Profile photo is required.",
    }),
    about_me: Joi.string().max(250).optional().allow(null, "").messages({
      "string.max": "About Me cannot exceed 250 characters.",
    }),
  });
  
console.log(formData,"formdata")

  const handleProfilePhotoSelection = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 250 * 1024) {
        setError("Profile photo size should not exceed 250KB.");
        toastOptions.error("Profile photo size should not exceed 250KB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setFormData((prevData) => ({ ...prevData, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (formData.image) {
      handleSubmit();
    }
  }, [formData.image]);

  const handleSubmit = async () => {
    
    try {
      setBtndisabled(true)
      await schema.validateAsync(formData, { abortEarly: false });
      const response = await backEndCallObjNothing("/emp/update_dp", {
        image: formData.image,
        about_me: formData.about_me,
      });
      console.log(response)
      const res = await backEndCallObjNothing("/emp_get/get_profile");
      console.log(res, "employeeeeeeee");
      setProfilePhoto(response?.profile?.images?.dp);
      // setEmployeedata(res); // Update state correctly
      // formData({about_me:profile?.personal_details?.about_me},)
      // Update profile photo and about_me with response data
      setAboutme(res?.profile?.personal_details?.about_me )
      setProfilePhoto(response?.data?.dp || "");
      setFormData((prevData) => ({
        ...prevData,
        about_me: aboutme 
      }));
      
      setError("");
      setBtndisabled(false)
      toastOptions.success(response.success);
    } catch (error) {
      setBtndisabled(false)
      console.error("Error updating profile:", error?.response?.data);
      setError(error.message);
      toastOptions.error(error.message);
    }
  };
console.log(aboutme,"about")

  const handleInputChange = (e) => {
    if (e && e.target && e.target.name) {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      console.error("Invalid input event or missing name attribute.");
    }
  };
  

  return (
<>


    <div className="container mt-4">
   
      <div className="row align-items-center">
        <div className="col-md-4 d-flex justify-content-center">
          <div
            className="profile-image position-relative d-inline-block"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
            onClick={handleProfilePhotoSelection}
          >
            <img
              className="main_profile_photo img-fluid"
              src={
                profilePhoto
                  ? profilePhoto
                  : "https://cdnb.artstation.com/p/assets/images/images/034/457/389/large/shin-min-jeong-.jpg?1612345145"
              }
              alt="profile_photo"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "100%",
                marginTop: "0px",
                objectFit: "contain",
              }}
            />
            {showOverlay && (
              <div className="overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 text-white rounded-circle">
                <FaCamera className="camera-icon" />
              </div>
            )}
          </div>
        </div>

       
        <div className="col-md-8">
          
          <div className="form-group">
           
            <Input_area
  type="textarea"
  name="about_me"  
  placeholder="About Me"
  value={formData.about_me}
  setForm={setFormData}
  schema={schema.about_me}
  length={250}
  maxLength={250}
  className="form-control"
/>

          </div>
        </div>
      </div>

     
      {error && <div className="text-danger mt-2">{error}</div>}

     
      <div className="row mt-3">
        <div className="col-12 text-center">
          <button
            className="btn btn-primary"
            disabled={btndisable}
            onClick={handleSubmit}
            style={{
              backgroundColor: applicationColor,
              borderColor: "white",
            }}
          >
            Submit
          </button>
        </div>
      </div>

     
      <form style={{ display: "none" }}>
        <input
          type="file"
          ref={fileInputRef}
          className="form-control"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileInputChange}
        />
      </form>
    </div>
    </>
  );
};

export default ProfilePhoto;
