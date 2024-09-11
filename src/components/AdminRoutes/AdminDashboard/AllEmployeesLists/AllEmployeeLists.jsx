import React, {
  useCallback,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useStateContext } from "../../../Contexts/StateContext";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import "./AllEmployeesLists.scss";
import { useThemeContext } from "../../../Contexts/ThemesContext";
import { LuFilter } from "react-icons/lu";
import { IoAddOutline } from "react-icons/io5";
import FiltersModal from "../FIltersModal/FiltersModal";
import { GrPowerReset } from "react-icons/gr";
import { makeNetworkCall } from "../../../../HttpServices/HttpService";
import Loader from "../../../Loader/Loader";
import { toastOptions } from "../../../../Utils/FakeRoutes";
import randomPic from "../../../../assets/Dashboard/cg-1 (1).png";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const AllEmployeeLists = () => {
  const [adminDashboardEmployeelist, setAdminDashboardEmployeeList] = useState(
    []
  );
  const navigate = useNavigate();
  const adminDashboardRef = useRef();
  const [adminEmployeelistExist, setEmployeelistExist] = useState(false);
  const [openFilerModal, setOpenFilterModal] = useState(false);
  const [adminEmployeeSkip, setAdminEmployeeSkip] = useState(0);

  const handleFilterModal = () => {
    return setOpenFilterModal(!openFilerModal);
  };

  const { applicationColor } = useThemeContext();
  const {
    orgData2,
    employeeDetails,
    limit,
    setLoading,
    setLoadingTerm,
    loading,
    loadingTerm,
  } = useStateContext(); // getting the necessary states to implement the logic and updating the necessary states here

  // This use effect will responsieble to update the setAdminDashboardEmployeelist when the orgdata changes

  useEffect(() => {
    if (employeeDetails.adminType === "1") {
      setAdminDashboardEmployeeList([]);
    }
  }, [employeeDetails]);

  const resetEmployees = async () => {
    try {
      setLoading(true);
      setLoadingTerm("reset_employees");
      const { detail } = await makeNetworkCall(
        {
          employeesSearch: "",
          employeesFilters: { skip: 0, limit: limit },
        },
        "getOrgData2",
        "headers"
      );
      setAdminDashboardEmployeeList(detail?.employees);
      setLoading(false);
      setLoadingTerm("");
    } catch (error) {
      console.log(error, "error while making network call");
      toastOptions.error("no emloyee with the search term");
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  // This function will trigger the network call when the last item came in to the view
  const fetchingMoreData = async () => {
    try {
      setLoading(true);
      setLoadingTerm("getAdminEmployeesList");

      const response = await makeNetworkCall(
        {
          employeesSearch: "",
          employeesFilters: { skip: adminEmployeeSkip * limit, limit: limit },
        },
        "getOrgData2",
        "headers"
      );

      if (response.detail.employees.length > 0) {
        setAdminDashboardEmployeeList((prevList) => {
          return [...prevList, ...response.detail.employees];
        });
      } else {
        setEmployeelistExist(true);
      }

      setLoading(false);
      setLoadingTerm("");
    } catch (error) {
      setLoading(false);
      console.log("error while fetching more data", error);
      setLoadingTerm("");
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  const gettingMoreEmployeeList = useCallback(
    (node) => {
      if (loading) return;
      if (adminDashboardRef.current) adminDashboardRef.current.disconnect();
      adminDashboardRef.current = new IntersectionObserver(async (entries) => {
        if (
          entries[0].isIntersecting &&
          !adminEmployeelistExist &&
          adminDashboardEmployeelist.length >= limit
        ) {
          setAdminEmployeeSkip((adminSkip) => adminSkip + 1); // Update skip directly without await

          if (adminEmployeeSkip) {
            await fetchingMoreData(); // Await fetchingMoreData if necessary
          }
        }
      });

      if (node) adminDashboardRef.current.observe(node);
    },
    [
      loading,
      adminDashboardEmployeelist,
      setAdminDashboardEmployeeList,
      adminEmployeelistExist,
      adminEmployeeSkip,
      setAdminEmployeeSkip,
    ]
  );

  return (
    <section className="employees-list" id="employee_list">
      <div className="filters-heading">
        <h5
          className="heading-1"
          style={{ color: applicationColor.readColor1 }}
        >
          <span style={{ color: applicationColor.tabColor }}>All</span> Employee
        </h5>
        <div className="filter-button-add-employee">
          <button
            className="filter"
            onClick={handleFilterModal}
            style={{
              background: applicationColor.cardBg1,
              color: applicationColor.readColor2,
            }}
          >
            <span style={{ color: applicationColor.readColor1 }}>
              <LuFilter />
            </span>
            Filter
          </button>
          <button
            className="add-employee"
            style={{
              background: applicationColor.cardBg1,
              color: applicationColor.readColor2,
            }}
            onClick={() => navigate("/admin/add_employee")}
          >
            <span style={{ color: applicationColor.readColor1 }}>
              <IoAddOutline />
            </span>
            Add Employee
          </button>

          {adminDashboardEmployeelist.length < limit && (
            <button
              className="add-employee"
              disabled={loading && loadingTerm === "reset_employees"}
              onClick={resetEmployees}
            >
              {" "}
              {loading && loadingTerm === "reset_employees" ? (
                <Loader />
              ) : (
                <>
                  <span>
                    <GrPowerReset />{" "}
                  </span>{" "}
                  Reset
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <section className="admin_all_employees">
        {adminDashboardEmployeelist?.map((employee, index) => {
          if (adminDashboardEmployeelist.length === index + 1) {
            return (
              <ReUsableEmployeeCard
                employee={employee}
                ref={gettingMoreEmployeeList}
                key={employee.employeeId}
              />
            );
          } else {
            return (
              <ReUsableEmployeeCard
                employee={employee}
                key={employee.employeeId}
              />
            );
          }
        })}
      </section>

      {openFilerModal && (
        <FiltersModal
          handleFilterModal={handleFilterModal}
          setAdminDashboardEmployeeList={setAdminDashboardEmployeeList}
        />
      )}

      {loading && loadingTerm === "getAdminEmployeesList" && <Loader />}
    </section>
  );
};

export default AllEmployeeLists;

export const ReUsableEmployeeCard = forwardRef(({ employee }, ref) => {
  const { applicationColor } = useThemeContext();

  const navigate = useNavigate();

  return (
    <section
      className="employee-card"
      style={{
        background: applicationColor.cardBg1,
        color: applicationColor.readColor1,
      }}
      ref={ref}
    >
      <div className="img-details">
        <div className="img-options">
          <img
            src="https://img.freepik.com/premium-photo/interior-designer-digital-avatar-generative-ai_934475-9141.jpg"
            alt="Employee"
          />

          <div className="dropdown">
            <a
              className="dots"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              href="#"
            >
              ...
            </a>

            <ul
              className="dropdown-menu"
              style={{
                background: applicationColor.cardItem,
                color: applicationColor.readColor1,
              }}
            >
              {["Profile"].map((item) => {
                return (
                  <li
                    key={item}
                    onClick={() =>
                      navigate(`/admin/employee/${employee.employeeId}`)
                    }
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <span className="name">
          {employee.firstName || employee.employeeName}
        </span>
        <span className="status">{employee.status || ""}</span>
        <span className="designtion">
          {employee?.workInfo?.designation?.designationName}
        </span>
      </div>

      {/* {(employee?.contactDetails?.phoneNumber_work &&  employee.email) && */}
      <div
        className="email-phone-number"
        style={{
          background: applicationColor.cardBg2,
          color: applicationColor.readColor2,
        }}
      >
        <h2 className="email" style={{ textTransform: "none" }}>
          <span>
            <MdOutlineMailOutline />
          </span>
          {employee.email}
        </h2>
        <h2>
          <span>
            <MdOutlinePhone />
          </span>
          {employee?.contactDetails?.phoneNumber_work || "97644647778"}
        </h2>
      </div>

      {/* } */}
    </section>
  );
});
