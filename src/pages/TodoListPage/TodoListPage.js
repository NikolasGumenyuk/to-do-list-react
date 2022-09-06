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

const TodoListPage = () => {
  let { id } = useParams();
  const [open, setOpen] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [selectedList, setSelectedList] = useState(id);
  const [showDone, setShowDone] = useState(false);
  let tasks = allTasks.filter((task) => task.list_id === +selectedList);
  if (!showDone) {
    tasks = tasks.filter((task) => !task.done);
  }

  useEffect(() => {
    getAllTasksList().then(setTaskList);
    getAllTasks().then((response) => setAllTasks(response.data));
  }, []);

  useEffect(() => {
    setSelectedList(id);
  }, [id]);

  function toggleTask(id) {
    setAllTasks(
      allTasks.map((task) => {
        if (task.task_id === id) {
          task.done = !task.done;
          updateTaskOnServer(id, task.done).then(function (response) {
            setAllTasks(
              allTasks.map((task) => {
                if (task.task_id === response.data.task_id) {
                  task.done = !task.done;
                }
                return task;
              })
            );
          });
        }
        return task;
      })
    );
  }

  function deleteTask(id) {
    setAllTasks(allTasks.filter((task) => task.task_id !== id));
    deleteTask0nServer(id);
  }

  const handleSubmit = (updatedItem) => {
    addTaskOnServer({ ...updatedItem, ...{ done: false } }).then((response) =>
      setAllTasks((prev) => [...prev, response.data])
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
