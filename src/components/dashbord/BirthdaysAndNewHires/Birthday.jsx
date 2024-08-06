import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { useThemeContext } from "../../Contexts/ThemesContext";
import Loader from "../../Loader/Loader";
import { useStateContext } from "../../Contexts/StateContext";
import Headers from "../../common/Header/Header";

const Birthday = ({
  data,
  heading,
  img,
  loadMoreRef,
  getMoreDataType,
  setrecentHire,
  setBirthdaysyyy,
}) => {
  const { applicationColor } = useThemeContext();
  const { loadingTerm, orgDetails, Birthdays } = useStateContext();

  return (
    <section
      className="lists"
      style={{
        color: applicationColor.readColor1,
      }}
    >
      <h5 className="heading">{heading}</h5>

      <section className="list-array">
        {Birthdays?.length > 0 ? (
          Birthdays.map((item, index) => {
            if (Birthdays.length === index + 1) {
              return (
                <section
                  className="list-card"
                  key={item.employee_id}
                  style={{
                    background: applicationColor.cardBg2,
                  }}
                  ref={loadMoreRef}
                >
                  <div className="person-data">
                    <div className="id_name">
                      <span>
                        <span className="name">
                          {item?.basic_info?.first_name}
                          <h6>Birthday Today........</h6>
                        </span>
                      </span>
                    </div>
                    <div
                      className="email"
                      style={{
                        color: applicationColor.readColor2,
                      }}
                    ></div>
                  </div>
                </section>
              );
            } else {
              return (
                <section
                  className="list-card"
                  key={item.employee_id}
                  style={{
                    background: applicationColor.cardBg2,
                  }}
                >
                  <div className="person-data">
                    <div className="id_name">
                      <span>
                        {/* {item?.employee_id} -{" "} */}
                        <span className="name">
                          {item?.basic_info?.first_name}
                          <h6>Birthday today..........</h6>
                        </span>
                      </span>
                    </div>
                    <div
                      className="email"
                      style={{
                        color: applicationColor.readColor2,
                      }}
                    >
                      {/* <span>{item.personal_details?.date_of_birth}</span> */}
                    </div>
                  </div>
                </section>
              );
            }
          })
        ) : (
          <div className="no-items">
            <img src={img} alt="" />
          </div>
        )}
      </section>
      <span>{loadingTerm === getMoreDataType ? <Loader /> : null}</span>
    </section>
  );
};

export default Birthday;
