import React from "react";
import { useThemeContext } from "../../Contexts/ThemesContext";

const Dashbordstats = ({ data, heading }) => {
  const { applicationColor } = useThemeContext();

  // Access the status_track from the data prop
  const statusTrack = data?.status_track || [];

  return (
    <section
    className="lists"
    style={{
      color: applicationColor.readColor1,
    }}
  >
    <h5 className="heading">{heading}</h5>

    <section className="list-array">
            {statusTrack.length > 0 ? (
        <div className="d-flex flex-column align-items-center">
          {statusTrack?.map((item, index) => (
            <div className="mb-2" key={index} style={{ width: '100%' }}>
              <div
                className="card text-center shadow-sm"
                
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = `0 8px 16px ${applicationColor.shadowColor || "rgba(0, 0, 0, 0.2)"}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="card-body">
                  <h6
                    className="card-title text-uppercase mb-2"
                    
                  >
                    {item.status.replace('_', ' ')}
                  </h6>
                  
                    <h6 className="text-dark">{item.count}</h6>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
      <p className="text-center">
          No tasks available.
          </p>
      )}
    </section>
    </section>
  );
};

export default Dashbordstats;
