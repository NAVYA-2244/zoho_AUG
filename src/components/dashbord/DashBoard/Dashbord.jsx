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

const Dashbord = () => {
  const { applicationColor } = useThemeContext(); //applicalion color to apply the colors based on white theme or dark theme

  // Below Just JSX and Reusable components
  return (
    <main className="main_content">
      {/* <Headers /> */}
      <section className="row-1">
        <div
          className="d_card"
          style={{ background: applicationColor.cardItem }}
        >
          <CheckIn />
        </div>

        <OnlyBirthDaysAndNewHires />

        <div
          className="d_card-2"
          style={{ background: applicationColor.cardItem }}
        >
          <EmployeeLeaveApplicationStatus />
        </div>

        {/* <div
          className="d_card d_card1"
          style={{ background: applicationColor.cardItem }}
        >
          <EmployeeTodos />
        </div> */}
        <div
          className="d_card-3 bar-card col-md-12"
          style={{ background: applicationColor.cardItem }}
        >
          <CustomBarChart />
        </div>
      </section>

      {/* <section className="row-2">
        
      </section> */}
    </main>
  );
};

export default Dashbord;

export const OnlyBirthDaysAndNewHires = () => {
  const [newHires, setNewHires] = useState([]);
  const [todayBirthdays, setTodayBirthdays] = useState([]);
  const { setLoading, loading, setLoadingTerm } = useStateContext();
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

  // This call back function will responsible to obeserve the last item in the todayBirthdays Array and make the network call based on some condtions
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
              // await fetchMoreData("getMoreBirthdayList",birthdaylistSkip,"birthdays",setTodayBirthdays,setBirthdayDataExist,5)
            }
            // toastOptions.success(birthdaylistSkip);
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

  //This funtion will make the network when the last item in   newHires list come into the view
  const fetchMoreNewHiresList = async () => {
    try {
      setLoading(true);
      setLoadingTerm("getMoreNewHires");
      const response = await makeNetworkCall(
        {
          employeesSearch: "",
          newHiresFilters: { skip: newHiresSkip * 5, limit: 5 },
        },
        "getOrgData1",
        "headers"
      );

      if (response.detail.newHires.length > 0) {
        setNewHires((prevList) => {
          return [...prevList, ...response.detail.newHires];
        });
      } else {
        setNewHiresExist(true);
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

  // This call back function will responsible to obeserve the last item in the newHires Array and make the network call based on some condtions
  const newHiresRef = useCallback(
    (node) => {
      if (loading) return;
      if (newHiresListObserver.current)
        newHiresListObserver.current.disconnect();
      newHiresListObserver.current = new IntersectionObserver(
        async (entries) => {
          if (
            entries[0].isIntersecting &&
            !newHiresExist &&
            newHires.length >= 5
          ) {
            setNewHiresSkip((prevSkip) => prevSkip + 1);
            if (newHiresSkip) {
              await fetchMoreNewHiresList();
            }
          }
        }
      );

      if (node) newHiresListObserver.current.observe(node);
    },
    [
      newHiresExist,
      newHires,
      setNewHires,
      newHiresSkip,
      loading,
      newHiresSkip,
      setNewHiresSkip,
    ]
  );

  return (
    <>
      <div className="d_card" style={{ background: applicationColor.cardItem }}>
        <BirthdaysAndNewHires
          data={todayBirthdays}
          heading={"Today Birthdays"}
          img={randomPic}
          loadMoreRef={birthdayListRef}
          getMoreDataType="getMoreBirthdayList"
        />
      </div>

      <div className="d_card" style={{ background: applicationColor.cardItem }}>
        <BirthdaysAndNewHires
          data={newHires}
          heading={"New Hires"}
          img={randomPic}
          loadMoreRef={newHiresRef}
          getMoreDataType="getMoreNewHires"
        />
      </div>
    </>
  );
};
