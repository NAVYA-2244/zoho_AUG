import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { toastOptions } from "../../../Utils/FakeRoutes";

const localizer = momentLocalizer(moment);

const Calandar = ({ formattedEvents, handleBefore, incrementingTheMonth }) => {
  const { applicationColor } = useThemeContext();
  const { handleSelectEvent } = useFunctionContext();

  const eventStyleGetter = (event, start, end, isSelected) => {
    // const backgroundColor = event.resource.statusColor;
    const style = {
      backgroundColor: "transparent",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return { style };
  };

  const EventWrapper = ({ event }) => {
    return <div>{event.customDisplay}</div>;
  };

  const handleNavigation = async (date, view, action) => {
    if (action === "PREV") {
      await handleBefore();
    }
    if (action === "NEXT") {
      toastOptions.success("clicked on next");
      incrementingTheMonth();
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["week", "month"]}
        style={{ height: "80vh" }}
        min={0}
        max={0}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        tooltipAccessor="title" // Using the string title for tooltip
        components={{
          event: EventWrapper,
        }}
        onNavigate={handleNavigation}
      />
    </div>
  );
};

export default Calandar;
