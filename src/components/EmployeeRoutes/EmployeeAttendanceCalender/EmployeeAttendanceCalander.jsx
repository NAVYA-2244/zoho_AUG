import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { backEndCallObjNothing } from "../../../services/mainService";

const localizer = momentLocalizer(moment);

const EmployeeAttendanceCalendar = () => {
  const [employeeAttendance, setEmployeeAttendance] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(7);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Function to fetch attendance data from the backend
  const fetchAttendance = async () => {
    try {
      const response = await backEndCallObjNothing("/emp_get/get_attendance", {
        skip,
        limit,
      });
      console.log(response, "");
      setEmployeeAttendance(response.attendance);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch attendance data whenever `skip` or `limit` changes
  useEffect(() => {
    fetchAttendance();
  }, [skip, limit]);

  // Format the fetched attendance data into events for the calendar
  useEffect(() => {
    const formattedEvents = employeeAttendance?.flatMap((employee) => {
      if (employee.checkin.length > 0) {
        const firstCheckin = employee.checkin[0].in_time;
        const lastCheckout =
          employee.checkout.length > 0
            ? employee.checkout[employee.checkout.length - 1].out_time
            : null;

        // Ignore events for today
        const today = moment().startOf("day").toDate();
        
        const checkinDate = moment(firstCheckin).startOf("day").toDate();
        if (checkinDate.getTime() === today.getTime()) {
          return [];
        }

        // Determine if the employee was present or absent
        if (!lastCheckout) {
          return [
            {
              title: "Absent",
              start: firstCheckin,
              end: firstCheckin,
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
      return [];
    });
    setCalendarEvents(formattedEvents);
  }, [employeeAttendance]);
  // Handle event selection to show the modal with event details
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };
  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };
  // Highlight today's date in the calendar
  const dayPropGetter = (date) => {
    const today = moment().startOf("day").toDate();
    const currentDate = moment(date).startOf("day").toDate();

    if (currentDate.getTime() === today.getTime()) {
      return { className: "today-highlight" };
    }
    return {};
  };

  // Alert when the calendar view is changed to week view
  const handleViewChange = (view) => {
    if (view === Views.WEEK) {
      alert("You have switched to the week view.");
    }
  };

  return (
    <>
      <Calendar
        events={calendarEvents}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={[Views.MONTH, Views.DAY]}
        defaultView={Views.MONTH}
        onSelectEvent={handleSelectEvent}
        onView={handleViewChange}
        dayPropGetter={dayPropGetter}
      />
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default EmployeeAttendanceCalendar;
