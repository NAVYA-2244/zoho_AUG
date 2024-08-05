import React from "react";
import { UpdateEmployeeAction } from "../AdminRoutes/EmployeeList/EmployeeList";
import { CiLocationOn } from "react-icons/ci";
// import { UpdateEmployeeLeaveStatus } from "../AdminRoutes/EmployeeLeaveApplications/AdminAcceptedEmployeeLeavesApplications";
import { useThemeContext } from "../Contexts/ThemesContext";

import Loader from "../Loader/Loader";
import { color } from "framer-motion";
import { useStateContext } from "../Contexts/StateContext";
import { UpdateAttendance } from "../AdminRoutes/AdminFetchingSingleEmployeeData/SingleEmployeeAttendanceCalendar";
import { UpdateTodayAttendance } from "../AdminRoutes/TodaysEmployeesAttendance/TodaysEmployeesAttendance";
import { useFunctionContext } from "../Contexts/FunctionContext";
import dummyUser from "../../assets/Header/dummy-user.jpg";
import { format, parseISO } from "date-fns";
import { UpdateFileStatus } from "../Folders/FilesByFolderId/FilesByFolderId";
import { AiOutlineFilePdf } from "react-icons/ai";
import "./MainTable.scss";
import { toastOptions } from "../../Utils/FakeRoutes";
// import { UpdateEmployeeLeaveStatus } from "../AdminRoutes/EmployeeLeaveApplications/AdminAcceptedEmployeeLeavesApplications";

