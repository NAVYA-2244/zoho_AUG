import React, { useEffect, useState } from "react";
// import "./Sidebar.scss";
import { motion } from "framer-motion";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import {
  employeeSidebar,
  mangerSidebar,
  superAdminSidebar,
  teamLeadSidebar,
} from "../../../Utils/FakeRoutes";
import { useStateContext } from "../../Contexts/StateContext";
import logo from "../../../assets/Sidebar/cg-logo.png";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useThemeContext } from "../../Contexts/ThemesContext";
import dummyUser from "../../../assets/Header/dummy-user.jpg";
// import { isManagerRouter, isTeamLeadRouter } from "../../../Utils/Routers";

const Sidebar = () => {
  const navigate = useNavigate();
  const { applicationColor } = useThemeContext();
  const { setCurrentPageName, orgLogo } = useStateContext();
  const location = useLocation();
  const {
    setErrors,
    openSubmenu,
    setOpenSubmenu,
    isOpen,
    employeeDetails,
    setIsOpen,
  } = useStateContext();

  const settingsiderbar = () => {
    if (employeeDetails.admin_type === "1") {
      return superAdminSidebar;
    } else if (employeeDetails?.admin_type=== "2") {
      return mangerSidebar;
    }
    else if (employeeDetails?.admin_type === "3") {
      return teamLeadSidebar;
    } else {
      return employeeSidebar; // Default to employeeSidebar if no match
    
  };
   
  };
  const [menu, setMenu] = useState(settingsiderbar);

  useEffect(() => {
    setMenu(settingsiderbar());
  }, [employeeDetails]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (id) => {
    setOpenSubmenu((prevState) => (prevState === id ? null : id));
  };

  const sidebarVariants = {
    open: {
      width: "250px",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    closed: {
      width: "0px",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const logout = (path) => {
    path();
    setErrors({});
    navigate("/login");
    window.location.reload("/login");
  };

  const navigating = (path, label) => {
    setErrors({});
    navigate(path);
    setIsOpen(false);
    setCurrentPageName(label);
  };

  const handleClick = (path, label) => {
    typeof path === "string" ? navigating(path, label) : logout(path);
  };

  const renderingMenuItems = (items) => {
    return items?.map((item) => {
      const isActive = location.pathname === item.path;
      const submenuActive =
        item.children &&
        item.children.some((child) => location.pathname === child.path);
      const submenuOpen = openSubmenu === item.id;

      return (
        <motion.li key={item.id} className="menu-item">
          {item.children ? (
            <div
              className="menu-link main-menu"
              onClick={() => toggleSubmenu(item.id)}
              style={{
                backgroundColor: submenuActive
                  ? applicationColor.tabBg
                  : "transparent",

                color: submenuActive
                  ? applicationColor.tabColor
                  : applicationColor.readColor2,
              }}
            >
              <div className="menu">
                <div className="icon">
                  <span
                    style={{
                      color: submenuActive
                        ? applicationColor.tabColor
                        : applicationColor.readColor2,
                    }}
                  >
                    {" "}
                    {item.icon}
                  </span>
                </div>
                <motion.span
                  className="menu-label"
                  initial={{ opacity: 0, display: "none" }}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    display: isOpen ? "inline" : "none",
                  }}
                >
                  {item.label}
                </motion.span>
              </div>

              <div className="arrow">
                {submenuOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </div>
            </div>
          ) : (
            <NavLink
              to={item.path}
              className="menu-link"
              style={{
                backgroundColor: isActive
                  ? applicationColor.tabBg
                  : "transparent",

                color: isActive
                  ? applicationColor.tabColor
                  : applicationColor.readColor2,
              }}
              onClick={() => handleClick(item.path, item.label)}
            >
              <div className="icon">
                <span
                  style={{
                    color: isActive
                      ? applicationColor.tabColor
                      : applicationColor.readColor2,
                  }}
                >
                  {" "}
                  {item.icon}
                </span>
              </div>

              <motion.span
                className="menu-label"
                initial={{ opacity: 0, display: "none" }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  display: isOpen ? "inline" : "none",
                }}
              >
                {item.label}
              </motion.span>
            </NavLink>
          )}
          {item.children && (
            <motion.ul
              className="submenu"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openSubmenu === item.id ? "auto" : 0,
                opacity: openSubmenu === item.id ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {renderingMenuItems(item.children)}
            </motion.ul>
          )}
        </motion.li>
      );
    });
  };

  return (
    <>
      <motion.nav
        className="sidebar d-block d-lg-none"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        style={{
          background: applicationColor.cardItem,
          color: applicationColor.readColor1,
          // boxShadow:`0 0 0.3px 0.3px rgba(255, 255, 255, 0.315)`
        }}
      >
        <section className="logo">
          <h2 className="logo-name">codegene</h2>
          {orgLogo ? (
            <img src={orgLogo} alt="company logo" onClick={toggleSidebar} />
          ) : (
            <h2>No - logo</h2>
          )}
        </section>
        <div className="closing">
          <span onClick={() => setIsOpen(!isOpen)}>
            {" "}
            <FaArrowAltCircleLeft />
          </span>

          <hr
            style={{ borderTop: `1px solid ${applicationColor.readColor2} ` }}
          />
        </div>
        <ul className="menu-list">{renderingMenuItems(menu)}</ul>

        <section className="adding">
          {/* <section
            className="user-details"
            style={{
              background: applicationColor.inputBg,
            }}
          >
            <div className="user-image">
              <img src={dummyUser} alt="user-image" />
            </div>
            <div className="details">
              <span className="email">{employeeDetails?.
               || ""}</span>
              <span className="id">{employeeDetails?.employeeId || ""}</span>
            </div>
          </section> */}
        </section>
      </motion.nav>
    </>
  );
};

export default Sidebar;
