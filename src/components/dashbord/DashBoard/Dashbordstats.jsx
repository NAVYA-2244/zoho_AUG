import React from "react";
import { useThemeContext } from "../../Contexts/ThemesContext";

const Dashbordstats = ({ data, heading }) => {
  const { applicationColor } = useThemeContext();

  // Access the status_track from the data prop
  const statusTrack = data?.status_track || [];

  return (
    <section
    className="list-array"
    style={{
      color: applicationColor.readColor1,
    }}
  >
    <h5 className="heading">{heading}</h5>
      {statusTrack.length > 0 ? (
        <div className="row">
          {statusTrack.map((item, index) => (
            <div className="col-12 col-md-6 mb-4" key={index}>
              <div
                className="card text-center shadow-sm"
                style={{
                  backgroundColor: applicationColor.cardBg2,
                  color: applicationColor.textColor,
                  border: `1px solid ${applicationColor.readColor1}`,
                  borderRadius: "8px",
                }}
              >
                <div className="card-body">
                  <h6 className="card-title text-uppercase mb-2">
                    {item.status.replace('_', ' ')}
                  </h6>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: applicationColor.primary,
                      color: 'rgb(108, 99, 252)',
                      fontSize: "1.25rem",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    {item.count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          No tasks available.
        </div>
      )}
    </section>
  );
};

export default Dashbordstats;
