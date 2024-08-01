import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./components/common/Sidebar/Sidebar";
import Headers from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import LaptopSidebar from "./components/common/LaptopSidebar/LaptopSidebar";
import { useThemeContext } from "./components/Contexts/ThemesContext";
import { useStateContext } from "./components/Contexts/StateContext";
import Modal from "./components/Modals/Modal";
import AdminAttendanceModal from "./components/AdminRoutes/AdminFetchingSingleEmployeeData/AdminAttendanceModal/AdminAttendanceModal";
import MapComponent from "./components/common/MapComponent/MapComponent";
import CheckInCheckOutModal from "./components/EmployeeRoutes/CheckInCheckOutModal/CheckInCheckOutModal";
import ImageModal from "./components/EmployeeRoutes/ImageModal/ImageModal";
import FilesModal from "./components/Folders/FilesModal/FilesModal";

const AppLayout = () => {
  const { baseColor, gradient, applicationColor } = useThemeContext();

  const {
    showModal,
    attendanceModal,
    location,
    checkInModal,
    imageModal,
    fileModal,
  } = useStateContext();
  const { setIsOpen } = useStateContext();

  useEffect(() => {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll(
      '[data-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  return (
    <>
      <Sidebar />

      <main
        className="hr_portal_layout"
        style={{
          background: applicationColor.mainBg,
        }}
      >
        <LaptopSidebar />
        <main className="content-pages">
          <Headers />
          <section className="main-content" onClick={() => setIsOpen(false)}>
            <Outlet />
          </section>
        </main>
      </main>

      {/* Conditionally render the map */}
      {location?.lat && location?.lng && (
        <div className="map-component">
          {/* <MapComponent lat={location.lat} lng={location.lng} /> */}
        </div>
      )}

      {showModal && <Modal />}
      {attendanceModal && <AdminAttendanceModal />}

      {checkInModal && <CheckInCheckOutModal />}
      {imageModal && <ImageModal />}

      {fileModal && <FilesModal />}
    </>
  );
};

export default AppLayout;
