import React, { useId } from "react";
import styles from "./index.module.css";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const TodoListSidebar = ({ taskList, onSelect, onToggle }) => {
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
            value={list.title}
            key={list.tasklist_id}
            onClick={() => onSelect(list.tasklist_id)}
          >
            {list.title}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div className={styles.switch}>
        <Typography>Visibility of done task:</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Off</Typography>
          <Switch inputProps={{ "aria-label": "visibility" }} onChange={() => onToggle()}/>
          <Typography>On</Typography>
        </Stack>
      </div>
    </div>
  );
};

export default TodoListSidebar;
