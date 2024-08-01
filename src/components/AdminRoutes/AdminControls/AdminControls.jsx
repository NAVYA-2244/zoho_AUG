import React from "react";
import "./AdminControls.scss";
import Roles from "./RolesTable/Depatment_Roles_Designations/Roles";
import AdminSettingOrgWorkingDays, {
  AdminLoginLeaveDisableEnable,
} from "./AdminSettingOrgWorkingDays/AdminSettingOrgWorkingDays";
import { useStateContext } from "../../Contexts/StateContext";
import Loader from "../../Loader/Loader";

const AdminControls = () => {

  return (
    <main>
      {/* {Object.keys(adminData1).length <= 0 ||
      Object.keys(orgData2).length <= 0 ? (
        <Loader />
      ) : ( */}
      <>
        <section>
          <Roles />
        </section>

        {/* <section className="workdays-controls">
          <div>
            <AdminSettingOrgWorkingDays />
          </div>

          <div>
            <AdminLoginLeaveDisableEnable />
          </div>
        </section> */}
      </>
      {/* )} */}
    </main>
  );
};

export default AdminControls;
