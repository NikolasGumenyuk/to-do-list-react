import React, { useId } from "react";
import styles from "./index.module.css";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const TodoListSidebar = ({ taskList, onSelect, reset }) => {
  const [view, setView] = React.useState("list");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  return (
    <div className={styles.sidebar}>
      <h1>ToDo List</h1>

      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        value={view}
        onChange={handleChange}
      >
        {taskList.map((list) => (
          <ToggleButton
            key={list.tasklist_id}
            onClick={() => onSelect(list.tasklist_id)}
          >
            {list.title}
          </ToggleButton>
        ))}
        <ToggleButton key={useId} onClick={() => reset()}>
          All task
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default TodoListSidebar;
