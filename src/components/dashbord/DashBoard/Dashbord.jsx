import React, { useCallback, useEffect, useRef, useState } from "react";
import CheckIn from "../CheckIn/CheckIn";
import { Navigate } from "react-router";
// import "./Dashboard.scss";
import { useLocation } from "react-router";
import TodayBirthdays from "../BirthdaysAndNewHires/BirthdaysAndNewHires";
import BirthdaysAndNewHires from "../BirthdaysAndNewHires/BirthdaysAndNewHires";
import { useStateContext } from "../../Contexts/StateContext";
import randomPic from "../../../assets/Dashboard/cg-1.png";
import EmployeeLeaveApplicationStatus from "../ApplyLeave/EmployeeLeaveApplicationsStatus/EmployeeLeaveApplicationStatus";
import CustomBarChart from "../../EmployeeRoutes/EmployeeWeeklyAttendanceBargraph/EmployeeWeeklyAttendanceBargraph";
import { useThemeContext } from "../../Contexts/ThemesContext";
import EmployeeTodos from "../EmployeeTodos/EmployeeTodos";
import { makeNetworkCall } from "../../../HttpServices/HttpService";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import Birthday from "../BirthdaysAndNewHires/Birthday";
import Dashbordstats from "./Dashbordstats";
import Companydetails from "../../AdminRoutes/Companydetails/Companydetails";

const Dashbord = () => {
  const { employeeDetails, setOrgLogo, orgDetails } = useStateContext();
  const { applicationColor } = useThemeContext(); //applicalion color to apply the colors based on white theme or dark theme
  // Below Just JSX and Reusable components
  return (
    //     <main className="main_content">
    //        {employeeDetails.admin_type === "1" && employeeDetails.organisation_id.lenght >=9 ?
    //        <Companydetails/> :

    //       <section className="">

    //         <OnlyBirthDaysAndNewHires />

    //         <div
    //           className="d_card-3 bar-card col-md-12"
    //           style={{ background: applicationColor.cardItem }}
    //         >
    //           <CustomBarChart />
    //         </div>
    //       </section>
    //  }

    //     </main>
    <main className="main_content">
      {employeeDetails.admin_type === "1" &&
      employeeDetails.organisation_id.length < 9 ? (
        <Companydetails />
      ) : (
        <section className="row">
          <OnlyBirthDaysAndNewHires />
          <div
            className="d_card-3 bar-card col-md-12"
            style={{ background: applicationColor.cardItem }}
          >
            <CustomBarChart />
          </div>
        </section>
      )}
    </main>
  );
};

export default Dashbord;

export const OnlyBirthDaysAndNewHires = () => {
  const [newHires, setNewHires] = useState([]);
  const [todayBirthdays, setTodayBirthdays] = useState([]);
  const {
    setLoading,
    loading,
    setLoadingTerm,
    setrecentHire,
    Birthdays,
    recentHire,
    stats,
    setStats,
  } = useStateContext();
  const { fetchMoreData } = useFunctionContext();
  const { applicationColor } = useThemeContext();
  const birthdayListObserver = useRef();
  const [birthdaylistSkip, setBirthdayListSkip] = useState(0);
  const [birthdaysDataExist, setBirthdayDataExist] = useState(false);
  const newHiresListObserver = useRef(null);
  const [newHiresSkip, setNewHiresSkip] = useState(0);
  const [newHiresExist, setNewHiresExist] = useState(false);

  const fetchMoreBirthdaysList = async () => {
    try {
      setLoading(true);
      setLoadingTerm("getMoreBirthdayList");
      const response = await makeNetworkCall(
        {
          employeesSearch: "",
          birthdaysFilters: { skip: birthdaylistSkip * 5, limit: 5 },
        },
        "getOrgData1",
        "headers"
      );

      if (response.detail.birthdays.length > 0) {
        setTodayBirthdays((prevList) => {
          return [...prevList, ...response.detail.birthdays];
        });
      } else {
        setBirthdayDataExist(true);
      }

      setLoading(false);
      setLoadingTerm("");
    } catch (error) {
      setLoading(false);
      setLoadingTerm("");
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };
  const birthdayListRef = useCallback(
    (node) => {
      if (loading) return;
      if (birthdayListObserver.current)
        birthdayListObserver.current.disconnect();
      birthdayListObserver.current = new IntersectionObserver(
        async (entries) => {
          if (
            entries[0].isIntersecting &&
            !birthdaysDataExist &&
            todayBirthdays.length >= 5
          ) {
            setBirthdayListSkip((prevSkip) => prevSkip + 1);
            if (birthdaylistSkip) {
              await fetchMoreBirthdaysList();
              await fetchMoreData(
                "getMoreBirthdayList",
                birthdaylistSkip,
                "birthdays",
                setTodayBirthdays,
                setBirthdayDataExist,
                5
              );
            }
            toastOptions.success(birthdaylistSkip);
          }
        }
      );

      if (node) birthdayListObserver.current.observe(node);
    },
    [
      loading,
      todayBirthdays,
      setTodayBirthdays,
      birthdaysDataExist,
      birthdaylistSkip,
      setBirthdayListSkip,
    ]
  );
  return (
    <>
      <div className="col-lg-4">
        <div
          className="d_card"
          style={{ background: applicationColor.cardItem }}
        >
          <Birthday
            img={randomPic}
            data={todayBirthdays}
            loadMoreRef={birthdayListRef}
            getMoreDataType="getMoreBirthdayList"
            heading={"Today Birthdays"}
          />
        </div>
      </div>
      <div className="col-lg-4">
        <div
          className="d_card new-hires-card"
          style={{ background: applicationColor.cardItem }}
        >
          <BirthdaysAndNewHires
            data={newHires}
            heading={"New Hires"}
            img={randomPic}
            // loadMoreRef={newHiresRef}
            getMoreDataType="getMoreNewHires"
          />
        </div>
      </div>
      <div className="col-lg-4">
        <div
          className="d_card new-hires-card"
          style={{ background: applicationColor.cardItem }}
        >
          <Dashbordstats
            data={stats}
            heading={"Daily Tasks"}
            img={randomPic}
            // loadMoreRef={newHiresRef}
            getMoreDataType="getMoreNewHires"
          />
        </div>
      </div>
    </>
  );
};
