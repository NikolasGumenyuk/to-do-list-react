import React, { useId } from "react";
import styles from "./TodoListSidebar.module.css";
import { NavLink } from "react-router-dom";

const TodoListSidebar = ({ taskList, onSelect, onToggle }) => {

  return (
    <div className={styles.sidebar}>
      <h1>ToDo List</h1>

      {taskList&&taskList.map((list) => (
        <NavLink
        key={list.tasklist_id}
          to={`/todo-list/${list.tasklist_id}`}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          {list.title}
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
