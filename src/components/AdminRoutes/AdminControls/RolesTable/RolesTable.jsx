import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Modal from "./Modal/Modal";
import { useStateContext } from "../../../Contexts/StateContext";
import Loader from "../../../Loader/Loader";
import { useThemeContext } from "../../../Contexts/ThemesContext";
import { FaRegEdit } from "react-icons/fa";
import { MdMovieEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { RiAddCircleFill } from "react-icons/ri";

const RolesTable = ({
  heading,
  data,
  property1,
  property2,
  fields,
  onAdd,
  schema,
  onDelete,
  value,
  edit,
  setEdit,
  placeholders,
  types,
  options,
}) => {
  const [showModal, setShowModal] = useState();
  const { applicationColor } = useThemeContext();
  const [editingItem, setEditingItem] = useState({});
  const [settingId, setSettingId] = useState("");
  const { loading, setErrors, setLoading } = useStateContext();
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    if (data) {
      // Assuming data contains three separate arrays
      const merged = data.flat();
      setMergedData(merged);
    }
  }, [data]);

  // Function to open the modal
  const handleAddItems = () => {
    setEditingItem({});
    setShowModal(true);
    setEdit(false);
  };

  // Function to open the modal with existing details like roles, departments, designation etc.
  const handleEditItems = (id, item) => {
    setSettingId(id);
    setEdit(true);
    setShowModal(true);
    setEditingItem(item);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setErrors({});
    setShowModal(false);
    setLoading(false);
  };

  return (
    <>
      <div className="">
        <section
          className="roles-table"
          style={{
            background: applicationColor.cardBg1,
            color: applicationColor.readColor1,
          }}
        >
          <section className="row">
            <div className="mb-4 text-end">
              <button
                className="dropdown-item d-flex align-items-center justify-content-end"
                type="button"
                onClick={handleAddItems}
              >
                <span className="add-role me-1">Add</span>
                <RiAddCircleFill />
              </button>
            </div>
            {mergedData && mergedData.length > 0 ? (
              mergedData.map((item, index) => {
                const {
                  role_id,
                  role_name,
                  department_id,
                  department_name,
                  designation_id,
                  designation_name,
                  shifts_id,
                  shifts_name,
                  events_id,
                  events_name,
                  leave_types_id,
                  leave_types_name,
                  floder_id,
                  floder_name,
                } = item;
                return (
                  <div
                    className="col-xl-4 mb-3"
                    key={index}
                    onClick={() => handleEditItems(item[property1], item)}
                  >
                    <div className="p-3 rounded-3 default-border role-cards">
                      {role_name && (
                        <p className="text-primary fw-semibold text-uppercase">
                          Name: {role_name}
                        </p>
                      )}
                      {role_id && <p>ID: {role_id}</p>}
                      {department_name && (
                        <p className="text-primary fw-semibold text-uppercase">
                          Name: {department_name}
                        </p>
                      )}
                      {department_id && <p>ID: {department_id}</p>}

                      {designation_name && (
                        <p className="text-primary fw-semibold text-uppercase">
                          Name: {designation_name}
                        </p>
                      )}
                      {designation_id && <p>ID: {designation_id}</p>}
                      <div className="d-flex justify-content-between mt-3"></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                There is no data in your location
              </div>
            )}
          </section>
          {showModal && (
            <Modal
              fields={fields}
              heading={heading}
              onSubmit={onAdd}
              onClose={handleCloseModal}
              schema={schema}
              setShowModal={setShowModal}
              edit={edit}
              setEdit={setEdit}
              settingId={settingId}
              setSettingId={setSettingId}
              editingItem={editingItem}
              property1={property1}
              property2={property2}
              placeholders={placeholders}
              types={types}
              options={options}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default RolesTable;
