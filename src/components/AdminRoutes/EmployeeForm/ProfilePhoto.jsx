import React, { useState, useEffect, useRef } from "react";
import Joi from "joi";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { FaCamera } from "react-icons/fa";
import { backEndCallObjNothing } from "../../../services/mainService";
import { toastOptions } from "../../../Utils/FakeRoutes";
import "./ProfilePhoto.scss"; // Assuming you have custom styles here
import { Input_area } from "../../common/ALLINPUTS/AllInputs";
import { IoHandLeft } from "react-icons/io5";

const ProfilePhoto = () => {
  const {
    setProfilePhoto,
    profilePhoto,
    employeedata,
    setEmployeedata,
    aboutme,
    setAboutme,
  } = useStateContext();

  const { applicationColor } = useThemeContext();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({ image: "", about_me: "" });
  const [btndisable, setBtndisabled] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState("");
  const { employeeDetails } = useStateContext();
  const schema = Joi.object({
    image: Joi.string().optional().allow(null, "").messages({
      "any.required": "Profile photo is required.",
    }),
    about_me: Joi.string().max(250).optional().allow(null, "").messages({
      "string.max": "About Me cannot exceed 250 characters.",
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

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setFormData((prevData) => ({ ...prevData, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };
  const gettingEmployeeById = async () => {
    try {
      const response = await backEndCallObjNothing("/emp_get/get_profile", {
        employee_id: employeeDetails?.employee_id || "",
      });

      // setSelectedEmployeeData(response.profile.leaves);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  useEffect(() => {
    gettingEmployeeById();
  }, [employeeDetails]);
  useEffect(() => {
    if (formData.image) {
      handleSubmit();
    } else if (formData.about_me) {
      handleSubmit();
    }
  }, [formData.image, formData.image]);

  useEffect(() => {
    if (employeedata?.profile?.personal_details?.about_me) {
      setFormData((prevData) => ({
        ...prevData,
        about_me: employeedata.profile.personal_details.about_me,
      }));
    }
  }, [employeedata]);
  const handleSubmit = async () => {
    try {
      setBtndisabled(true);
      await schema.validateAsync(formData, { abortEarly: false });
      const response = await backEndCallObjNothing("/emp/update_dp", {
        image: formData.image,
        about_me: formData.about_me || "",
      });

      await setProfilePhoto(response?.data?.dp);

      setAboutme(response.data.dp);

      setFormData((prevData) => ({
        ...prevData,
        about_me: response?.profile?.personal_details?.about_me,
      }));

      setError("");
      setBtndisabled(false);
      toastOptions.success(response.success);
    } catch (error) {
      setBtndisabled(false);

      setError(error.message);
      toastOptions.error(error.message);
    }
  };

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
