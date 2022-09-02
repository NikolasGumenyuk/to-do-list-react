import React, { useEffect, useId, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import TodoListSidebar from "./components/TodoListSidebar";
import BasicModal from "./components/Modal";
import AddForm from "./components/AddForm";
import axios from "axios";

function App() {
  const [allTasks, setTasks] = useState([]);
  const [taskList, setTaskList] = useState([]);
  let [selectedList, setSelectedList] = useState(1);
  const [showDone, setShowDone] = useState(false);
  let tasks = allTasks.filter(task => task.list_id === selectedList)
  if (!showDone) {
    tasks = tasks.filter(task => !task.done)
  }


  async function getTasks() {
    try {
      const response = await axios.get("http://localhost:4000/task");
      setTasks(response.data);
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
        setTasks((prev) => [...prev, response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function updateTaskOnServer(id, data) {
    await axios
      .patch(`http://localhost:4000/task/${id}`, { done: data })
      .then(function (response) {
        setTasks(
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

  function toggleTask(id) {
    setTasks(
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
    setTasks(allTasks.filter((task) => task.task_id !== id));
    deleteTask0nServer(id);
  }

  function selectTaskList(id) {
    setSelectedList(allTasks.filter((task) => task.list_id === id));
  }

  const handleSubmit = (updatedItem) => {
    addTaskOnServer({ ...updatedItem, ...{done: false} });
  };

  useEffect(() => {
    setSelectedList(allTasks);
  }, [allTasks]);

  return (
    <div>
      <TodoListSidebar
        taskList={taskList}
        onSelect={setSelectedList}
        onToggle={() => setShowDone(prev => !prev)}
      />
      <ul className="tasks">
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.task_id}
            onToggle={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
      <div className="addTaskButton">
        <BasicModal>
          <AddForm onSubmit={handleSubmit} taskList={taskList} />
        </BasicModal>
      </div>
    </div>
  );
}

export default App;
