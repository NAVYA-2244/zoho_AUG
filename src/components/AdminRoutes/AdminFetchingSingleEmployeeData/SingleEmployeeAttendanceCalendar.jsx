import React, { useEffect, useState } from "react";
import TableHead from "../../Table/TableHead";
import Calandar from "../../common/Calender/Calender";
import { FaUserEdit } from "react-icons/fa";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useStateContext } from "../../Contexts/StateContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { makeNetworkCall } from "../../../HttpServices/HttpService";

const SingleEmployeeAttendanceCalendar = ({
  employeeAttendanceData,
  singleEmployeeEvents,
}) => {
  const { attendanceModal, setAttendanceModal } = useStateContext();
  let employeeeAttedanceTableProperties = [
    { name: "Employee Id", property: "employeeId", type: "string" },
    // { name: "Name", property: "employeeName", type: "string" },
    { name: "Status", property: "status", type: "string" },
    { name: "Date", property: "dateTime", type: "string" },
    { name: "checkIn", property: "checkIn.time", type: "string" },
    {
      name: "Check In Location",
      property: "checkIn.latitude",

      type: "string",
    },
    { name: "checkOut", property: "checkOut.time", type: "string" },

    {
      name: "Check Out Location",
      property: "checkOut.latitude",
      type: "string",
    },
    { name: "Actions", property: "", type: "string" },
  ];

  console.log({ employeeAttendanceData });
  const { applicationColor } = useThemeContext();

  return (
    <div className="attendance-wrapper">
      <section className="attednce-table-calender">
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="table-tab"
              data-bs-toggle="tab"
              data-bs-target="#table-tab-pane"
              type="button"
              role="tab"
              aria-controls="table-tab-pane"
              aria-selected="true"
              style={{
                background: applicationColor.cardBg1,
                color: applicationColor.readColor1,
              }}
            >
              Table view
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="calender-tab"
              data-bs-toggle="tab"
              data-bs-target="#calender-tab-pane"
              type="button"
              role="tab"
              aria-controls="calender-tab-pane"
              aria-selected="true"
              style={{
                background: applicationColor.cardBg1,
                color: applicationColor.readColor1,
              }}
            >
              Calender view
            </button>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="table-tab-pane"
            role="tabpanel"
            aria-labelledby="table-tab"
            tabIndex="0"
          >
            <section
              className="tables table-wrapper py-2 px-3"
              style={{
                background: applicationColor.cardBg1,
                color: applicationColor.readColor1,
              }}
            >
              <table className="main-table table-bordered table-responsive">
                <TableHead
                  tableHeadProperties={employeeeAttedanceTableProperties}
                  data={employeeAttendanceData || []}
                  component="UpdateAttendance"
                />
              </table>
            </section>
          </div>
          <div
            className="tab-pane fade"
            id="calender-tab-pane"
            role="tabpanel"
            aria-labelledby="calender-tab"
            tabIndex="0"
          >
            <Calandar formattedEvents={singleEmployeeEvents} />
          </div>
        </div>
        {/* 
        <section className="tables new-table">
          <table className="main-table">
            <TableHead
              tableHeadProperties={employeeeAttedanceTableProperties}
              data={employeeAttendanceData || []}
            />
          </table>
        </section>

        <Calandar formattedEvents={singleEmployeeEvents} /> */}
      </section>
    </div>
  );
};

export default SingleEmployeeAttendanceCalendar;

//second component down below

export const UpdateAttendance = ({ attendanceItem }) => {
  const { applicationColor } = useThemeContext();

  const {
    attendanceModal,
    attendanceModalData,
    setAttendanceModalData,
    setAttendanceModal,
    loading,
    setLoading,
    loadingTerm,
    setLoadingTerm,
  } = useStateContext();
  const [editingItem, setEditingItem] = useState({});

  useEffect(() => {
    if (attendanceItem) {
      setEditingItem({
        attendanceId: attendanceItem?.attendanceId,
        checkInTime: attendanceItem?.checkIn?.time,
        checkInNotes: attendanceItem?.checkIn?.notes,
        checkOutTime: attendanceItem?.checkOut?.time,
        checkOutNotes: attendanceItem?.checkOut?.notes,
      });
    }
  }, [attendanceItem]);

  // useEffect(() => {
  //   console.log(editingItem);
  // }, [editingItem]);

  const handleSubmit = async (e, data) => {
    e.preventDefault();

    try {
      setLoading(true);
      setLoadingTerm("updatingEmployeeAttendance");
      console.log(attendanceModalData);
      if (attendanceModalData.edit) {
        data.attendanceId = attendanceItem.attendanceId;
      }
      const { detail } = await makeNetworkCall(
        data,
        "updateAttendance",
        "headers"
      );
      toastOptions.success(
        typeof detail === "object" ? "Attendance Updated Successfully" : detail
      );
    } catch (error) {
      setLoading(false);
      setLoadingTerm("");
      if (error) {
        toastOptions.error(
          error?.error?.response?.data?.detail || error[0].message
        );
      }
      return Promise.reject(error);
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  let attendanceDataUpdate = () => {
    try {
      setAttendanceModal(!attendanceModal);
      setAttendanceModalData({
        heading: "Attendance",
        fields: [
          "checkInTime",
          "checkInNotes",
          "checkOutTime",
          "checkOutNotes",
        ],
        onClose: () => {
          setAttendanceModal(false);
        },
        types: ["time", "text", "time", "text"],
        editingItem: editingItem,
        placeholders: [
          "Check in Time",
          "Check in notes",
          "Check out time",
          "Check out notes",
        ],
        handleSubmit: handleSubmit,
        schema: {},
        edit: true,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <section
        className="actions"
        style={{
          color: applicationColor.readColor1,
        }}
      >
        <button
          className="edit"
          style={{
            color: applicationColor.readColor1,
          }}
          onClick={attendanceDataUpdate}
        >
          <FaUserEdit />
        </button>
      </section>
    </>
  );
};
