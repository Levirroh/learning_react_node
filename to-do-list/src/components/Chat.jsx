import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Chat(chatId) {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
        // pegar todos os dados e mensagens do time.
    }, [navigate]);
    return (
        <div className="w-full">
            <p>Mensagens</p>
        </div> 
    );
}

export default Chat;
