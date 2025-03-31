import React from "react"; 
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./Pages/App.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Welcome from "./Pages/Welcome.jsx";
import CreateTask from "./Pages/CreateTask";
import UpdateTask from "./Pages/UpdateTask";


import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<App />} />
        <Route path="/task" element={<CreateTask />} />
        <Route path={`/update/:id`} element={<UpdateTask />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
