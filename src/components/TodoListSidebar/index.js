import React, { useId } from "react";
import styles from "./index.module.css";


import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const TodoListSidebar = ({ taskList, onSelect, onToggle }) => {

  return (
    <div className={styles.sidebar}>
      <h1>ToDo List</h1>

      {taskList.map((list) => (
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

      <div className={styles.switch}>
        <Typography>Visibility of done task:</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Off</Typography>
          <Switch
            inputProps={{ "aria-label": "visibility" }}
            onChange={() => onToggle()}
          />
          <Typography>On</Typography>
        </Stack>
      </div>
    </div>
  );
};

export default TodoListSidebar;
