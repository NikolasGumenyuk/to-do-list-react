import React, { useEffect, useId, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import TodoListSidebar from "./components/TodoListSidebar";
import BasicModal from "./components/Modal";
import AddForm from "./components/AddForm";
import axios from "axios";
import AppRouter from "./AppRouter"

function App() {
  const [taskList, setTaskList] = useState([]);

  async function getTasksList() {
    try {
      const response = await axios.get("http://localhost:4000/tasklist");
      setTaskList(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTasksList();
  }, []);


  return (
    <div>
      <TodoListSidebar
        taskList={taskList}
        // onToggle={() => setShowDone(prev => !prev)}
      />
        
      <AppRouter />

    </div>
  );
}

export default App;
