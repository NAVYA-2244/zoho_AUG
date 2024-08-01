import React from "react";
// import "./Circular.scss";

const CircularLoader = ({ max, min }) => {
  // Calculate the percentage of the circle to fill
  let value = min;
  let total = max;
  const percentage = (value / total) * 100;
  const circumference = 2 * Math.PI * 50; // Circumference of the circle with radius 50

  return (
    <div className="circular-loader">
      <svg className="progress-ring" width="140" height="140">
        <circle
          className="progress-ring-circle"
          stroke="#ddd" // Color of the unfilled portion of the circle
          strokeWidth="8" // Width of the circle
          fill="transparent"
          r="50"
          cx="70"
          cy="70"
        />
        <circle
          className="progress-ring-circle"
          stroke="#007bff" // Color of the filled portion of the circle
          strokeWidth="8"
          fill="transparent"
          r="50"
          cx="70"
          cy="70"
          style={{
            strokeDasharray: `${
              (percentage / 100) * circumference
            } ${circumference}`,
            strokeDashoffset: 0, // Start filling from the top
            transform: "rotate(-90deg)", // Rotate the circle to start from the top
            transformOrigin: "center", // Rotate around the center
          }}
        />
      </svg>
      {/* <div className="progress-text">
        {value}/{total}
      </div> */}
    </div>
  );
};

export default CircularLoader;

<CircularLoader />;
