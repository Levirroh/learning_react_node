import React from "react"; 
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider  } from "react-router-dom";
import { createRoot } from 'react-dom/client'

import App from "./Pages/App.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Welcome from "./Pages/Welcome.jsx";
import CreateTask from "./Pages/CreateTask";
import UpdateTask from "./Pages/UpdateTask";
import ErrorPage from "./Pages/ErrorPage";
import Teams from "./Pages/Teams.jsx"
import Team from "./Pages/Team.jsx"
import Chats from "./Pages/Chats.jsx"
import DashBoard from "./Pages/DashBoard.jsx"

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<App />} />
        <Route path="/task" element={<CreateTask />} />
        <Route path={`/update/:id`} element={<UpdateTask />} />
        <Route path={`/teams`} element={<Teams />} />
        <Route path={`/team/:id`} element={<Team />} />
        <Route path="/Teamtask/:id" element={<CreateTask />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/menu" element={<DashBoard />} />



        {/* se nao cair em nada vem aqui */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
