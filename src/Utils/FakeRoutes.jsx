import { settingTokens } from "../HttpServices/HttpService";
import { toast } from "react-hot-toast";
import { GrPerformance } from "react-icons/gr";
import { BsCalendar2EventFill } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { GrUserAdd } from "react-icons/gr";
import { GrUserSettings } from "react-icons/gr";
import { FaCalendar } from "react-icons/fa6";
import { RiImageCircleLine } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import { LuFolderClosed } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { AiOutlineFundProjectionScreen, AiOutlineHome } from "react-icons/ai";
import { FaTableList } from "react-icons/fa6";
import { GrCopy } from "react-icons/gr";
import { RiListCheck3 } from "react-icons/ri";
import { LuFileSpreadsheet } from "react-icons/lu";
import { TbMessageChatbot } from "react-icons/tb";

export const toastOptions = {
  success: (message) =>
    toast.success(message, {
      style: {
        color: "white",
        background: "#0D9276",
        minWidth: "150px",
        textTransform: "capitalize",
      },
      iconTheme: {
        primary: "white",
        secondary: "#0D9276",
      },
    }),

  error: (message) =>
    toast.error(message, {
      style: {
        color: "white",
        background: "#ff8080",
        minWidth: "150px",
        textTransform: "capitalize",
      },
      iconTheme: {
        primary: "white",
        secondary: "#D04848",
      },
    }),
};

//0
export const employeeSidebar = [
  {
    id: "admindashboard",
    icon: <AiOutlineHome />,
    label: "Dashboard",
    path: "/dashboard",
  },

  
  {
    id: "profile",
    // icon: <TiUserAddOutline />,
    icon: <GrUserAdd />,
    label: "Profile",
    path: "/profile",
  },
  // {
  //   id: "ApplyLeave",
  //   icon: <BsCalendar2EventFill />,
  //   label: "Apply Leave",
  //   path: "/applyleave",
  // },
  
  {
    id: "LeaveApplications",
    icon: <BsCalendar2EventFill />,
    label: "leave applications emp",
    path: "/leaveApplications",
  },
 
  {
    id: "Chat",
    icon: <TbMessageChatbot />,
    label: "Chat",
    path: "/employee/chat",
  },

  {
    id: "Projects",
    icon: <AiOutlineFundProjectionScreen />,
    label: "Projects",
    path: "/employee/projects",
  },
  {
    id: "tasks",
    // icon: <TiUserAddOutline />,
    icon: <GrUserAdd />,
    label: "TotalTask",
    path: "/employee/tasks",
  },
  {
    id: "folers",
    icon: <LuFolderClosed />,
    label: "ChangePassword",
    path: "/admin/ChangePassword",
  },
  {
    id: "Logout",
    icon: <VscSignOut />,
    label: "Logout",
    path: () => settingTokens.removingEmployeeToken(),
  },
];
export const superAdminSidebar = [
  {
    id: "admindashboard",
    icon: <AiOutlineHome />,
    label: "Dashboard",
    path: "/dashboard",
  },

 

  {
    id: "add_employeee",
    // icon: <TiUserAddOutline />,
    icon: <GrUserAdd />,
    label: "Add Employee",
    path: "/admin/add_employee",
  },
 
  {
    id: "employee_list",
    icon: <RiListCheck3 />,
    label: "Employee List",
    path: "/admin/employee_list",
  },
 
  {
    id: "leaves list",
    icon: <GrCopy />,
    label: "Leave Applications",
    path: "/admin/employee_leave-applications",
  },

  {
    id: "Controls",
    icon: <GrPerformance />,
    label: "Controls",
    children: [
      {
        id: "roles",
        icon: <GrUserSettings />,
        label: "Roles",
        path: "/admin/admin-controls/roles",
      },

    
      {
        id: "company",
        icon: <RiImageCircleLine />,
        label: "Company Logo",
        path: "/admin/company",
      },
      {
        id: "folers",
        icon: <LuFolderClosed />,
        label: "ChangePassword",
        path: "/admin/ChangePassword",
      },
      // {
      //   id: "Logout",
      //   icon: <VscSignOut />,
      //   label: "Logout",
      //   path: () => settingTokens.removingEmployeeToken(),
      // },
    ],
  },

  {
    id: "Chat",
    icon: <TbMessageChatbot />,
    label: "Chat",
    path: "/admin/chat",
  },

  {
    id: "Projects",
    icon: <AiOutlineFundProjectionScreen />,
    label: "Projects",
    path: "/admin/projects",
  },

  {
    id: "Logout",
    icon: <VscSignOut />,
    label: "Logout",
    path: () => settingTokens.removingEmployeeToken(),
  },
];

