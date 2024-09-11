import React, { useCallback, useEffect, useState } from "react";
import { color, motion } from "framer-motion";
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
import { useThemeContext } from "../../Contexts/ThemesContext";
import dummyUser from "../../../assets/Header/dummy-user.jpg";
import Loader from "../../Loader/Loader";
// import logo from '../../../assets/Dashboard/cg-1 (1).png'

const LaptopSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    employeeDetails,
    setErrors,
    openSubmenu,
    setOpenSubmenu,
    setCurrentPageName,
    orgDetails,
    orgLogo,
    setOrgLogo,
  } = useStateContext();

  const { applicationColor } = useThemeContext();
  const [isOpen, setIsOpen] = useState(true);

  const settingsiderbar = () => {
    if (employeeDetails.admin_type === "1") {
      return superAdminSidebar;
    } else if (employeeDetails?.admin_type === "2") {
      return mangerSidebar;
    } else if (employeeDetails?.admin_type === "3") {
      return teamLeadSidebar;
    } else {
      return employeeSidebar; // Default to employeeSidebar if no match
    }
  };

  const [menu, setMenu] = useState(settingsiderbar);

  useEffect(() => {
    setMenu(settingsiderbar());
  }, [employeeDetails]);

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
    navigate("/login");
    window.location.reload("/login");
    setErrors({});
  };

  const navigating = (path, label) => {
    navigate(path);
    setCurrentPageName(label);
    setErrors({});

    // setIsOpen(false);
  };

  const handleClick = (path, label) => {
    typeof path === "string" ? navigating(path, label) : logout(path);
  };

  const renderingMenuItems = (items) => {
    return items.map((item) => {
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
              className="submenu sidebar-right"
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
      <nav
        className="laptop_sidebar d-none d-lg-block"
        animate={isOpen ? "open" : "closed"}
        style={{
          background: applicationColor.cardItem,
          color: applicationColor.readColor1,
        }}
        variants={sidebarVariants}
      >
        <section className="logo">
          <h2 className="logo-name">codegene</h2>

          {orgLogo ? (
            <img src={orgLogo} alt="company logo" />
          ) : (
            <h2>No - Logo</h2>
          )}
        </section>
        <span className="fs-20 org-name">{orgDetails.organisation_name}</span>
        <hr
          style={{
            borderTop: `1px solid ${applicationColor.readColor2} `,
            marginTop: "3px",
          }}
        />
        <ul className="menu-list ">{renderingMenuItems(menu)}</ul>
      </nav>
    </>
  );
};

export default LaptopSidebar;
