import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useStateContext } from "../../Contexts/StateContext";
const CustomBarChart = () => {
  const { applicationColor } = useThemeContext();
  const { employeeDetails, employeeData } = useStateContext();
  const [weekAttendance, setWeekAttendance] = useState([]);
  useEffect(() => {
    if (
      ["0", "2", "3"].includes(employeeDetails.adminType) &&
      Object.keys(employeeData).length
    ) {
      setWeekAttendance(employeeData.workedHoursStats);
    }
  }, [employeeDetails, employeeData]);
  const data = [
    { day: "S", Hours: 6 },
    { day: "M", Hours: 8.5 },
    { day: "T", Hours: 7 },
    { day: "W", Hours: 9 },
    { day: "T", Hours: 10 },
    { day: "F", Hours: 7.5 },
    { day: "S", Hours: 1 },
  ];
  const axisStyle = {
    fill: applicationColor.readColor1, // Font color
    fontSize: "1rem", // Font size
  };
  const barStyle = {
    // fill: "#0097FF",
    fill: "#6c63fc",
    filter: "brightness(115%)",
  };

  const tooltipStyle = {
    backgroundColor: "#F5F5F5", // Change this to your desired background color
    border: "1px solid #ccc", // Optional: add border
    borderRadius: "5px", // Optional: add border radius
    padding: "10px", // Optional: add padding
  };
  return (
    <ResponsiveContainer width="100%" height={290}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        {/* <CartesianGrid strokeDasharray="10 10" /> */}
        <XAxis dataKey="day" tick={axisStyle} />
        <YAxis domain={[0, 12]} tick={axisStyle} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
        <Bar dataKey="Hours" {...barStyle} radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default CustomBarChart;
