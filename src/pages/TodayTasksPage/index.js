import React, { useEffect, useState } from "react";
import Task from "../../components/Task"
import axios from "axios";

const TodayTasksPage = () => {
  const [todayTasks, setTodayTasks] = useState([]);
  let tasks = todayTasks.filter((task) => !task.done);

  async function getTodayTasks() {
    try {
      const response = await axios.get(
        "http://localhost:4000/task/collection/today"
      );
      setTodayTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTodayTasks()
  }, [])


  return (
    <div>
      <ul className="tasks">
        {tasks.map((task) => (
          <Task
            task={task}
            key={todayTasks.task_id}
            isChip={true}
            // onToggle={toggleTask}
            // deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodayTasksPage;