const TableBody = ({
  tableHeadProperties,
  sortedData,
  component,
  loadMoreRef,
  getExtraDataType,
}) => {
  const { applicationColor } = useThemeContext();
  const { loading, loadingTerm, setEditingFile, orgLogo, setOrgLogo } =
    useStateContext();
  const { handleShowLocation } = useFunctionContext();

  const parsingDate = (date) => {
    const dateObj = parseISO(date);
    const formattedDate = format(dateObj, "dd-MM-yyyy");
    return formattedDate;
  };

  const renderContent = (property, value, item) => {
    if (
      property.name === "Check In Location" ||
      property.name === "Check Out Location"
    ) {
      return (
        <span>
          <button onClick={() => handleShowLocation(item, property?.name)}>
            <CiLocationOn />
          </button>
        </span>
      );
    } else if (property.name === "Employee Name") {
      return <span className="fw-semibold">{value}</span>;
    } else if (property.name === "Profile") {
      return (
        <div className="profile-wrapr">
          <div>
            <img
              src={value || dummyUser}
              alt="profile"
              className="profile-img"
              onClick={() =>
                property.onClick ? property.onClick(value || dummyUser) : null
              }
            />
          </div>
          <div className="profile-info">
            <p className="fw-semibold">
              {item.firstName.length > 10
                ? item.firstName.substring(0, 10) + "..."
                : item.firstName}
            </p>
            <p className="profile-email">{item.email}</p>
          </div>
        </div>
      );
    } else if (["", "0"].includes(value)) {
      return <span>--</span>;
    } else if (property.name === "Date") {
      return parsingDate(value);
    } else if (value?.length > 20) {
      return <span>{value.substring(0, 20) + "..."}</span>;
    } else if (property.name === "Leave Status") {
      if (value === "Pending") {
        return <span className="badge pending-badge">{value}</span>;
      } else if (value === "Rejected") {
        return <span className="badge resigned-badge">{value}</span>;
      } else {
        return <span className="badge active-badge">{value}</span>;
      }
    } else if (property.name === "Status") {
      if (value === "checkin") {
        return <span className="badge pending-badge">{value}</span>;
      } else if (value === "Absent") {
        return <span className="badge resigned-badge">{value}</span>;
      } else if (value === "Present") {
        return <span className="badge active-badge">{value}</span>;
      } else if (value === "pending") {
        return <span className="badge pending-badge">{value}</span>;
      } else if (value === "active") {
        return <span className="badge active-badge">{value}</span>;
      } else if (value === "resigned") {
        return <span className="badge resigned-badge">{value}</span>;
      } else if (value === "terminated") {
        return <span className="badge terminated-badge">{value}</span>;
      }
    } else if (property.name === "File") {
      return (
        <span>
          <AiOutlineFilePdf
            style={{
              color: "red",
              fontSize: "1.5rem",
              transform: "translate(-4px, -1px)",
            }}
          />{" "}
          {value}
        </span>
      );
    } else {
      return (
        <span
          onClick={() => (property.onClick ? property.onClick(item) : null)}
          style={property.style ? property?.style : null}
        >
          {value}
        </span>
      );
    }
  };

  const renderComponent = (componentName, item) => {
    if (componentName === "UpdateEmployeeAction") {
      return <UpdateEmployeeAction id={item?.employee_id} />;
    }
    //  else if (componentName === "UpdateEmployeeLeaveStatus") {
    // return  <UpdateEmployeeLeaveStatus id={item?.leave_type_id}
    // leave_application_id={item?.leave_type_id}
    // leave_status={item.leave_status}
    // />

    // }
    else if (componentName === "UpdateAttendance") {
      return <UpdateAttendance attendanceItem={item} />;
    } else if (componentName === "UpdateTodayAttendance") {
      return <UpdateTodayAttendance attendanceItem={item} />;
    } else if (componentName === "UpdateFileStatus") {
      return (
        <tr
          style={{ background: "red" }}
          onClick={() => {
            setEditingFile(item);
          }}
        >
          {" "}
          <UpdateFileStatus editingFile={item} />
        </tr>
      );
    } else return null;
  };

  return (
    <>
      {sortedData?.length > 0 ? (
        sortedData?.map((item, index) => (
          <tbody key={index}>
            {sortedData.length === index + 1 ? (
              <tr key={item._id} ref={loadMoreRef}>
                {tableHeadProperties.map((property, index) => {
                  const { property: propName } = property;
                  const keys = propName.split(".");
                  let value = item;
                  for (const key of keys) {
                    value = value[key];
                  }
                  return (
                    <td
                      // style={{
                      //   // border: `1px solid ${applicationColor.readColor2}`,

                      //   background: applicationColor.cardBg1,
                      //   color: applicationColor.readColor1,
                      // }}
                      key={propName}
                      style={{
                        background: applicationColor.cardBg1,
                        color: applicationColor.readColor1,
                        // marginRight: "10px",
                        // fontWeight: "400",
                        // color: applicationColor.readColor1,
                        textTransform: `${
                          propName === "email" ? "none" : "capitalize"
                        } `,
                      }}
                    >
                      {propName === ""
                        ? renderComponent(component, item)
                        : renderContent(property, value, item)}
                    </td>
                  );
                })}
              </tr>
            ) : (
              <tr
                key={item._id}
                // style={{
                //   borderBottom: `0.01px solid ${applicationColor.readColor2}`,
                // }}
              >
                {tableHeadProperties.map((property, index) => {
                  const { property: propName } = property;
                  const keys = propName.split(".");
                  let value = item;
                  for (const key of keys) {
                    value = value[key];
                  }
                  return (
                    <td
                      key={propName}
                      style={{
                        background: applicationColor.cardBg1,
                        color: applicationColor.readColor1,
                        textTransform: `${
                          propName === "email" ? "none" : "capitalize"
                        } `,
                      }}
                    >
                      {propName === ""
                        ? renderComponent(component, item)
                        : renderContent(property, value, item)}
                    </td>
                  );
                })}
              </tr>
            )}
          </tbody>
        ))
      ) : (
        <tbody>
          {/* <tr className="no-data">
            {orgLogo?.logo ? (
              <td
                className="text-center"
                colSpan="10"
                style={{
                  background: applicationColor.cardBg1,
                  color: applicationColor.readColor1,
                }}
              >
                No Data
              </td>
            ) : (
              <Loader />
            )}
          </tr> */}
        </tbody>
      )}

      <tbody>
        <tr>
          {loading && loadingTerm === getExtraDataType && (
            <td className="text-center" colspan="10">
              {" "}
              <Loader />{" "}
            </td>
          )}
        </tr>
      </tbody>
    </>
  );
};

export default TableBody;
