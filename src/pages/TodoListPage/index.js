import React, { useEffect, useState } from "react";
import "./index.module.css";
import Task from "../../components/Task";
import TodoListSidebar from "../../components/TodoListSidebar";
import BasicModal from "../../components/Modal";
import AddForm from "../../components/AddForm";
import { useParams } from "react-router-dom";
import axios from "axios";

const TodoListPage = () => {
  let {id} = useParams()
  const [open, setOpen] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [selectedList, setSelectedList] = useState(id);
  const [showDone, setShowDone] = useState(false);
  let tasks = allTasks.filter((task) => task.list_id === +selectedList);
  if (!showDone) {
    tasks = tasks.filter((task) => !task.done);
  }

  // console.log(selectedList);
  // console.log(tasks);
  // console.log(allTasks);

  async function getTasks() {
    try {
      const response = await axios.get("http://localhost:4000/task");
      setAllTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getTasksList() {
    try {
      const response = await axios.get("http://localhost:4000/tasklist");
      setTaskList(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTask0nServer(id) {
    try {
      const response = await axios.delete(`http://localhost:4000/task/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  async function addTaskOnServer(task) {
    await axios
      .post("http://localhost:4000/task", task)
      .then(function (response) {
        setAllTasks((prev) => [...prev, response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function updateTaskOnServer(id, data) {
    await axios
      .patch(`http://localhost:4000/task/${id}`, { done: data })
      .then(function (response) {
        setAllTasks(
          allTasks.map((task) => {
            if (task.task_id === response.data.task_id) {
              task.done = !task.done;
            }
            return task;
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getTasksList();
    getTasks();
  }, []);

  useEffect(() => {
    setSelectedList(id)
  }, [id])

  function toggleTask(id) {
    setAllTasks(
      allTasks.map((task) => {
        if (task.task_id === id) {
          task.done = !task.done;
          updateTaskOnServer(id, task.done);
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
    addTaskOnServer({ ...updatedItem, ...{ done: false } });
    setOpen(false);
  };

  return (
    <div>
      <TodoListSidebar
        taskList={taskList}
        onToggle={() => setShowDone((prev) => !prev)}
      />
      <ul className="tasks">

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
      <div className="addTaskButton">
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
