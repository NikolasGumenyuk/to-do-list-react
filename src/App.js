import React, { useEffect, useState} from "react";
import "./App.css";
import TodoListSidebar from "./components/TodoListSidebar/TodoListSidebar";
import axios from "axios";
import AppRouter from "./AppRouter";
import {getAllTasksList, getDashboard} from "./services/RequestApi"
import {loadDashboard} from "./store/dashboard/actions"
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [taskList, setTaskList] = useState([]);
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  
  // dashboard.lists.map((list) => console.log(list.undone));


  useEffect(() => {
    getDashboard().then((data) => dispatch({type: "LOAD_DASHBOARD", payload: data}));

    getAllTasksList().then(setTaskList);
  }, []);

  return (
    <div>
      <TodoListSidebar taskList={taskList} dashboard={dashboard}/>

      <AppRouter />
    </div>
  );
}

export default App;
