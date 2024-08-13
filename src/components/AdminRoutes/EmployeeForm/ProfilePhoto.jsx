// import React, { useState, useEffect, useRef } from "react";
// import Joi from "joi";
// import { useStateContext } from "../../Contexts/StateContext";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { FaCamera } from "react-icons/fa";
// import { backEndCallObjNothing } from "../../../services/mainService";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import "./ProfilePhoto.scss";

// const ProfilePhoto = () => {
//   // const { refs } = useStateContext();
//   const { loading, setErrors, setLoading, orgDetails, setOrgDetails, setEmployeeDetails, employeeDetails, profilePhoto, setProfilePhoto } =
//     useStateContext();
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
//         // setTimeout(() => {

//         // }, timeout);
//         setError("Profile photo size should not exceed 250KB.");
//         toastOptions.error("Profile photo size should not exceed 250KB.")
//         return;
//       }

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
//       setProfilePhoto(response?.data || "")
//       setFormData({ image: "" });
//       setError("");
//     } catch (error) {
//       console.error("Error updating image:", error);
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="profile-photo">
//       <h1>Profile Photo</h1>
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
//       <div className="banner-image mt-3">
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
import "./ProfilePhoto.scss";

const ProfilePhoto = () => {
  const {
    loading,
    setErrors,
    setLoading,
    orgDetails,
    setOrgDetails,
    setEmployeeDetails,
    employeeDetails,
    profilePhoto,
    setProfilePhoto,
  } = useStateContext();
  const { applicationColor } = useThemeContext();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({ image: "" });
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState("");

  const isValidBase64Image = (data) => {
    return typeof data === "string" && data.startsWith("data:image/");
  };

  const schema = Joi.object({
    image: Joi.string().required().messages({
      "any.required": "Profile photo is required.",
      "string.empty": "Profile photo should not be empty.",
    }),
  });

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

      // Clear the previous error toast if any
      // if (error) {
      //   toastOptions.dismiss();
      // }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setFormData({ image: base64String });
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
      await schema.validateAsync(formData, { abortEarly: false });
      const response = await backEndCallObjNothing("/emp/update_dp", {
        image: formData.image,
      });
      console.log(response?.data)
      setProfilePhoto(response?.data || "");
      setFormData({ image: "" });
      setError("");
      toastOptions.success("Profile photo updated successfully.");
    } catch (error) {
      console.error("Error updating image:", error);
      setError(error.message);
      toastOptions.error(error.message);
    }
  };

  return (
    <div className="profile-photo">
      {/* <h1>Profile Photo</h1> */}
      <div
        className="profile-image"
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        onClick={handleProfilePhotoSelection}
      >
        <img
          className="main_profile_photo img-fluid"
          src={
            profilePhoto?.dp
              ? profilePhoto?.dp
              : "https://cdnb.artstation.com/p/assets/images/images/034/457/389/large/shin-min-jeong-.jpg?1612345145"
          }
          alt="profile_photo"
          width="100"
        />

        {showOverlay && (
          <div className="overlay">
            <FaCamera className="camera-icon" />
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      <div className="banner-image">
        <img
          src="https://img.freepik.com/premium-vector/abstract-dark-blue-modern-futuristic-science-technology-hi-tech-digital-abstract-dark-blue-colorful-design-banner-background-vector-abstract-graphic-design-banner-pattern-background-web-template_181182-33425.jpg"
          alt="banner-bg-image"
        />
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
  );
};

export default ProfilePhoto;
