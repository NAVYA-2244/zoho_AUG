import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { makeNetworkCall } from "../../../HttpServices/HttpService";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { useStateContext } from "../../Contexts/StateContext";
import { FaFileAlt, FaUserEdit } from "react-icons/fa";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useThemeContext } from "../../Contexts/ThemesContext";
import Joi from "joi";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { AiOutlineDownload } from "react-icons/ai";
import TableHead from "../../Table/TableHead";
import { fileSchema } from "../../AllSchema/EmployeeSchema";

const FilesByFolderId = () => {
  const {
    loading,
    loadingTerm,
    setLoadingTerm,
    setLoading,
    fileModalData,
    setFileModalData,
    fileModal,
    setFileModal,
    employeeDetails,
    setErrors,
    files,
    setFiles,
  } = useStateContext();
  const [access, setAccsess] = useState(false);
  const { checkErrors } = useFunctionContext();
  const [currentEditingFile, setCurrentEditingFile] = useState({});
  const { applicationColor } = useThemeContext();
  const { folderId } = useParams();
  const [filesSkip, setFilesSkip] = useState(0);
  const filesSkipRef = useRef();

  const initalState = {
    heading: "",
    types: [],
    fields: [],
    onClose: () => { },
    onClose: () => { },
    editingItem: {},
    placeholders: [],
    handleSubmit: () => { },
    handleSubmit: () => { },
    schema: {},
    edit: false,
    fileId: "",
  };

  useEffect(() => {
    if (employeeDetails.adminType === "1") {
      setAccsess(true);
    }
  }, [employeeDetails]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setLoadingTerm("gettingFiles");
      let { detail } = await makeNetworkCall(
        {
          folderId: folderId,
          employeeFilesFilters: {
            skip: filesSkip,
            limit: 10,
          },
        },
        "getAllFolderFilesAdmin",
        "headers"
      );
      setFiles(detail);
      setLoading(false);
      setLoadingTerm("");
    } catch (error) {
      toastOptions.error(
        error?.error?.response?.data?.detail || "Error Occured"
      );
      setLoading(false);
      setLoadingTerm("");
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    try {

      await checkErrors(fileSchema, data);
      setLoading(true);
      setLoadingTerm(
        fileModalData.edit ? "updatingExsistingFile" : "addNewFile"
      );
      let payload = {};
      payload.file = data.file;
      payload.fileName = data.fileName;
      payload.employeeId = data.employeeId;
      payload.description = data.description;
      payload.folder = folderId;

      payload.view = {
        employee: data.employeeView === true ? "Enable" : "Disable",
        reportingManager:
          data.reportingManagerView === true ? "Enable" : "Disable",
      };
      payload.download = {
        employee: data.employeeDownload === true ? "Enable" : "Disable",
        reportingManager:
          data.reportingManagerDownload === true ? "Enable" : "Disable",
      };

      console.log({ payload });

      const { detail } = await makeNetworkCall(
        payload,
        "addEmployeeFiles",
        "headers"
      );
      console.log(detail);
      toastOptions.success(detail || "File Successfully Added In the Folder");
      let response = await makeNetworkCall(
        {
          folderId: folderId,
          employeeFilesFilters: {
            skip: filesSkip,
            limit: 10,
          },
        },
        "getAllFolderFilesAdmin",
        "headers"
      );

      setFiles(response.detail);
      setLoading(false);
      setLoadingTerm("");
      setFileModal(false);
      setFileModalData(initalState);
    } catch (error) {
      setLoading(false);
      setLoadingTerm("");
      toastOptions.error(
        error?.error?.response?.data?.detail || error[0].message
      );
      //   setFileModalData(initalState);
    } finally {
      setLoading(false);
      setLoadingTerm("");
      //   setFileModalData(initalState);
    }
  };

  const onFileAdd = () => {
    setFileModal(true);
    setFileModalData({
      heading: "File",
      types: [],
      fields: [
        "file",
        "fileName",
        "employeeId",
        "description",
        "employeeView",
        "reportingManagerView",
        "employeeDownload",
        "reportingManagerDownload",
      ],
      onClose: () => {
        return setFileModal(false);
      },
      editingItem: {},
      placeholders: [
        "File",
        "File Name",
        "Employee Id",
        "Description",
        "Employee",
        "Reporting Manager",
        "Employee",
        "Reporting Manager",
      ],
      handleSubmit: handleSubmit,
      schema: fileSchema,
      edit: false,
    });
  };

  useEffect(() => {
    fetchData();
  }, [folderId]);

  const handleOpenPDF = (fileString) => { };

  const handleDownloadPDF = (fileString, fileName) => { };

  let tableFileProperties = [
    { name: "File", property: "fileName", type: "string" },
    { name: "Shared To", property: "employeeName", type: "string" },
    { name: "Folder", property: "folderName", type: "string" },
    { name: "Modified At", property: "updatedAt", type: "string" },
    { name: "Actions", property: "", type: "string" },
  ];

  return (
    <section
      className="files"
    //   style={{ background: applicationColor.cardItem }}
    >
      <div className="allfiles">
        <div
          className="tables"
          style={
            {
              // boxShadow:`0 0 1px 1px ${.shade_5}  `
            }
          }
        >
          <table className="main-table">
            <TableHead
              tableHeadProperties={tableFileProperties}
              data={files}
              component="UpdateFileStatus"
            //   loadMoreRef={gettingMoreDataRef}
            //   getExtraDataType="getExtraEmployees"
            //   dataExist={dataExist}
            />
          </table>
        </div>
      </div>

      {access && (
        <button className="addFileButton" onClick={onFileAdd}>
          Add File
        </button>
      )}
    </section>
  );
};

