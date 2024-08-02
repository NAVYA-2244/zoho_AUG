import AuthenticatedRoute, {
  EmployeeRoute,
  IsManagerRoute,
  IsSuperAdminRoute,
  IsTeamLeadRoute,
} from "../HOC_protectingRoutes/ProtectedRoute";
import AppLayout from "../Layout";
import AddEmployee from "../components/AdminRoutes/AddEmployee/AddEmployee";
import AdminDashboard from "../components/AdminRoutes/AdminDashboard/AdminDashboard";

import AdminSingleEmployeeData from "../components/AdminRoutes/AdminFetchingSingleEmployeeData/AdminSingleEmployeeData";
import AdminAcceptedEmployeeLeavesApplications from "../components/AdminRoutes/EmployeeLeaveApplications/AdminAcceptedEmployeeLeavesApplications";
import EmployeeList from "../components/AdminRoutes/EmployeeList/EmployeeList";
import AdminQueryData from "../components/AdminRoutes/QueryData/AdminQueryData";

import UpdateEmployee from "../components/AdminRoutes/UpdateEmployee/UpdateEmployee";
import EmployeeAttendanceCalendar from "../components/EmployeeRoutes/EmployeeAttendanceCalender/EmployeeAttendanceCalander";
import EmployeeAttendanceTable from "../components/EmployeeRoutes/EmployeeAttendanceTable/EmployeeAttendanceTable";
import EmployeeProfile from "../components/EmployeeRoutes/Employeeprofile/EmployeeProfile";
import EmployeeProfileUpdate from "../components/EmployeeRoutes/ProfileUpdate/EmployeeProfileUpdate";
import ApplyLeave from "../components/dashbord/ApplyLeave/ApplyLeave";
import Dashboard from "../components/dashbord/DashBoard/Dashbord";
import AdminControls from "../components/AdminRoutes/AdminControls/AdminControls";
import TodaysEmployeesAttendance from "../components/AdminRoutes/TodaysEmployeesAttendance/TodaysEmployeesAttendance";
import NewLogin from "../components/Login/Register/NewLogin";
import NewForgotPassword from "../components/Login/Register/NewForgotPassword";
import Folders from "../components/Folders/Folders";
import FilesByFolderId from "../components/Folders/FilesByFolderId/FilesByFolderId";
import EmployeeFilesById from "../components/Folders/EmployeeFilesById/EmployeeFilesById";
import EmployeeAttendance from "../components/EmployeeRoutes/EmployeeAttendance/EmployeeAttendance";
import EmployeeLeavesSelecteId from "../components/dashbord/ApplyLeave/EmployeeLeavesSelecteId";
import ApplyLeaveForm from "../components/dashbord/ApplyLeave/ApplyleaveForm";
import Chat from "../components/AdminRoutes/chat/Chat";
import Register from "../components/Logins/EmployeeLoginPage/Register";
import LocationForm from "../components/OrganisationRoutes/LocationForm/LocationForm";
import Projects from "../components/Projects/Projects";
import ShiftDetailsForm from "../components/AdminRoutes/AdminControls/RolesTable/Depatment_Roles_Designations/ShiftDetailsForm";
import Companydetails from "../components/AdminRoutes/Companydetails/Companydetails.jsx";
// import ShiftDetailsForm from "../components/AdminRoutes/AdminControls/RolesTable/Depatment_Roles_Designations/ShiftDetailsForm";
import LeavesSettings from "./../components/AdminRoutes/AdminControls/RolesTable/Depatment_Roles_Designations/LeavesSettings";
import AdminControlesUserDetails from "./../components/AdminRoutes/AdminControls/AdminControlesUserDetails";
import LoginForm from "../components/Logins/EmployeeLoginPage/LoginForm.jsx";

