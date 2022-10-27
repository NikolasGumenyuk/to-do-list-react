import React, { useId } from "react";
import styles from "./TodoListSidebar.module.css";
import { NavLink } from "react-router-dom";

const TodoListSidebar = ({ taskList, dashboard }) => {

  return (
    <div className={styles.sidebar}>
      <h1>ToDo List</h1>
      <p>Today: {dashboard.today}</p>
      {dashboard.lists&&dashboard.lists.map((list) => (
        <NavLink
        key={list.tasklist_id}
          to={`/todo-list/${list.tasklist_id}`}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          {list.title}
          ({list.undone})
        </NavLink>
      ))}

      <NavLink
        to="/today"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        {"Today"}
      </NavLink>
    </div>
  );
};

export default TodoListSidebar;
