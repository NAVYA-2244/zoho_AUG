import React, { Fragment, useState } from "react";
import { useStateContext } from "../Contexts/StateContext";
import { useThemeContext } from "../Contexts/ThemesContext";

const Modal = () => {
  const { applicationColor } = useThemeContext();
  const { modalData, showModal, setshowModal } = useStateContext();

  const Detailes = () => {
    return (
      <Fragment>
        <div className="modal">
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                background: applicationColor.cardBg2,
                color: applicationColor.readColor1,
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Employee Leaves</h5>
                {/* <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => setshowModal(false)}
                ></button> */}
              </div>

              <div className="modal-body">
                <div className="employee-details text-left">
                  <img
                    src="https://www.shutterstock.com/image-vector/lgo-letter-initial-logo-design-260nw-2134874021.jpg"
                    alt={`${modalData.employeeName || "no data"}`}
                    width={60}
                  />

                  <div className="employee-list-main mt-4">
                    <div className="employee-child">
                      <p className="fw-semibold">Employee ID</p>
                    </div>
                    <div className="employee-child">
                      <p> {modalData._id || "no data"}</p>
                    </div>

                    <div className="employee-child">
                      <p className="fw-semibold">Leave Type</p>
                    </div>
                    <div className="employee-child">
                      <p>{modalData.leaveType || "no data"}</p>
                    </div>

                    <div className="employee-child">
                      <p className="fw-semibold">Reason</p>
                    </div>
                    <div className="employee-child">
                      <p
                        style={{
                          textWrap: "wrap",
                          overflowWrap: "break-word",
                          maxWidth: "200px",
                        }}
                      >
                        {modalData.reason || "no data"}
                      </p>
                    </div>

                    <div className="employee-child">
                      <p className="fw-semibold">From Date</p>
                    </div>
                    <div className="employee-child">
                      <p> {modalData.fromDate || "no data"}</p>
                    </div>

                    <div className="employee-child">
                      <p className="fw-semibold">To Date</p>
                    </div>
                    <div className="employee-child">
                      <p>{modalData.toDate || "no data"}</p>
                    </div>

                    <div className="employee-child">
                      <p className="fw-semibold">Days Taken</p>
                    </div>
                    <div className="employee-child">
                      <p>{modalData.daysTaken || "no data"}</p>
                    </div>

                    <div className="employee-child">
                      <p className="fw-semibold">Remaining Leaves</p>
                    </div>
                    <div className="employee-child">
                      <p> {modalData.remainingLeaves || "no data"}</p>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <div className="acceptOrReject">
                    <button className="btn btn-success me-2">Accept</button>
                    <button className="btn btn-warning">Reject</button>
                  </div>

                  <div className="close">
                    <button
                      className="btn btn-danger"
                      onClick={() => setshowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => setshowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">{showModal && <Detailes />}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Modal;
