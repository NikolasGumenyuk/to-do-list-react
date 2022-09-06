import React, { useState } from "react";
import styles from "./index.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import Chip from "@mui/material/Chip";

function Task({ task, onToggle, deleteTask, isChip }) {
  const [checked, setChecked] = useState(task.done);
  const [formattedDate, setFormatedDate] = useState(new Date(task.due_date));

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  function formatDate(date) {
    return `${date.getDate() < 10 ? "0" : ""}${date.getDate()}.${
      date.getMonth() < 10 ? "0" : ""
    }${date.getMonth()}.${date.getFullYear()}`;
  }

  function isWasted(date) {
    const today = new Date();

    if (date.getDate() === today.getDate()) {
      return false;
    } else if (date < today) {
      return true;
    }
    return false;
  }

  return (
    <li className={checked ? styles.done : styles.undone} key={task.task_id}>
      <div className={isWasted(formattedDate) ? styles.red : ""}>
        {task.due_date ? <CalendarTodayRoundedIcon /> : ""}
        {task.due_date ? formatDate(formattedDate) : ""}
      </div>
      <div className={styles.info}>
        <Checkbox
          checked={checked}
          onClick={() => onToggle(task.task_id)}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <div>
          <h4>{task.title}</h4>
          {task.description ? task.description : ""}
        </div>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => deleteTask(task.task_id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      {isChip ? (
        <div className={styles.chip}>
          <Chip
            key={task.tasklist.tasklist_id}
            label={task.tasklist.title}
            color="primary"
            component="a"
            href={`http://localhost:3000/todo-list/${task.tasklist.tasklist_id}`}
            clickable
          />
        </div>
      ) : (
        ""
      )}
    </li>
  );
}

export default Task;
