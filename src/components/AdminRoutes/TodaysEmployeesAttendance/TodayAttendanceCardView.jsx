import React, { useState } from "react";
import { useThemeContext } from "../../Contexts/ThemesContext";

function TodayAttendanceCardView({ todayAttendance }) {
  const { applicationColor } = useThemeContext();

  const cardViewHeadings = ["Late Checkin", "On Leave", "All Checkin's"];
  const arrToDisplyDummyData = [1, 2, 3, 4];

  return (
    <>
      {cardViewHeadings.map((item) =>
        item === "Late Checkin" ? (
          <div className="late-checkin-data">
            <div className="late-checkin-heading">
              <p>{item}</p>
              <p className="count late-count">04</p>
            </div>
            <div className="late-checkin-info">
              {arrToDisplyDummyData.map((arr) => (
                <div
                  className="late-checkin-individual"
                  style={{
                    background: applicationColor.cardBg1,
                    color: applicationColor.readColor1,
                  }}
                >
                  <div className="individual-names">
                    <img
                      src="https://cdnb.artstation.com/p/assets/images/images/034/457/411/large/shin-min-jeong-.jpg?1612345193"
                      alt="profile-img"
                    />
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="individual-name">Akash</p>
                        <p className="individual-id text-muted mb-2">
                          CG708116
                        </p>
                        <p className="individual-id">stany@gmail.com</p>
                      </div>
                    </div>
                    <div className="status late-status">
                      <span className="fw-semibold">Late</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : item === "On Leave" ? (
          <div className="late-checkin-data">
            <div className="late-checkin-heading">
              <p>{item}</p>
              <p className="count leave-count">03</p>
            </div>
            <div className="late-checkin-info">
              {arrToDisplyDummyData.map((arr) => (
                <div
                  className="late-checkin-individual"
                  style={{
                    background: applicationColor.cardBg1,
                    color: applicationColor.readColor1,
                  }}
                >
                  <div className="individual-names">
                    <img
                      src="https://cdna.artstation.com/p/assets/images/images/034/457/398/large/shin-min-jeong-.jpg?1612345160"
                      alt="profile-img"
                    />
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="individual-name">Stany</p>
                        <p className="individual-id text-muted mb-2">
                          CG708116
                        </p>
                        <p className="individual-id">stany@gmail.com</p>
                      </div>
                    </div>
                    <div className="status out-status">
                      <span className="fw-semibold">Out</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="late-checkin-data">
            <div className="late-checkin-heading">
              <p>{item}</p>
              <p className="count checkin-count">20</p>
            </div>
            {todayAttendance?.length > 0 ? (
              <>
                {todayAttendance.map((employees) => (
                  <div className="late-checkin-info">
                    {employees.map((eachEmployee) => (
                      <div
                        key={eachEmployee.employee_id}
                        className="late-checkin-individual"
                        style={{
                          background: applicationColor.cardBg1,
                          color: applicationColor.readColor1,
                        }}
                      >
                        {console.log(eachEmployee)}
                        <div className="individual-names">
                          <img
                            src="https://cdnb.artstation.com/p/assets/images/images/034/457/373/large/shin-min-jeong-.jpg?1612345104"
                            alt="profile-img"
                          />
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="individual-name">Navya</p>
                              <p className="individual-id text-muted mb-2">
                                {eachEmployee.employee_id}
                              </p>
                              <p className="individual-id">demo@gmail.com</p>
                            </div>
                          </div>
                          <div className="status in-status">
                            {eachEmployee.checkin.length > 0 ? (
                              <span className="fw-semibold">In</span>
                            ) : (
                              "Not In"
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              "No-Data"
            )}
          </div>
        )
      )}
    </>
  );
}

export default TodayAttendanceCardView;
