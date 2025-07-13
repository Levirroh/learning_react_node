import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Menu from "../components/Menu";
import Card from "../components/Card";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  

  return (
    <section className="h-screen overflow-hidden">
      <Header title="Dashboard"  />
      <section className="flex flex-col w-full h-full pt-12 pl-3 pr-3">
            <Card text={"Tasks"} gradientFrom={"from-red-300"} gradientTo={"to-purple-600"} to={"/tasks"}/>
            <Card text={"Teams"} gradientFrom={"from-green-500"} gradientTo={"to-blue-600"} to={"/teams"}/>
            <Card text={"Chats"} gradientFrom={"from-purple-800"} gradientTo={"to-yellow-500"} to={"/chats"}/>
            <Card text={"Notifications"} gradientFrom={"from-blue-700"} gradientTo={"to-white"} to={"/notifications"}/>
            <Card text={"Configurations"} gradientFrom={"from-black"} gradientTo={"to-purple-600"} to={"/configurations"}/>
        <div>

        </div>
      </section>
    </section>
  );
}

export default App;
