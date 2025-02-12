import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatButton from "./ChatButton";
import { useWebSocket } from "../../../services/useWebSocket";
import UserForm from "./UserForm";

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    // Establecer la URL del WebSocket
    // const { messages, isConnected, sendMessage} = useWebSocket("ws://localhost:5000/ws");  // Local
    const { messages, isConnected, sendMessage } = useWebSocket("wss://chatbot-go-ramiro-production.up.railway.app/ws"); // Production 

    const [isChatVisible, setIsChatVisible] = useState(false);

    const handleFormSubmit = (userData: { name: string; email: string; tel: string }) => {
        setIsChatVisible(true);
        const { name, email } = userData;
        // sendMessage(`name: ${name}, email: ${email}`);
        sendMessage('El nombre del usuario es ' + name + ' y su correo es ' + email + ', y su número de teléfono es ' + userData.tel);
        // console.log(`name: ${name}, email: ${email} y teléfono: ${userData.tel}`);

    };

    return (
        <div className="relative w-full h-full">
            <div
                className={`fixed bottom-24 right-4 w-72 bg-secondary shadow-lg rounded-lg flex flex-col ${isOpen ? "animate-fadeIn" : "animate-fadeOut"}`}
            >
                {!isChatVisible ? (
                <UserForm onFormSubmit={handleFormSubmit} />
            ) : (
                <ChatWindow isConnected={isConnected} messages={messages} sendMessage={sendMessage} />
            )}
            </div>

            <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
           
        </div>
    );
};

export default Chatbot;
