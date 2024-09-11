import React, { useEffect, useState } from "react";
import "./FilterModal.scss";
import { useThemeContext } from "../../../Contexts/ThemesContext";
import { useStateContext } from "../../../Contexts/StateContext";
import { motion, AnimatePresence } from "framer-motion";
import { IoSettingsSharp } from "react-icons/io5";
import { SiPinetwork } from "react-icons/si";
import { MdWork } from "react-icons/md";
import { FaChevronDown, FaChevronUp, FaBusinessTime } from "react-icons/fa";
import { PiNetworkFill } from "react-icons/pi";
import { makeNetworkCall } from "../../../../HttpServices/HttpService";
import { toastOptions } from "../../../../Utils/FakeRoutes";
import Loader from "../../../Loader/Loader";

const FiltersModal = ({ handleFilterModal, setEmployeesList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(null);

  const {
    employeeDetails,
    // orgData2,
    designations,
    departments,
    roles,
    shifts,
    setLoadingTerm,
    setLoading,
    loadingTerm,
    loading,
  } = useStateContext();
  const { applicationColor } = useThemeContext();

  const [filterModalOptions, setFilterModalOptions] = useState([
    {
      id: "designations",
      icon: <MdWork />,
      label: "Designations",
      options: [],
    },
    {
      id: "departments",
      icon: <PiNetworkFill />,
      label: "Departments",
      options: [],
    },
    {
      id: "roles",
      icon: <SiPinetwork />,
      label: "Roles",
      options: [],
    },
    {
      id: "shifts",
      icon: <FaBusinessTime />,
      label: "Shifts",
      options: [],
    },
  ]);

  // useEffect(() => {
  //   if (
  //     Object.keys(orgData2).length > 0 &&
  //     employeeDetails.employeeId &&
  //     employeeDetails.adminType === "1"
  //   ) {
  //     const newDesignations = designations?.map((item) => item.designationName);
  //     const newDepartments = departments?.map((item) => item.departmentName);
  //     const newRoles = roles?.map((item) => item.roleName);
  //     const newShifts = shifts.map((item) => item.shiftName);

  //     setFilterModalOptions([
  //       {
  //         id: "designations",
  //         icon: <MdWork />,
  //         label: "Designations",
  //         options: newDesignations,
  //       },
  //       {
  //         id: "departments",
  //         icon: <PiNetworkFill />,
  //         label: "Departments",
  //         options: newDepartments,
  //       },
  //       {
  //         id: "roles",
  //         icon: <SiPinetwork />,
  //         label: "Roles",
  //         options: newRoles,
  //       },
  //       {
  //         id: "shifts",
  //         icon: <FaBusinessTime />,
  //         label: "Shifts",
  //         options: newShifts,
  //       },
  //     ]);
  //   }
  // }, [employeeDetails, orgData2]);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleOptionSelect = (option) => {
    setSearchTerm(option);
  };

  //This function will execute when user clicked on the return or enter key button and handle the search filtering
  const handleSearchByKeyUp = async (e) => {
    try {
      if (searchTerm.length > 3 && e.key === "Enter") {
        setLoading(true);
        setLoadingTerm("query_employees");
        const { detail } = await makeNetworkCall(
          { employeesSearch: searchTerm },
          "getOrgData2",
          "headers"
        );

        setEmployeesList(detail?.employees);
        setLoading(false);
        // setSearchTerm("");
        setLoadingTerm("");
        handleFilterModal();
      }
    } catch (error) {
      setLoadingTerm("");
      setLoading(false);
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  return (
    <section className="filters-modal" onKeyUpCapture={handleSearchByKeyUp}>
      <div className="filter-section">
        <div className="input-search-section">
          <div className="input-section">
            <input
              className="employee-search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              name={"searchTerm"}
              id="employee-search"
              style={{
                color: applicationColor.readColor1,
                // background: applicationColor.cardBg2,
              }}
              maxLength={30}
            />
          </div>

          <div>
            {loading && loadingTerm === "query_employees" ? <Loader /> : ""}
          </div>
        </div>

        {filterModalOptions?.map((filter) => (
          <div key={filter.id} className="filter-item">
            <div
              onClick={() => toggleExpand(filter.id)}
              className="filter-header"
            >
              {filter.icon}
              <span>{filter.label}</span>
              {expanded === filter.id ? (
                <FaChevronUp className="chevron-icon" />
              ) : (
                <FaChevronDown className="chevron-icon" />
              )}
            </div>
            <AnimatePresence>
              {expanded === filter.id && (
                <motion.div
                  className="filter-options"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                >
                  {filter?.options?.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className="filter-option"
                    >
                      {option}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="non-filter-section" onClick={handleFilterModal}></div>
    </section>
  );
};

export default FiltersModal;
