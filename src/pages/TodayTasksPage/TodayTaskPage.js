import React, { useEffect, useState } from "react";
import Task from "../../components/Task/Task";
import {
  getTodayTasks,
  deleteTask0nServer,
  updateTaskOnServer,
} from "../../services/RequestApi";

const TodayTasksPage = () => {
  const [todayTasks, setTodayTasks] = useState([]);
  let tasks = todayTasks.filter((task) => !task.done);

  function deleteTask(id) {
    setTodayTasks(todayTasks.filter((task) => task.task_id !== id));
    deleteTask0nServer(id);
  }

  function toggleTask(id) {
    setTodayTasks(
      todayTasks.map((task) => {
        if (task.task_id === id) {
          task.done = !task.done;
          updateTaskOnServer(id, task.done).then(function (response) {
            setTodayTasks(
              todayTasks.map((task) => {
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

  useEffect(() => {
    getTodayTasks().then(setTodayTasks);
  }, []);

  return (
    <div>
      <ul className="tasks">
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.task_id}
            isChip={true}
            onToggle={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodayTasksPage;
