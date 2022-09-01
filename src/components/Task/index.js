import React, { useState } from "react";
import styles from "./index.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

function Task({ task, onToggle, deleteTask }) {
  const [checked, setChecked] = useState(task.done);
  const [formattedDate, setFormatedDate] = useState(new Date(task.due_date));

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  function formatDate(date) {
    return `${date.getDate() < 10 ? "0" : ""}${date.getDate()}.${date.getMonth() < 10 ? "0" : ""}${date.getMonth()}.${date.getFullYear()}`;
  }


  return (
    <li className={checked ? styles.done : styles.undone} key={task.task_id}>
      {task.due_date ? <CalendarTodayRoundedIcon /> : ""}
      {task.due_date ? formatDate(formattedDate) : ""}

      <Checkbox
        checked={checked}
        onClick={() => onToggle(task.task_id)}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <div>{task.title}</div>
      <IconButton
        aria-label="delete"
        color="error"
        onClick={() => deleteTask(task.task_id)}
      >
        <DeleteIcon />
      </IconButton>
    </li>
  );
}

export default Task;
