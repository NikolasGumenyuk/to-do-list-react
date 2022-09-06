import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodayTasksPage from "./pages/TodayTasksPage/TodayTaskPage";
import TodoListPage from "./pages/TodoListPage/TodoListPage";

export default function AppRouter() {
  return (
      <Routes>
        <Route path="/today" element={<TodayTasksPage />} />
        <Route path="/todo-list/:id" element={<TodoListPage />} />
      </Routes>
  );
}