// AdminType "0" //Team member or normal employee
export const isEmployeeRouter = [
  {
    path: "",
    element: (
      <AuthenticatedRoute>
        <AppLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: "/dashboard",

        element: (
          <EmployeeRoute>
            <Dashboard />
          </EmployeeRoute>
        ),
      },
      {
        path: "/",
        element: (
          <EmployeeRoute>
            <Dashboard />
          </EmployeeRoute>
        ),
      },
      {
        path: "/applyleavefrom",
        element: (
          <EmployeeRoute>
            <ApplyLeaveForm />
          </EmployeeRoute>
        ),
      },
      {
        path: "/employee/attandance_table",
        element: (
          <EmployeeRoute>
            <EmployeeAttendanceTable />
          </EmployeeRoute>
        ),
      },
      {
        path: "/employee/attendance",
        element: (
          <EmployeeRoute>
            <EmployeeAttendance />
          </EmployeeRoute>
        ),
      },

      {
        path: "/profile",
        element: (
          <EmployeeRoute>
            <EmployeeProfile />
          </EmployeeRoute>
        ),
      },

      {
        path: "/profile_update",
        element: (
          <EmployeeRoute>
            <EmployeeProfileUpdate />
          </EmployeeRoute>
        ),
      },
      {
        path: "/applyleave",
        element: (
          <EmployeeRoute>
            <ApplyLeave />
          </EmployeeRoute>
        ),
      },
      {
        path: "/leaveApplications",
        element: (
          <EmployeeRoute>
            <EmployeeLeavesSelecteId />
          </EmployeeRoute>
        ),
      },
      {
        path: "/attendance/list-view",
        element: (
          <EmployeeRoute>
            <EmployeeAttendanceCalendar />
          </EmployeeRoute>
        ),
      },
      {
        path: "/employee/folders",
        element: (
          <EmployeeRoute>
            <Folders />
          </EmployeeRoute>
        ),
      },
      {
        path: "/employee/folders/:folderName/:folderId",
        element: (
          <EmployeeRoute>
            <EmployeeFilesById />
          </EmployeeRoute>
        ),
      },
    ],
  },

  // {
  //   path: "/login",
  //   element: <Login />,
  // },

  // {
  //   path: "/login",
  //   element: <NewLogin />,
  // },
  {
    path: "/loginForm",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/resetpassword",
    element: <NewForgotPassword />,
  },

  {
    path: "/logout",
    element: <Dashboard />,
  },

  {
    path: "*",
    element: (
      <>
        <div className="text-center">
          <h3 className="mt-5 text-default-color">Page was not Found...😫</h3>
        </div>
      </>
    ),
  },
];

