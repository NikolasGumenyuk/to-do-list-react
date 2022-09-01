import React, { useEffect, useId, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import TodoListSidebar from "./components/TodoListSidebar";
import BasicModal from "./components/Modal";
import AddForm from "./components/AddForm";
import axios from "axios";

const tasksArr = [
  {
    task_id: 1,
    title: "Go to the gym",
    description: "go go go",
    done: false,
    due_date: null,
    list_id: 1,
  },
  {
    task_id: 2,
    title: "Go to the work",
    description: "go go go",
    done: false,
    due_date: "2022-08-31T21:00:00.000Z",
    list_id: 1,
  },
  {
    task_id: 23,
    title: "By something",
    description: "by meat, by milk.",
    done: false,
    due_date: "2022-08-27T21:00:00.000Z",
    list_id: 2,
  },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskList, setTaskList] = useState([
    {
      tasklist_id: 1,
      title: "study",
    },
    {
      tasklist_id: 2,
      title: "work",
    },
  ]);
  let [selectedList, setSelectedList] = useState(tasks);

  async function getUser() {
    try {
      const response = await axios.get("http://localhost:4000/task");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => {
        if (task.task_id === id) {
          task.done = !task.done;
        }
        return task;
      })
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.task_id !== id));
  }

  function selectTaskList(id) {
    setSelectedList(tasksArr.filter((task) => task.list_id === id));
    console.log(selectedList);
  }

  const handleSubmit = (updatedItem) => {
    const newTask = {
      task_id: useId,
      done: false,
      list_id: 1,
    };
    setTasks((prev) => [...prev, { ...newTask, ...updatedItem }]);
  };

  useEffect(() => {
    setSelectedList(tasks);
  }, [tasks]);

  return (
    <div>
      <TodoListSidebar
        taskList={taskList}
        onSelect={selectTaskList}
        reset={() => setSelectedList(tasks)}
      />
      <ul className="tasks">
        {selectedList.map((task) => (
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
          <AddForm onSubmit={handleSubmit} />
        </BasicModal>
      </div>
    </div>
  );
}

export default App;
