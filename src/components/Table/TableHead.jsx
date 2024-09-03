// import React, { useState } from "react";
// import TableBody from "./TableBody";
// import _ from "lodash";
// import { IoMdArrowDropup } from "react-icons/io";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import "./MainTable.scss";

// const TableHead = ({
//   tableHeadProperties,
//   data,
//   component,
//   loadMoreRef,
//   getExtraDataType,
// }) => {
//   const [sort, setSort] = useState({ property: null, direction: "asc" });
//   const { applicationColor } = useThemeContext();

//   // console.log({ tableHeadProperties });
//   const handleSorting = (property) => {
//     if (sort.property === property) {
//       setSort({
//         ...sort,
//         direction: sort.direction === "asc" ? "desc" : "asc",
//       });
//     } else {
//       setSort({ property, direction: "asc" });
//     }
//   };

//   const sortedData = _.orderBy(data, sort.property, sort.direction);

//   return (
//     <>
//       <thead
//         className="main-thead sticky-top"
//         style={{
//           background: applicationColor.tableHeadBg,
//           color: applicationColor.readColor1,
//         }}
//       >
//         <tr>
//           {tableHeadProperties.map((heading, index) => (
//             <th
//               style={{
//                 background: applicationColor.tableHeadBg,
//                 color: applicationColor.readColor1,
//               }}
//               key={index}
//               onClick={() => handleSorting && handleSorting(heading?.property)}
//             >
//               <div className="heading">
//                 <h6>{heading.name}</h6>
//                 {/* {console.log(heading.name, "poiuyghj")}
//                  */}
//                 <h6 className="icon">
//                   {heading.property &&
//                     (sort?.direction === "asc" ? (
//                       <IoMdArrowDropup />
//                     ) : (
//                       <IoMdArrowDropdown />
//                     ))}
//                 </h6>
//               </div>
//             </th>
//           ))}
//         </tr>
//       </thead>

//       <TableBody
//         tableHeadProperties={tableHeadProperties}
//         sortedData={sortedData}
//         component={component}
//         loadMoreRef={loadMoreRef}
//         getExtraDataType={getExtraDataType}
//       />
//     </>
//   );
// };

// export default TableHead;
import React, { useState } from "react";
import TableBody from "./TableBody";
import _ from "lodash";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { useThemeContext } from "../Contexts/ThemesContext";
import "./MainTable.scss";

const TableHead = ({
  tableHeadProperties,
  data,
  component,
  loadMoreRef,
  getExtraDataType,
}) => {
  const [sort, setSort] = useState({ property: null, direction: "asc" });
  const { applicationColor } = useThemeContext();

  const handleSorting = (property) => {
    if (sort.property === property) {
      setSort({
        ...sort,
        direction: sort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSort({ property, direction: "asc" });
    }
  };

  const sortedData = _.orderBy(data, sort.property, sort.direction);

  return (
    <>
      <thead
        className="main-thead sticky-top"
        style={{
          background: applicationColor.tableHeadBg,
          color: applicationColor.readColor1,
        }}
      >
        <tr>
          {tableHeadProperties.map((heading, index) => (
            <th
              style={{
                background: applicationColor.tableHeadBg,
                color: applicationColor.readColor1,
              }}
              key={index}
              onClick={() => handleSorting(heading?.property)}
            >
              <div className="heading">
                <h6>{heading.name}</h6>
                {heading.property === sort.property && (
                  <h6 className="icon">
                    {sort.direction === "asc" ? (
                      <IoMdArrowDropup />
                    ) : (
                      <IoMdArrowDropdown />
                    )}
                  </h6>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <TableBody
        tableHeadProperties={tableHeadProperties}
        sortedData={sortedData}
        component={component}
        loadMoreRef={loadMoreRef}
        getExtraDataType={getExtraDataType}
      />
    </>
  );
};

export default TableHead;
