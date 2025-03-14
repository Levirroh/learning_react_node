import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./Pages/App";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Welcome from "./Pages/Welcome";

import "./index.css";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>}></Route>
        <Route path="/login" element={<Login/>}></Route> 
        <Route path="/register" element={<Register/>}></Route> 
        <Route path="/menu" element={<App/>}></Route>         
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