export default FilesByFolderId;

export const UpdateFileStatus = ({ editingFile }) => {
  console.log(editingFile, "editingFile");
  const navigate = useNavigate();
  const { folderId } = useParams();
  const { checkErrors } = useFunctionContext();
  const { applicationColor } = useThemeContext();
  const [editingItem, setEditingItem] = useState({});
  const {
    setFileModal,
    setFileModalData,
    fileModalData,
    setFiles,
    setLoading,
    setLoadingTerm,
    setErrors,
  } = useStateContext();

  const handleEdit = async (e, data) => {
    e.preventDefault();
    try {
      await checkErrors(fileSchema, data);
      setLoading(true);
      setLoadingTerm("updatingExsistingFile");
      let payload = {};
      payload.file = data.file;
      payload.fileName = data.fileName;
      payload.employeeId = data.employeeId;
      payload.description = data.description;
      payload.folder = folderId;

      payload.view = {
        employee: data.employeeView === true ? "Enable" : "Disable",
        reportingManager:
          data.reportingManagerView === true ? "Enable" : "Disable",
      };
      payload.download = {
        employee: data.employeeDownload === true ? "Enable" : "Disable",
        reportingManager:
          data.reportingManagerDownload === true ? "Enable" : "Disable",
      };

      if (fileModalData.edit) {
        payload.fileId = fileModalData.fileId;
      }
      console.log({ payload });
      const { detail } = await makeNetworkCall(
        payload,
        fileModalData.edit ? "updateEmployeeFiles" : "addEmployeeFiles",
        "headers"
      );
      toastOptions.success(detail || "File Successfully Updated In the Folder");
      let response = await makeNetworkCall(
        {
          folderId: folderId,
        },
        "getAllFolderFilesAdmin",
        "headers"
      );

      setFiles(response.detail);
      setLoading(false);
      setLoadingTerm("");
      setFileModal(false);
      //   setFileModalData(initalState);
    } catch (error) {
      setLoading(false);
      setLoadingTerm("");
      toastOptions.error(
        error?.error?.response?.data?.detail || error[0].message
      );
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  useEffect(() => {
    if (editingFile) {
      setEditingItem({
        file: editingFile.file,
        fileName: editingFile.fileName,
        employeeId: editingFile.employeeId,
        description: editingFile.description,
        employeeView: editingFile?.view?.employee === "Enable" ? true : false,
        reportingManagerView:
          editingFile?.view?.reportingManager === "Enable" ? true : false,
        employeeDownload:
          editingFile?.download?.employee === "Enable" ? true : false,
        reportingManagerDownload:
          editingFile?.download?.reportingManager === "Enable" ? true : false,
      });
    }
  }, [editingFile]);

  const settingEditingItem = async () => {
    try {
      setFileModal(true);
      setFileModalData({
        heading: "File",
        types: [],
        fields: [
          "file",
          "fileName",
          "employeeId",
          "description",
          "employeeView",
          "reportingManagerView",
          "employeeDownload",
          "reportingManagerDownload",
        ],
        onClose: () => {
          setFileModal(false);
          setErrors({});
          setLoading(false);
          setLoadingTerm("");
        },
        editingItem: editingItem,
        placeholders: [
          "File",
          "File Name",
          "Employee Id",
          "Description",
          "Employee",
          "Reporting Manger",
          "Employee",
          "Reporting Manager",
        ],
        handleSubmit: handleEdit,
        schema: fileSchema,
        edit: true,
        fileId: editingFile.fileId,
      });
    } catch (error) {
      toastOptions.error("error occured");
    }
  };

  return (
    <section
      className="actions"
      style={{
        color: applicationColor.readColor1,
      }}
    >
      <button
        className="edit"
        style={{
          color: applicationColor.readColor1,
        }}
        onClick={() => settingEditingItem()}
      >
        <FaUserEdit />
      </button>
      <button
        className="delete"
        style={{
          color: applicationColor.readColor1,
        }}
      >
        <MdDeleteOutline />
      </button>
    </section>
  );
};
