import {
    getAllTasks,
    getAllTasksList,
    deleteTask0nServer,
    addTaskOnServer,
    updateTaskOnServer,
  } from "../../services/RequestApi";


const TASKS_LOADED = 'tasks/loaded'
const loadTasks = listId => dispatch => {
    getAllTasksList()
        .then(tasks => dispatch({
            type: "LOAD_TASKS",
            listId,
            tasks
        }))
}

