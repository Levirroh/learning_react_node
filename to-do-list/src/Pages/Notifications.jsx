import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Config from "../components/Config";
import Header from "../components/Header";
import Menu from "../components/Menu";

function Notifications() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

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

  useEffect(() => {
    
  }, [user, id]); 

    return (
      <section>
        <Header title="Menu"  onToggleMenu={toggleMenu}/>
        <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
        <div>
            {
                // .map configs
            }
                        <Config />
            {
                // end .map configs
            }
        </div>
        
      </section>
    );
}

export default Notifications;