// Admintype "1" super admin
export const isSuperAdminRouter = [
  {
    path: "",
    element: (
      <AuthenticatedRoute>
        <AppLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: "/dashboard",

        element: (
          <IsSuperAdminRoute>
            <Dashboard />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <IsSuperAdminRoute>
            <AdminDashboard />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/location",
        element: (
          <IsSuperAdminRoute>
            <LocationForm />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/admincontrolesuser",
        element: (
          <IsSuperAdminRoute>
            <AdminControlesUserDetails />
          </IsSuperAdminRoute>
        ),
      },

      // {
      //   path: "/admin/:query",
      //   element: (
      //     <IsSuperAdminRoute>
      //       <AdminQueryData />
      //     </IsSuperAdminRoute>
      //   ),
      // },

      {
        path: "/",
        element: (
          <IsSuperAdminRoute>
            <AdminDashboard />
          </IsSuperAdminRoute>
        ),
      },

      {
        path: "/admin/today_employees_attendance",
        element: (
          <IsSuperAdminRoute>
            <TodaysEmployeesAttendance />
          </IsSuperAdminRoute>
        ),
      },

      {
        path: "/admin/employee/attendance",
        element: (
          <IsSuperAdminRoute>
            <EmployeeAttendance />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/admin/add_employee",
        element: (
          <IsSuperAdminRoute>
            <AddEmployee />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/admin/profile",
        element: (
          <IsSuperAdminRoute>
            <EmployeeProfile />
            {/* < /> */}
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/profile_Edit",
        element: (
          <IsSuperAdminRoute>
            <SingleEmployeeProfileEdit />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/admin/employee_list",
        element: (
          <IsSuperAdminRoute>
            <EmployeeList />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/admin/update_employee/:employeId",
        element: (
          <IsSuperAdminRoute>
            <UpdateEmployee />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/admin/admin-controls/roles",
        element: (
          <IsSuperAdminRoute>
            <AdminControls />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/admin/employee/:id",
        element: (
          <IsSuperAdminRoute>
            <AdminSingleEmployeeData />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/admin/folders",
        element: (
          <IsSuperAdminRoute>
            <Folders />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/admin/employee_leave-applications",
        element: (
          <IsSuperAdminRoute>
            <AdminAcceptedEmployeeLeavesApplications />
          </IsSuperAdminRoute>
        ),
      },

      {
        path: "/applyleavefrom",
        element: (
          <isSuperAdminRouter>
            <ApplyLeaveForm />
          </isSuperAdminRouter>
        ),
      },
      {
        path: "/leaveApplications",
        element: (
          <IsManagerRoute>
            <EmployeeLeavesSelecteId />
          </IsManagerRoute>
        ),
      },
      {
        path: "/admin/chat",
        element: (
          <isSuperAdminRouter>
            <Chat />
          </isSuperAdminRouter>
        ),
      },
      {
        path: "/admin/projects",
        element: (
          <isSuperAdminRouter>
            <Projects />
          </isSuperAdminRouter>
        ),
      },
      {
        path: "/admin/folders",
        element: (
          <IsSuperAdminRoute>
            <Folders />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/admin/folders/:folder/:folderId",
        element: (
          <IsSuperAdminRoute>
            <FilesByFolderId />
          </IsSuperAdminRoute>
        ),
      },

      {
        path: "/admin/company",
        element: (
          <IsSuperAdminRoute>
            <Companydetails />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/ShiftDetailsForm",
        element: (
          <IsSuperAdminRoute>
            <ShiftDetailsForm />
          </IsSuperAdminRoute>
        ),
      },
      {
        path: "/leaves_settings",
        element: (
          <IsSuperAdminRoute>
            <LeavesSettings />
          </IsSuperAdminRoute>
        ),
      },
    ],
  },

  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  {
    path: "/loginForm",
    element: <LoginForm />,
  },
  {
    path: "/login",
    element: <NewLogin />,
  },

  {
    path: "/resetpassword",
    element: <NewForgotPassword />,
  },

  {
    path: "*",
    element: (
      <>
        <div className="text-center">
          <h3 className="mt-5 text-default-color">Page was not Found...😫</h3>
        </div>
      </>
    ),
  },
];

// Admintype "2"
export const isManagerRouter = [
  {
    path: "",
    element: (
      <AuthenticatedRoute>
        <AppLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: "/dashboard",

        element: (
          <IsManagerRoute>
            <Dashboard />
          </IsManagerRoute>
        ),
      },

      {
        path: "/",
        element: (
          <IsManagerRoute>
            <Dashboard />
          </IsManagerRoute>
        ),
      },
      {
        path: "/employee/attandance_table",
        element: (
          <IsManagerRoute>
            <EmployeeAttendanceTable />
          </IsManagerRoute>
        ),
      },
      {
        path: "/leaveApplications",
        element: (
          <IsManagerRoute>
            <EmployeeLeavesSelecteId />
          </IsManagerRoute>
        ),
      },
      {
        path: "/applyleavefrom",
        element: (
          <isManagerRouter>
            <ApplyLeaveForm />
          </isManagerRouter>
        ),
      },
      {
        path: "/profile",
        element: (
          <IsManagerRoute>
            <EmployeeProfile />
          </IsManagerRoute>
        ),
      },
      {
        path: "/profile_update",
        element: (
          <IsManagerRoute>
            <EmployeeProfileUpdate />
          </IsManagerRoute>
        ),
      },
      {
        path: "/applyleave",
        element: (
          <IsManagerRoute>
            <ApplyLeave />
          </IsManagerRoute>
        ),
      },

      {
        path: "/admin/add_employee",
        element: (
          <IsManagerRoute>
            <AddEmployee />
          </IsManagerRoute>
        ),
      },

      {
        path: "/attendance/list-view",
        element: (
          <IsManagerRoute>
            <EmployeeAttendanceCalendar />
          </IsManagerRoute>
        ),
      },
      {
        path: "/admin/employee_leave-applications",
        element: (
          <IsManagerRoute>
            <AdminAcceptedEmployeeLeavesApplications />
          </IsManagerRoute>
        ),
      },

      {
        path: "/admin/employee_list",
        element: (
          <IsManagerRoute>
            <EmployeeList />
          </IsManagerRoute>
        ),
      },
      {
        path: "/employee/folders",
        element: (
          <IsManagerRoute>
            <Folders />
          </IsManagerRoute>
        ),
      },

      {
        path: "/employee/folders/:folderName/:folderId",
        element: (
          <IsManagerRoute>
            <EmployeeFilesById />
          </IsManagerRoute>
        ),
      },
      {
        path: "/admin/update_employee/:employeId",
        element: (
          <IsManagerRoute>
            <UpdateEmployee />
          </IsManagerRoute>
        ),
      },

      {
        path: "/admin/employee/:id",
        element: (
          <IsManagerRoute>
            <AdminSingleEmployeeData />
          </IsManagerRoute>
        ),
      },

      {
        path: "/admin/employee_leave-applications",
        element: (
          <IsManagerRoute>
            <AdminAcceptedEmployeeLeavesApplications />
          </IsManagerRoute>
        ),
      },
    ],
  },

  // {
  //   path: "/login",
  //   element: <Login />,
  // },

  {
    path: "/login",
    element: <NewLogin />,
  },

  {
    path: "/resetpassword",
    element: <NewForgotPassword />,
  },

  {
    path: "*",
    element: (
      <>
        <div className="text-center">
          <h3 className="mt-5 text-default-color">Page was not Found...😫</h3>
        </div>
      </>
    ),
  },
];

// admin type "3" //teamlead orincharge
export const isTeamLeadRouter = [
  {
    path: "",
    element: (
      <AuthenticatedRoute>
        <AppLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <IsTeamLeadRoute>
            <Dashboard />
          </IsTeamLeadRoute>
        ),
      },
      {
        path: "/",
        element: (
          <IsTeamLeadRoute>
            <Dashboard />
          </IsTeamLeadRoute>
        ),
      },
      {
        path: "/employee/attandance_table",
        element: (
          <IsTeamLeadRoute>
            <EmployeeAttendanceTable />
          </IsTeamLeadRoute>
        ),
      },

      {
        path: "/profile",
        element: (
          <IsTeamLeadRoute>
            <EmployeeProfile />
          </IsTeamLeadRoute>
        ),
      },
      {
        path: "/profile_update",
        element: (
          <IsTeamLeadRoute>
            <EmployeeProfileUpdate />
          </IsTeamLeadRoute>
        ),
      },
      {
        path: "/applyleave",
        element: (
          <IsTeamLeadRoute>
            <ApplyLeave />
          </IsTeamLeadRoute>
        ),
      },

      {
        path: "/applyleavefrom",
        element: (
          <isTeamLeadRouter>
            <ApplyLeaveForm />
          </isTeamLeadRouter>
        ),
      },
      {
        path: "/leaveApplications",
        element: (
          <IsManagerRoute>
            <EmployeeLeavesSelecteId />
          </IsManagerRoute>
        ),
      },
      {
        path: "/attendance/list-view",
        element: (
          <IsTeamLeadRoute>
            <EmployeeAttendanceCalendar />
          </IsTeamLeadRoute>
        ),
      },
      {
        path: "/admin/employee_leave-applications",
        element: (
          <IsTeamLeadRoute>
            <AdminAcceptedEmployeeLeavesApplications />
          </IsTeamLeadRoute>
        ),
      },
      {
        path: "/employee/folders",
        element: (
          <IsTeamLeadRoute>
            <Folders />
          </IsTeamLeadRoute>
        ),
      },
      {
        path: "/employee/folders/:folderName/:folderId",
        element: (
          <IsTeamLeadRoute>
            <EmployeeFilesById />
          </IsTeamLeadRoute>
        ),
      },
    ],
  },

  // {
  //   path: "/login",
  //   element: <Login />,
  // },

  {
    path: "/login",
    element: <NewLogin />,
  },

  {
    path: "/resetpassword",
    element: <NewForgotPassword />,
  },

  {
    path: "*",
    element: (
      <>
        <div className="text-center">
          <h3 className="mt-5 text-default-color">Page was not Found...😫</h3>
        </div>
      </>
    ),
  },
];
