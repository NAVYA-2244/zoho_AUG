import React, { useState } from "react";
import { RiAttachment2 } from "react-icons/ri";
import { HiUserCircle } from "react-icons/hi2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProjectEditModal = () => {
  const [description, setDescription] = useState("");
  const [assignees, setAssignees] = useState(["Sai ramakrishna", "Raghva"]);
  const [actions, setActions] = useState("");

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSaveChanges = () => {
    console.log("Description:", description);
    console.log("Actions:", actions);
    console.log("Assignees:", assignees);
    // Add logic to save changes
  };

  return (
    <div
      className="modal edit-modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-xl-7">
                <h4>Project Info Title Here...</h4>
                <div className="d-flex align-items-center my-3">
                  <div className="bg-light p-2 rounded-0">
                    <RiAttachment2 />
                    <span>Attach</span>
                  </div>
                </div>
                <div className="mt-5">
                  <h5 className="fw-semibold">Description</h5>
                  <ReactQuill
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Type here something.."
                  />
                </div>
              </div>
              <div className="col-xl-5">
                <div className="dropdown">
                  <button
                    className="btn btn-primary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item text-uppercase"
                        type="button"
                        onClick={() => setActions("Inprogress")}
                      >
                        Inprogress
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-uppercase"
                        type="button"
                        onClick={() => setActions("Done")}
                      >
                        Done
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="border mt-4">
                  <div className="row">
                    {assignees.map((assignee, index) => (
                      <React.Fragment key={index}>
                        <div className="col-5 p-3">
                          <p className="mb-0">Assignee</p>
                        </div>
                        <div className="col-7 p-3">
                          <div className="d-flex align-items-center">
                            <HiUserCircle />
                            <span className="ms-2">{assignee}</span>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                    <div className="col-5 p-3">
                      <p className="mb-0">Label</p>
                    </div>
                    <div className="col-7 p-3">
                      <p className="text-muted mb-0">None</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-top-0">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveChanges}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditModal;
