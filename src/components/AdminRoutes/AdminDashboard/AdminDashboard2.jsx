import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsPerson } from "react-icons/bs";

const AdminDashboard2 = () => {
  return (
    <section
      className="admin-dashboard-wrapper"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="row">
        <div className="col-lg-7">
          <div className="dashboard-leftside-wrapper">
            <div className="leftSide-content-child1">
              <div className="interview-info-wrapper">
                <div className="interview-info">
                  <p>Interview</p>
                  <p>256</p>
                </div>
                <div className="interview-icon">
                  <HiOutlineUserGroup />
                </div>
              </div>
              <div className="shortlisted-info-wrapper">
                <div className="shortlisted-info">
                  <p>Shortlisted</p>
                  <p>20</p>
                </div>
                <div className="interview-icon">
                  <BsPerson />
                </div>
              </div>
              <div className="hired-info-wrapper">
                <div className="hired-info">
                  <p>Hired</p>
                  <p>06</p>
                </div>
                <div className="interview-icon">
                  <BsPerson />
                </div>
              </div>
            </div>
            <div className="leftSide-content-child2"></div>
            <div className="leftSide-content-child3"></div>
          </div>
        </div>
        <div className="col-lg-4">
          <div
            className="dashboard-rightside-wrapper"
            style={{ backgroundColor: "gray" }}
          >
            rightside content here...
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard2;
