
import React, { useCallback, useEffect, useRef, useState } from "react";
import TableHead from "../../Table/TableHead";
import _ from "lodash";
import { useStateContext } from "../../Contexts/StateContext";
import { useNavigate } from "react-router";
import { toastOptions } from "../../../Utils/FakeRoutes";
import Loader from "../../Loader/Loader";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { AiOutlineEdit } from "react-icons/ai";
import {
  backEndCallNoEnc,
  backEndCallObjNothing,
} from "../../../services/mainService";
import { debounce } from "lodash";

const EmployeeList = () => {
  const {
    loading,
    setLoading,
    setLoadingTerm,
    loadingTerm,
    limit,
    setImageModal,
    setImageData,
    employeesList, 
    setEmployeesList
  } = useStateContext();
  const { applicationColor } = useThemeContext();
  // const [employeesList, setEmployeesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [skip, setSkip] = useState(0);
  const observer = useRef();
  const [dataExist, setDataExist] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [resetButton, setResetButton] = useState(false);

  let tableHeadProperties = [
    {
      name: "Employee ID",
      property: "employee_id",
      type: "string",
      onClick: (item) => {
        navigate(`/admin/employee/${item?.employee_id}`);
      },
      style: {
        color: "#6c63fc",
        cursor: "pointer",
        textTransform: "uppercase",
        fontWeight: "bold",
      },
    },
    { name: "First Name", property: "basic_info.first_name" },
    { name: "Last Name", property: "basic_info.last_name" },
    { name: "Department", property: "work_info.department_name" },
    { name: "Designation", property: "work_info.designation_name" },
    // { name: "Location", property: "work_info.location_name" },
    // { name: "Shift", property: "work_info.shift_name" },
    { name: "Date of Join", property: "work_info.date_of_join" },
    { name: "Action", property: "", type: "string" },
  ];

  const fetchingData = async () => {
    try {
      setLoading(true);
      let employees = await backEndCallObjNothing(
        "/admin_get/get_employee_list",
        { skip: 0 }
      );
      setEmployeesList(employees.employees);
      setFilteredEmployees(employees.employees);
    } catch (error) {
      toastOptions.error(error?.response?.data || "something went wrong");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {

  
  console.log(employeesList,'employeesList in employeesList compo')

  console.log((employeesList.length >= 0),'employeesList.length >= ')

  // debugger
   if( !employeesList.length >= 0 ) { 
    console.log('hittt')
     fetchingData();
   } 


  }, []);

  // useEffect(() => {
  //   if (employeesList.length <= 0) {
  //     setShowButton(true);
  //   } else {
  //     setShowButton(false);
  //   }
  // }, [employeesList.length]);

  const makingNetworkCallWithQuery = async () => {
    try {
      setLoading(true);
      setLoadingTerm("query");
      // Perform the search query network call here

      setLoading(false);
      setLoadingTerm("");
      setSkip(0);
      setResetButton(true);
    } catch (error) {
      setLoading(false);
      setLoadingTerm("");
      setSkip(0);
      setResetButton(true);
      toastOptions.error("Error occurred");
    } finally {
      setLoading(false);
      setLoadingTerm("");
      setSkip(0);
    }
  };

  const resettingEmployees = async () => {
    try {
      setLoading(true);
      setLoadingTerm("reset");
      // Perform the reset network call here

      setSearchTerm("");
      setLoading(false);
      setLoadingTerm("");
      setSkip(0);
      setResetButton(false);
    } catch (error) {
      setLoading(false);
      toastOptions.error("Error occurred");
      setLoadingTerm("");
      setSkip(0);
    } finally {
      setLoadingTerm("");
      setLoading(false);
      setSkip(0);
    }
  };

  // const fetchingMoreData = async () => {
  //   try {
  //     setLoading(true);
  //     setLoadingTerm("getExtraEmployees");

  //     setLoading(false);
  //     setLoadingTerm("");
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("error while fetching more data", error);
  //     setLoadingTerm("");
  //   } finally {
  //     setLoading(false);
  //     setLoadingTerm("");
  //   }
  // };

  // const gettingMoreDataRef = useCallback(
  //   (node) => {
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver(async (entries) => {
  //       if (entries[0].isIntersecting && employeesList.length >= limit) {
  //         setSkip((prevSkip) => prevSkip + 1); // Update skip directly without await
  //         if (skip) {
  //           fetchingMoreData();
  //         }
  //       }
  //     });

  //     if (node) observer.current.observe(node);
  //   },
  //   [loading, employeesList, limit, skip]
  // );

  // Debounced search handler
  const debouncedSearchHandler = useCallback(
    debounce((term) => {
      if (term.length > 0) {
        const lowerCaseSearchTerm = term.toLowerCase();
        const filteredItems = filteredEmployees.filter((item) => {
          const {
            employee_id,
            basic_info: { first_name, last_name, email },
            work_info: {
              department_name,
              designation_name,
              location_name,
              date_of_join,
              shift_name,
            },
            contact_details: { seating_location },
          } = item;

          return (
            employee_id.toLowerCase().includes(lowerCaseSearchTerm) ||
            first_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            last_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            email?.toLowerCase().includes(lowerCaseSearchTerm) ||
            department_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            designation_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            seating_location?.toLowerCase().includes(lowerCaseSearchTerm) ||
            date_of_join?.toLowerCase().includes(lowerCaseSearchTerm) ||
            shift_name?.toLowerCase().includes(lowerCaseSearchTerm)
          );
        });

        setEmployeesList(filteredItems);
      } else {
        setEmployeesList(filteredEmployees);
      }
    }, 300),
    [filteredEmployees]
  );

  useEffect(() => {
    debouncedSearchHandler(searchTerm);
    return debouncedSearchHandler.cancel;
  }, [searchTerm, debouncedSearchHandler]);

  return (
    <section className="table-query new-query">
      <div
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
        className="table-wrapper py-2 px-3"
      >
        <div className="search-bar sticky-top mb-2">
          <div
            className="searchbar-loading"
            style={{
              color: applicationColor.readColor1,
              background: applicationColor.cardBg2,
            }}
          >
            <input
              className="employee-search"
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              name={"searchTerm"}
              id="employee-search"
              style={{
                color: applicationColor.readColor1,
              }}
            />
            <div className="query-button">
              {showButton && (
                <button
                  style={{ background: applicationColor.buttonColor }}
                  className="btn-custom btn-custom-reset"
                  disabled={loadingTerm === "query"}
                  onClick={makingNetworkCallWithQuery}
                >
                  {loading && loadingTerm === "query" ? <Loader /> : "Submit"}
                </button>
              )}
            </div>
          </div>

          <div>
            {resetButton && (
              <button
                className="btn-custom btn-custom-reset"
                disabled={loadingTerm === "reset"}
                onClick={resettingEmployees}
              >
                {loading && loadingTerm === "reset" ? <Loader /> : " Reset"}{" "}
              </button>
            )}
          </div>
        </div>
        <div className="tables">
          <table className="main-table table-bordered table-responsive rounded-1">
            <TableHead
              tableHeadProperties={tableHeadProperties}
              data={employeesList}
              component="UpdateEmployeeAction"
              // loadMoreRef={gettingMoreDataRef}
              getExtraDataType="getExtraEmployees"
              dataExist={dataExist}
            />
          </table>
          {loading ? (
            <div className="spinner">
              <Loader />
            </div>
          ) : (
            employeesList.length === 0 && "there is no data found"
          )}
        </div>
      </div>
    </section>
  );
};

export default EmployeeList;
// This Below functions are respobseilble to update the employee details and  naviagate the admin to /admin/update_employee page to edit the psecific employee details
export const UpdateEmployeeAction = ({ id }) => {
  const navigate = useNavigate();
  const { applicationColor } = useThemeContext();
  return (
    <section
      className="actions"
      style={{
        color: applicationColor.readColor1,
      }}
    >
      <button
        className="edit btn btn-sm btn-success-light"
        onClick={() => navigate(`/admin/update_employee/${id}`)}
      >
        <AiOutlineEdit />
      </button>

      {/* <button className="delete btn btn-sm">
        <MdDeleteOutline />
      </button> */}
    </section>
  );
};
