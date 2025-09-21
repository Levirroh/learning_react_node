import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Notification from "../components/Notification";
import Header from "../components/Header";
import Menu from "../components/Menu";

function Notifications() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(false); 

  function toggleMenu() {
    setIsMenuOpen(prev => !prev);
  }


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  async function getNotifications(){
    if (user){
      try {
          const response = await fetch("http://localhost:8800/getUserNotifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_user: user.id_user })
          });

          const data = await response.json();
          setNotifications(data);
          console.log(data);

        } catch (e) {
          console.error("Erro ao buscar notificações:", e);
      }
    } 
  }

  useEffect(() => {
    getNotifications();
  }, [user]); 

    return (
      <section>
        <Header title="Menu"  onToggleMenu={toggleMenu}/>
        <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
        <div>
        {settings != null && (
          <div className="flex w-full h-full pt-16">
              {notifications.map((noti) => (
                <Notification
                  key={noti}
                  text={noti.content_message} 
                  from={"/chats"} 
                />
              ))}
          </div>
        )}
        </div>
        
      </section>
    );
}

export default Notifications;
