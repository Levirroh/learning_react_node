import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Config from "../components/Config";
import Header from "../components/Header";
import Menu from "../components/Menu";

function Settings() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [settings, setSettings] = useState(null); 
  const navigate = useNavigate();
  
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


  async function getUserSettings(){
     if (user){
            try {
                const response = await fetch("http://localhost:8800/getUserSettings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_user: user.id_user })
                });

                const data = await response.json();
                setSettings(data);
                console.log(data);

              } catch (e) {
                console.error("Erro ao buscar configurações:", e);
            }
        }
  }

  useEffect(() => {
    getUserSettings();
  }, [user]); 

    return (
      <section>
        <Header title="Menu" onToggleMenu={toggleMenu}/>
        <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
        {settings != null && (
          <div className="flex w-full h-full pt-16">
              {settings.map((setting) => (
                <Config
                  key={setting.id_user_preference}
                  name_setting={setting.name_user_preference} 
                  value_setting={setting.value_user_preference} 
                  options_setting={setting.options_user_preference} 
                />
              ))}
          </div>
        )}
      </section>
    );
}

export default Settings;
