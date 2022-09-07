import React, { useEffect, useId, useState } from "react";
import "./App.css";
import TodoListSidebar from "./components/TodoListSidebar/TodoListSidebar";
import axios from "axios";
import AppRouter from "./AppRouter";
import {getAllTasksList} from "./services/RequestApi"

function App() {
  const [taskList, setTaskList] = useState([]);
  


  useEffect(() => {
    getAllTasksList().then(setTaskList);
  }, []);

  return (
    <div>
      <TodoListSidebar taskList={taskList} />

      <AppRouter />
    </div>
  );
}

export default App;
