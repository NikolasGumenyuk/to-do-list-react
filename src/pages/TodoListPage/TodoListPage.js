import React, { useEffect, useState } from "react";
import styles from "./TodoListPage.module.css";
import Task from "../../components/Task/Task";
import BasicModal from "../../components/Modal/Modal";
import AddForm from "../../components/AddForm/AddForm";
import { useParams } from "react-router-dom";
import {
  getAllTasks,
  getAllTasksList,
  deleteTask0nServer,
  addTaskOnServer,
  updateTaskOnServer,
} from "../../services/RequestApi";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

 
const TodoListPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const tasksR = useSelector((state) => state.tasks.tasks);

  const [open, setOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [selectedList, setSelectedList] = useState(id);
  const [showDone, setShowDone] = useState(false);
  let tasks = tasksR.filter((task) => task.list_id === +selectedList);
  if (!showDone) {
    tasks = tasks.filter((task) => !task.done);
  }

  useEffect(() => {
    getAllTasksList().then(setTaskList);
    getAllTasks().then((response) => dispatch({type: "LOAD_TASKS", payload: response.data}));
  }, []);

  useEffect(() => {
    setSelectedList(id);
  }, [id]);

  function toggleTask(task) {
    dispatch({type:"UPDATE_TASK", payload: task})
    updateTaskOnServer(task.task_id, task.done)
  }

  function deleteTask(id) {
    dispatch({type: "DELETE_TASK", payload: id})
    deleteTask0nServer(id);
  }

  const handleSubmit = (updatedItem) => {
    addTaskOnServer({ ...updatedItem, ...{ done: false } }).then((response) =>
    dispatch({type: "ADD_TASKS", payload: response.data})
    );
    setOpen(false);
  };

  return (
    <div>
      <div className={styles.switch}>
        <Typography>Visibility of done task:</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Off</Typography>
          <Switch
            inputProps={{ "aria-label": "visibility" }}
            onChange={() => setShowDone((prev) => !prev)}
          />
          <Typography>On</Typography>
        </Stack>
      </div>
      <ul className={styles.tasks}>
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.task_id}
            onToggle={toggleTask}
            deleteTask={deleteTask}
            isChip={false}
          />
        ))}
      </ul>
      <div className={styles.addTaskButton}>
        <BasicModal
          handleOpen={() => setOpen(true)}
          handleClose={() => setOpen(false)}
          open={open}
        >
          <AddForm onSubmit={handleSubmit} taskList={taskList} />
        </BasicModal>
      </div>
    </div>
  );
};

export default TodoListPage;
