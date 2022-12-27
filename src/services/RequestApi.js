import axios from "axios";

export async function getAllTasks() {
  try {
    return await axios.get("http://localhost:4000/task");
  } catch (error) {
    console.error(error);
  }
}

export async function getAllTasksList() {
  try {
    let response = await axios.get("http://localhost:4000/tasklist");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTask0nServer(id) {
  try {
    return await axios.delete(`http://localhost:4000/task/${id}`);
  } catch (error) {
    console.error(error);
  }
}

export async function addTaskOnServer(task) {
  return await axios
    .post("http://localhost:4000/task", task)
    .catch(function (error) {
      console.log(error);
    });
}

export async function updateTaskOnServer(id, data) {
  return await axios
    .patch(`http://localhost:4000/task/${id}`, data)
    .catch(function (error) {
      console.log(error);
    });
}

export async function getTodayTasks() {
  try {
    let response = await axios.get(
      "http://localhost:4000/task/collection/today"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getDashboard() {
  try {
    let response = await axios.get("http://localhost:4000/task/dashboard");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTemperatureToday() {
  try {
    let response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=49.44&longitude=32.06&hourly=temperature_2m&current_weather=true");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
