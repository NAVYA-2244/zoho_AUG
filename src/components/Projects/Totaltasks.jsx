import React, { useEffect, useState } from 'react';
import { useThemeContext } from '../Contexts/ThemesContext';
import Joi from 'joi';
import { backEndCallObjNothing } from '../../services/mainService';
import Loader from '../Loader/Loader';
import TaskDetailsModal from './TaskDetailsModal';
import { toastOptions } from '../../Utils/FakeRoutes';

const schema = Joi.object({
  skip: Joi.number().integer().min(0).required(),
  status: Joi.string().optional().allow("").valid("new", "in_progress", "under_review", "completed"),
  date: Joi.date().optional().allow(""),
});

function Totaltasks() {
  const { applicationColor } = useThemeContext();
  
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ skip: 0, status: "", date: "" });
  const [statusOptions] = useState(["new", "in_progress", "under_review", "completed"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
 
    const fetchingData = async () => {
      try {
        setLoading(true);
        const response = await backEndCallObjNothing("/emp_get/get_all_tasks", filters);
        console.log(response);
        setTasks(response || []); // Adjust based on actual response structure
      } catch (error) {
        setError(error?.response?.data || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
 

  useEffect(() => {
    fetchingData();
  }, [filters]);
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    const { error } = schema.validate(filters);
    if (error) {
      setError(error.details[0].message);
      return;
    }

    // Reset pagination and clear the filters
    setFilters({ skip: 0, status: "", date: "" });
  };
  const handleTaskUpdate = async (updatedTask) => {
    try {
      setLoading(true);
      const { task_id, status } = updatedTask;
     const response= await backEndCallObjNothing("/emp/update_task", { task_id, status });
toastOptions.success(response)
      await fetchingData();
       // Refetch tasks to update the list
    } catch (error) {
      console.error("Error updating task:", error);
      toastOptions.success(error?.response?.data)
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };
  return (
    <section
      className="company-details"
      style={{ background: applicationColor.cardBg1 }}
    >
      <div className="container mt-5">
        <h4 className="mb-4">Task List</h4>

        {/* Filters Form */}
        <div className="mb-4">
          <form>
            <div className="row">
              <div className="col-md-4 mb-3">
                {/* <label htmlFor="status" className="form-label">Status</label> */}
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All Statuses</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                {/* <label htmlFor="date" className="form-label">Date</label> */}
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="form-control"
                  value={filters.date}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-4 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={applyFilters}
                >
                  Filter
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {/* {error && <div className="alert alert-danger">{error}</div>} */}

        {/* Tasks Table */}
        <div className="table-responsive text-center">
          <table className="table ">
            <thead >
              <tr>
                <th>Date</th>
                <th>Task ID</th>
                <th>Task Name</th>
                <th>Project Name</th>
                {/* <th>Description</th> */}
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                {/* <th>Assigned By</th>
                <th>Assigned To</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {tasks.length > 0 ? (
    tasks.map((task, index) => (
      <tr key={index}>
        <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        <td>{task.task_id}</td>
        <td>{task.task_name}</td>
        <td>{task.project_name}</td>
        {/* <td className="table-description">{task.description}</td>  */}
        <td>{task.status}</td>
        <td>{task.priority}</td>
        <td>{new Date(task.due_date).toLocaleDateString()}</td>
        {/* <td>{task.assign_track[0]?.assigned_by?.employee_email || 'N/A'}</td>
        <td>{task.assign_track[0]?.assigned_to?.employee_name || 'N/A'}</td> */}
        <td>
          <button className="btn btn-outline-info btn-sm"  onClick={() => handleTaskClick(task)}>
            <i className="bi bi-pencil"></i>
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="10" className="text-center">No tasks available</td>
    </tr>
  )}
</tbody>

          </table>
          {/* Loading Indicator */}
          {loading && <div className="text-center"><Loader /></div>}
        </div>
      </div>
      {showModal && (
        <TaskDetailsModal
          task={selectedTask}
          onUpdate={handleTaskUpdate}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}

export default Totaltasks;
