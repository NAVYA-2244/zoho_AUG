import React from "react";
import "./EmployeeTodos.scss";
import { useThemeContext } from "../../Contexts/ThemesContext";

const EmployeeTodos = () => {
  const { applicationColor } = useThemeContext();
  const todos = [
    {
      todoId: 1,
      title: "finsish Dashboard",
      lastDate: "16-May",
    },
    {
      todoId: 2,
      title: "Finsish Profile",
      lastDate: "26-May",
    },
    {
      todoId: 3,
      title: "Finish Forms",
      lastDate: "23-May",
    },
    {
      todoId: 1,
      title: "finsish Dashboard",
      lastDate: "16-May",
    },
    {
      todoId: 2,
      title: "Finsish Profile",
      lastDate: "26-May",
    },
    {
      todoId: 3,
      title: "Finish Forms",
      lastDate: "23-May",
    },
    {
      todoId: 1,
      title: "finsish Dashboard",
      lastDate: "16-May",
    },
    {
      todoId: 2,
      title: "Finsish Profile",
      lastDate: "26-May",
    },
    {
      todoId: 3,
      title: "Finish Forms",
      lastDate: "23-May",
    },
    {
      todoId: 1,
      title: "finsish Dashboard",
      lastDate: "16-May",
    },
    {
      todoId: 2,
      title: "Finsish Profile",
      lastDate: "26-May",
    },
    {
      todoId: 3,
      title: "Finish Forms",
      lastDate: "23-May",
    },
  ];
  return (
    <section
      className="todo-list"
      style={{
        color: applicationColor.readColor1,
      }}
    >
      <h5 className="todos-heading heading">Todos</h5>
      <div className="employee-todos">
        {todos.map((item) => {
          return (
            <div
              className="todo"
              key={item.todoId}
              style={{
                background: applicationColor.cardBg2,
              }}
            >
              <section className="about-todo">
                <h6 className="todo-title">
                  Work :{" "}
                  <span style={{ color: applicationColor.readColor2 }}>
                    {item.title}
                  </span>
                </h6>
                <h6 className="todo-title">
                  Last Date :{" "}
                  <span style={{ color: applicationColor.readColor2 }}>
                    {item.lastDate}
                  </span>
                </h6>
              </section>

              <div className="todo-action">
                <button
                  style={{
                    color: applicationColor.readColor1,
                    background: applicationColor.tabColor,
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EmployeeTodos;
