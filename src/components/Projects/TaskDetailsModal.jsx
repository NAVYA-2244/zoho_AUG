import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./TaskDetailsModal.scss"; // Optional, for custom styles if needed

const TaskDetailsModal = ({ tasks, onClose }) => {
  return (
    <div className="modal fade" id="taskDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="taskDetailsModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="taskDetailsModalLabel">Task Details</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {tasks.length > 0 ? (
              <ul className="list-group">
                {tasks.map((task, index) => (
                  <li key={index} className="list-group-item">
                    <h6 className="task-title">
                      <strong>Task ID:</strong> {task.task_id}
                    </h6>
                    <p>
                      <strong>Task Name:</strong> {task.task_name}
                    </p>
                    <p>
                      <strong>Status:</strong> {task.status}
                    </p>
                    <p>
                      <strong>Description:</strong> {task.description || "No description"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks available.</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
