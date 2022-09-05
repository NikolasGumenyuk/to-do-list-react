import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodayTasksPage from "./pages/TodayTasksPage";
import TodoListPage from "./pages/TodoListPage";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo-list/:id" element={<TodoListPage />} />
        <Route path="/today/:id" element={<TodayTasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}