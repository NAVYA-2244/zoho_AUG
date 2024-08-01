// import React, { useState, useRef, useLayoutEffect } from "react";
// // import { images } from "./data";
// import { AiOutlineArrowRight } from "react-icons/ai";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// // import "./Login.scss";
// import EmployeeLoginForm from "./EmployeeLoginPage/EmployeeLoginForm";
// import ForgotPassword from "./ForgotPassword/ForgotPassword";
// import { useStateContext } from "../Contexts/StateContext";
// import { useThemeContext } from "../Contexts/ThemesContext";
// // import img from "../Assets/shoe4.webp";

// const Login = () => {
//   const { applicationColor } = useThemeContext();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { setErrors } = useStateContext();

//   const nextSlide = () => {
//     setCurrentSlide(currentSlide === 1 ? 0 : currentSlide + 1);
//     setErrors({});
//   };

//   const prevSlide = () => {
//     setCurrentSlide(currentSlide === 0 ? 1 : currentSlide - 1);
//     setErrors({});
//   };

//   const [width, setWidth] = useState({ width: 0 });
//   const parentRef = useRef(null);

//   const updateWidth = () => {
//     setWidth((prevState) => {
//       return { ...prevState, width: parentRef.current.offsetWidth };
//     });
//   };

//   useLayoutEffect(() => {
//     updateWidth();
//     window.addEventListener("resize", updateWidth);
//     return () => window.removeEventListener("resize", updateWidth);
//   }, []);

//   return (
//     <section
//       className="login_register"
//       style={{ background: applicationColor.mainBg }}
//     >
//       <div className="slider">
//         <div
//           className="parentSlider"
//           style={{ transform: `translate(-${currentSlide * width.width}px)` }}
//         >
//           <div className="slidingComponent" ref={parentRef}>
//             <EmployeeLoginForm prevSlide={prevSlide} nextSlide={nextSlide} />
//           </div>

//           {/* // */}
//           <div className="slidingComponent">
//             <ForgotPassword prevSlide={prevSlide} nextSlide={nextSlide} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;
import React, { useState, useRef, useLayoutEffect } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import EmployeeLoginForm from "./EmployeeLoginPage/EmployeeLoginForm";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import AdminLoginForm from "./AdminLoginPage/AdminLoginForm"; // Assume this is the admin login form component
import { useStateContext } from "../Contexts/StateContext";
import { useThemeContext } from "../Contexts/ThemesContext";
import LoginForm from "./EmployeeLoginPage/LoginForm";

const Login = () => {
  const { applicationColor } = useThemeContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formType, setFormType] = useState("user"); // "user" or "admin"
  const { setErrors } = useStateContext();

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 1 ? 0 : currentSlide + 1);
    setErrors({});
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 1 : currentSlide - 1);
    setErrors({});
  };

  const [width, setWidth] = useState({ width: 0 });
  const parentRef = useRef(null);

  const updateWidth = () => {
    setWidth((prevState) => {
      return { ...prevState, width: parentRef.current.offsetWidth };
    });
  };

  useLayoutEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <section
      className="login_register"
      style={{ background: applicationColor.mainBg }}
    >
      <div className="form-toggle-buttons">
        <button
          onClick={() => setFormType("user")}
          style={{
            background: formType === "user" ? applicationColor.tabColor : "#fff",
            color: formType === "user" ? "#fff" : "#000",
          }}
        >
          User Login
        </button>
        <button
          onClick={() => setFormType("admin")}
          style={{
            background: formType === "admin" ? applicationColor.tabColor : "#fff",
            color: formType === "admin" ? "#fff" : "#000",
          }}
        >
          Admin Login
        </button>
      </div>

      <div className="slider">
        <div
          className="parentSlider"
          style={{ transform: `translate(-${currentSlide * width.width}px)` }}
        >
          <div className="slidingComponent" ref={parentRef}>
            {formType === "user" ? (
              <LoginForm prevSlide={prevSlide} nextSlide={nextSlide} />
            ) : (

              <EmployeeLoginForm prevSlide={prevSlide} nextSlide={nextSlide} />
            )}
          </div>

          <div className="slidingComponent">
            <ForgotPassword prevSlide={prevSlide} nextSlide={nextSlide} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
