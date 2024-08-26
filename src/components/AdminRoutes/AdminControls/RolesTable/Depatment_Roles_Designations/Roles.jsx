import React from "react";
import { useThemeContext } from "../../../../Contexts/ThemesContext";
import RoleasAdd from "./RoleasAdd";
import Departments from "./Departments";
import Designations from "./Designations";
import LeavesSettings from "./LeavesSettings";

const Roles = () => {
  const { applicationColor } = useThemeContext();

  return (
    <section className="roles-department">
      <ul
        className="nav nav-pills d-inline-flex px-3 flex-nowrap categorys rounded-3 py-2 default-shadow"
        id="pills-tab"
        role="tablist"
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
      >
        <li className="nav-item">
          <a
            className="nav-link active"
            id="admin-roles-tab"
            data-bs-toggle="pill"
            role="tab"
            href="#admin-roles"
            aria-controls="admin-roles"
            aria-selected="true"
          >
            Roles
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="departments-tab"
            data-bs-toggle="pill"
            role="tab"
            href="#departments"
            aria-controls="departments"
            aria-selected="false"
          >
            Departments
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="designations-tab"
            data-bs-toggle="pill"
            role="tab"
            href="#designations"
            aria-controls="designations"
            aria-selected="false"
          >
            Designations
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="leaves-tab"
            data-bs-toggle="pill"
            role="tab"
            href="#leaves"
            aria-controls="leaves"
            aria-selected="false"
          >
            Leaves
          </a>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="admin-roles"
          role="tabpanel"
          aria-labelledby="admin-roles-tab"
        >
          <RoleasAdd />
        </div>
        <div
          className="tab-pane fade"
          id="departments"
          role="tabpanel"
          aria-labelledby="departments-tab"
        >
          <Departments />
        </div>
        <div
          className="tab-pane fade"
          id="designations"
          role="tabpanel"
          aria-labelledby="designations-tab"
        >
          <Designations />
        </div>
        <div
          className="tab-pane fade"
          id="leaves"
          role="tabpanel"
          aria-labelledby="leaves-tab"
        >
          <LeavesSettings />
        </div>
      </div>
    </section>
  );
};

export default Roles;
