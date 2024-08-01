import React, { useEffect, useState } from "react";
import { useStateContext } from "../Contexts/StateContext";
import { PiFoldersFill } from "react-icons/pi";
import "./Folders.scss";
import { useThemeContext } from "../Contexts/ThemesContext";
import { useNavigate } from "react-router";

const Folders = () => {
  // const {folders} = usetat
  const { setCurrentPageName, employeeDetails } = useStateContext();
  const { applicationColor } = useThemeContext();
  const navigate = useNavigate();
  const [access, setAccsess] = useState(false);

  useEffect(() => {
    if (employeeDetails.adminType === "1") {
      setAccsess(true);
    } else {
      setAccsess(false);
    }
  }, [employeeDetails]);

  const handleNavigation = (folderName, folderId) => {
    setCurrentPageName(`${folderName}`);
    access
      ? navigate(`/admin/folders/${folderName}/${folderId}`)
      : navigate(`/employee/folders/${folderName}/${folderId}`);
  };

  return (
    <main className="folders" style={{ background: applicationColor.cardItem }}>
      {/* <h1>Hello</h1> */}
      <section className="all-folders">
        {[].map((folder, index) => {
          return (
            <div
              key={folder?.folderId}
              className="folder"
              onClick={() =>
                handleNavigation(folder.folderName, folder.folderId)
              }
            >
              <h2
                className="folder-icon"
                style={{ color: applicationColor.buttonColor }}
              >
                <PiFoldersFill />
              </h2>
              <h6
                className="folder-name"
                style={{ color: applicationColor.readColor1 }}
              >
                {folder.folderName}
              </h6>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Folders;