//3
export const teamLeadSidebar = [
  {
    id: "admindashboard",
    icon: <AiOutlineHome />,
    label: "Dashboard",
    path: "/dashboard",
  },

  
  {
    id: "profile",
    // icon: <TiUserAddOutline />,
    icon: <GrUserAdd />,
    label: "Profile",
    path: "/profile",
  },
 
 

  {
    id: "Chat",
    icon: <TbMessageChatbot />,
    label: "Chat",
    path: "/employee/chat",
  },

  {
    id: "Projects",
    icon: <AiOutlineFundProjectionScreen />,
    label: "Projects",
    path: "/employee/projects",
  },
  {
    id: "tasks",
    // icon: <TiUserAddOutline />,
    icon: <GrUserAdd />,
    label: "TotalTask",
    path: "/employee/tasks",
  },
  {
    id: "folers",
    icon: <LuFolderClosed />,
    label: "ChangePassword",
    path: "/admin/ChangePassword",
  },
  {
    id: "Logout",
    icon: <VscSignOut />,
    label: "Logout",
    path: () => settingTokens.removingEmployeeToken(),
  },
];

//2
export const mangerSidebar = [
  {
    id: "dashboard",
    icon: <AiOutlineHome />,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: "Profile",
    // icon: <CiUser />,
    icon: <FaUser />,

    label: "profile",
    path: "/profile",
  },
  {
    id: "Chat",
    icon: <TbMessageChatbot />,
    label: "Chat",
    path: "/admin/chat",
  },

  {
    id: "Projects",
    icon: <AiOutlineFundProjectionScreen />,
    label: "Projects",
    path: "/admin/projects",
  },
  {
    id: "tasks",
    // icon: <TiUserAddOutline />,
    icon: <GrUserAdd />,
    label: "TotalTask",
    path: "/admin/tasks",
  },
  {
    id: "ApplyLeave",
    icon: <BsCalendar2EventFill />,
    label: "Apply Leave",
    path: "/applyleave",
  },
  
  {
    id: "LeaveApplications",
    icon: <BsCalendar2EventFill />,
    label: "leave applications  emp",
    path: "/leaveApplications",
  },

  // {
  //   id: "attendanceTabularView",
  //   label: "Tabular View",
  //   icon: <FaTableList />,
  //   path: "/employee/attandance_table",
  // },

  // {
  //   id: "attendanceListView",
  //   icon: <FaCalendar />,
  //   label: "Calendar View",
  //   path: "/attendance/list-view",
  // },
  // {
  //   id: "add_employeee",
  //   // icon: <TiUserAddOutline />,
  //   icon: <GrUserAdd />,
  //   label: "Add Employee",
  //   path: "/admin/add_employee",
  // },

  // {
  //   id: "employee_list",
  //   icon: <RiListCheck3 />,
  //   label: "Employee List",
  //   path: "/admin/employee_list",
  // },
  // {
  //   id: "leaves list",
  //   icon: <GrCopy />,
  //   label: "Leave Applications",

  //   path: "/admin/employee_leave-applications",
  // },

  // {
  //   id: "folers",
  //   icon: <LuFolderClosed />,
  //   label: "Folders",
  //   path: "/employee/folders",
  // },

  // {
  //   id: "Management",
  //   icon: <RiTeamFill />,
  //   label: "Management",
  //   path: "/admin/management",
  //   children: [
  //     {
  //       id: "addNewProject",
  //       icon: <SiSaltproject />, // Add appropriate icon
  //       label: "Add New Project",
  //       path: "/admin/management/addNewProject", // Add appropriate path
  //     },
  //     {
  //       id: "projects",
  //       icon: <AiFillProject />,
  //       label: "Projects",
  //       path: "/admin/management/projects",
  //     },
  //   ],
  // },
  {
    id: "folers",
    icon: <LuFolderClosed />,
    label: "ChangePassword",
    path: "/admin/ChangePassword",
  },
  {
    id: "Logout",
    icon: <VscSignOut />,
    label: "Logout",
    path: () => settingTokens.removingEmployeeToken(),
  },
];
//1

