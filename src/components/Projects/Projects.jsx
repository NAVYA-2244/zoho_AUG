import React, { useState, useEffect, useRef } from "react";
import "./Projects.scss";
import { CgSearch } from "react-icons/cg";
import { TiUserAdd } from "react-icons/ti";
import { TbUserCircle } from "react-icons/tb";
import { MdOutlineAdd, MdOutlineDone } from "react-icons/md";
import { BiDotsVertical } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { HiUserCircle } from "react-icons/hi2";
import { useThemeContext } from "../Contexts/ThemesContext";
import ProjectEditModal from "./ProjectEditModal";

const Projects = () => {
  const [textArea, setTextArea] = useState(false);
  const [issue, setIssue] = useState("");
  const [issues, setIssues] = useState([]);
  const [hover, setHover] = useState(false);
  const { applicationColor } = useThemeContext();
  const [editingIndex, setEditingIndex] = useState(null);
  const [newIssueText, setNewIssueText] = useState("");

  const editIssue = (index) => {
    setEditingIndex(index);
    setNewIssueText(issues[index]);
  };

  const handleSaveClick = (index) => {
    const updatedIssues = [...issues];
    updatedIssues[index] = newIssueText;
    setIssues(updatedIssues);
    setEditingIndex(null);
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setNewIssueText("");
  };

  const addIssueRef = useRef(null);

  const handleAddIssue = () => {
    if (issue.trim()) {
      setIssues([...issues, issue]);
      setIssue("");
      setTextArea(false);
    }
  };

  // Hide textarea when clicking outside the add-issue div
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addIssueRef.current && !addIssueRef.current.contains(event.target)) {
        setTextArea(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
        className="outlet-pages projects-page p-3"
      >
        <h4 className="fw-semibold">Projects</h4>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="projects-search my-4">
              <CgSearch />
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
                style={{
                  background: applicationColor.cardBg2,
                  color: applicationColor.readColor1,
                }}
              />
            </div>
            <div className="avatar-list d-flex align-items-center ms-3">
              <span
                data-toggle="tooltip"
                data-placement="bottom"
                title="Pavan Rebba"
                data-bs-custom-class="custom-tooltip"
                className="task-user default-task-users avatar z-3"
              >
                PR
              </span>
              <span
                style={{
                  background: applicationColor.cardBg2,
                  color: applicationColor.readColor1,
                }}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Unassigned"
                data-bs-custom-class="custom-tooltip"
                className="unassigned-tasks default-task-users avatar"
              >
                <TbUserCircle />
              </span>
            </div>
            <span
              data-toggle="tooltip"
              data-placement="bottom"
              title="Add people"
              data-bs-custom-class="custom-tooltip"
              className="add-task-user default-task-users avatar ms-4"
            >
              <TiUserAdd />
            </span>
          </div>
          <div>
            <span className="me-2">SORT BY: </span>
            <div className="btn-group">
              <button
                style={{
                  background: applicationColor.mainBg,
                  color: applicationColor.readColor1,
                }}
                type="button"
                className="btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Assignee
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" type="button">
                    Assignee
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    None
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div
            className="col-xl-3"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            ref={addIssueRef}
          >
            <div
              style={{
                background: applicationColor.mainBg,
                color: applicationColor.readColor1,
              }}
              className="p-3 rounded-0 add-issue"
            >
              <p className="fw-semibold mb-4">Project1</p>
              {hover && !textArea && (
                <div className="create-issue">
                  <MdOutlineAdd />
                  <span className="ms-1" onClick={() => setTextArea(true)}>
                    Create Issue
                  </span>
                </div>
              )}
              {textArea && (
                <div
                  style={{
                    background: applicationColor.cardBg1,
                    color: applicationColor.readColor1,
                  }}
                  className="p-2"
                >
                  <textarea
                    placeholder="What needs to be done?"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    autoFocus
                    className="form-control mb-2"
                  ></textarea>
                  <div className="text-end">
                    <button
                      className="btn btn-primary task-create-btn rounded-1"
                      onClick={handleAddIssue}
                      disabled={!issue.trim()}
                    >
                      Create
                    </button>
                  </div>
                </div>
              )}
              <div className="issues-list mt-3">
                {issues.map((issue, index) => (
                  <div
                    style={{
                      background: applicationColor.cardBg1,
                      color: applicationColor.readColor1,
                    }}
                    key={index}
                    className="issue-item mb-2 default-border shadow-sm"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0 task word-break">
                        {editingIndex === index ? (
                          <>
                            <div className="d-flex flex-column">
                              <input
                                type="text"
                                className="form-control"
                                value={newIssueText}
                                onChange={(e) =>
                                  setNewIssueText(e.target.value)
                                }
                                autoFocus
                              />
                              <div className="d-flex justify-content-end gap-2 mt-2">
                                <button
                                  className="btn btn-light shadow-sm rounded-0 border p-1 lh-1"
                                  onClick={() => handleSaveClick(index)}
                                >
                                  <MdOutlineDone />
                                </button>
                                <button
                                  className="btn btn-light shadow-sm rounded-0 border p-1 lh-1"
                                  onClick={handleCancelClick}
                                >
                                  <RxCross2 />
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="task-description">{issue}</span>
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Edit summery"
                              data-bs-custom-class="custom-tooltip"
                              className="ms-1 edit-summery"
                              onClick={() => editIssue(index)}
                            >
                              <RiEdit2Fill />
                            </span>
                          </>
                        )}
                      </p>
                      {editingIndex === index ? (
                        ""
                      ) : (
                        <div className="btn-group dropend">
                          <button
                            style={{
                              background: applicationColor.mainBg,
                              color: applicationColor.readColor1,
                            }}
                            type="button"
                            className="btn p-0 border-0"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <BiDotsVertical />
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button className="dropdown-item" type="button">
                                Hold
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                Pending
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                Done
                              </button>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <p
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        className="mb-0 fw-semibold"
                      >
                        Topwallet
                      </p>
                      <div className="btn-group dropend">
                        <button
                          type="button"
                          className="btn p-0 dropdown-toggle border-0 assigned-person"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <HiUserCircle />
                        </button>
                        <ul className="dropdown-menu assigning">
                          <li>
                            <button className="dropdown-item" type="button">
                              <HiUserCircle />
                              <p className="mb-0 d-inline-flex flex-column">
                                {" "}
                                <span>Sai Ramakrishna</span>
                                <span className="text-muted">
                                  ramakrishan@gmail.com
                                </span>
                              </p>
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item" type="button">
                              <HiUserCircle />
                              <p className="mb-0 d-inline-flex flex-column">
                                {" "}
                                <span>Sai Murari</span>
                                <span className="text-muted">
                                  murari@gmail.com
                                </span>
                              </p>
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item" type="button">
                              <HiUserCircle />
                              <p className="mb-0 d-inline-flex flex-column">
                                {" "}
                                <span>Raghava</span>
                                <span className="text-muted">
                                  raghava@gmail.com
                                </span>
                              </p>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* edit modal */}
        <ProjectEditModal />
      </div>
    </>
  );
};

export default Projects;
