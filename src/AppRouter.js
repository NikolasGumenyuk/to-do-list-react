import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoListSidebar from "./components/TodoListSidebar";
import TodayTasksPage from "./pages/TodayTasksPage";
import TodoListPage from "./pages/TodoListPage";

export default function AppRouter() {
  return (
      <Routes>
        <Route path="/today" element={<TodayTasksPage />} />
        <Route path="/todo-list/:id" element={<TodoListPage />} />
      </Routes>
  );
}
