import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { makeNetworkCall } from "../../../HttpServices/HttpService";
import { useStateContext } from "../../Contexts/StateContext";
import TableHead from "../../Table/TableHead";
import { useThemeContext } from "../../Contexts/ThemesContext";
import Loader from "../../Loader/Loader";

const EmployeeFilesById = () => {
  const { folderId, folderName } = useParams();
  const { setFiles, setLoadingTerm, setLoading, files } = useStateContext();
  const { applicationColor } = useThemeContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filesSkip, setFilesSkip] = useState(0);
  const filesSkipRef = useRef();
  const [filteredFiles, setFilteredFiles] = useState([]);

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
        "getEmployeeFolderFiles",
        "headers"
      );

      setFiles(detail);
      setFilteredFiles(detail);
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

  const fetchMoreData = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  let tableFileProperties = [
    { name: "File", property: "fileName", type: "string" },
    { name: "Shared To", property: "employeeName", type: "string" },
    { name: "Folder", property: "folderName", type: "string" },
    { name: "Modified At", property: "updatedAt", type: "string" },
    { name: "Shared By", property: "addedBy.employeeName", type: "string" },
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      let newFilteredItems = filteredFiles?.filter((file, index) => {
        const { fileName } = file;
        return fileName?.toLowerCase()?.includes(lowerCaseSearchTerm);
      });
      setFiles(newFilteredItems);
    } else {
      setFiles(filteredFiles);
    }
  }, [searchTerm]);

  return (
    <div className="allfiles">
      <div className="search-bar">
        <div
          className="searchbar-loading"
          style={{
            color: applicationColor.readColor1,
          }}
        >
          <input
            className="employee-search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            name={"searchTerm"}
            id="employee-search"
            style={{
              color: applicationColor.readColor1,
            }}
            // onKeyUpCapture={makingNetworkCallWithQuery}
          />

          <span>
            {" "}
            <Loader />
          </span>
        </div>

        <button className="btn-custom btn-custom-reset">Reset</button>
      </div>

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
            data={files || []}
            //   loadMoreRef={gettingMoreDataRef}
            //   getExtraDataType="getExtraEmployees"
            //   dataExist={dataExist}
          />
        </table>
      </div>
    </div>
  );
};

export default EmployeeFilesById;
