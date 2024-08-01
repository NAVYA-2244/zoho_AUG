import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { backEndCallObjNothing } from "../../../services/mainService";
import { toastOptions } from "../../../Utils/FakeRoutes";

const localizer = momentLocalizer(moment);

const EmployeeAttendanceCalendar = () => {
  const [employeeAttendance, setEmployeeAttendance] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(7);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        let response = await backEndCallObjNothing("/emp_get/get_attendance", {
          skip,
          limit,
        });
        console.log(response, "response");
        setEmployeeAttendance(response.attendance);
      } catch (error) {
        // Handle error, toast message, etc.
        console.error("Error fetching data:", error);
      }
    };
    fetchingData();
  }, [skip, limit]);

  console.log("empoyeeAttendence from calender", { employeeAttendance });

  useEffect(() => {
    // Format employeeAttendance data into calendarEvents
    const formattedEvents = employeeAttendance.flatMap((employee) => {
      if (employee.checkin.length > 0) {
        const firstCheckin = employee.checkin[0].in_time;
        console.log(firstCheckin, "firstcheckin");

        const lastCheckout =
          employee.checkout.length > 0
            ? employee.checkout[employee.checkout.length - 1].out_time
            : null;

        // If there is no corresponding checkout, mark as absent
        if (!lastCheckout) {
          return [
            {
              title: "Absent",
              start: firstCheckin,
              end: firstCheckin, // Display check-in time as end time as well
            },
          ];
        } else {
          return [
            {
              title: "Present",
              start: firstCheckin,
              end: lastCheckout,
            },
          ];
        }
      }
      return []; // No check-ins for this employee
    });

    setCalendarEvents(formattedEvents);
  }, [employeeAttendance]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <Calendar
        events={calendarEvents}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={Views.MONTH}
        onSelectEvent={handleSelectEvent}
      />

      {/* Modal for displaying event details */}
      {selectedEvent && (
        <div
          className={`modal fade ${showModal ? "show d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
          style={{
            display: showModal ? "block" : "none",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog checkin-checkout-model" role="document">
            <div className="modal-content employee-calenderView-model">
              <div className="calenderView-model-body">
                <div className="calenderView-model-head">
                  <p className="modal-title">
                    {moment(selectedEvent.start).format("DD MMM YYYY")}
                  </p>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="attendence-check-in">
                  <p>Check-in</p>
                  <p>{moment(selectedEvent.start).format("HH:mm:ss")}</p>
                </div>

                <div className="attendence-check-out">
                  <p>Check-out</p>
                  <p>
                    {selectedEvent.start === selectedEvent.end
                      ? "-"
                      : moment(selectedEvent.end).format("HH:mm:ss")}
                  </p>
                </div>
              </div>

              {/* <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeAttendanceCalendar;
