// src/components/chatbot/ChatWindow.tsx

import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import BotThinking from "./BotThinking";
// import QuickReplies from "./QuickReplies";
import { Record } from '../../types/Record';

import chatbotIcon from "../../assets/svg/botIcon.svg";

type TChatWindowProps = {
    messages: {
        message: string;
        records: Record[];
        status: string;
    } | null;
    isConnected: boolean;
    sendMessage: (message: string) => void;
}

const ChatWindow: React.FC<TChatWindowProps> = ({ messages, isConnected, sendMessage }) => {
    const [userMessages, setUserMessages] = useState<{ user: string; text: string; records?: Record[] }[]>([]);
    const [isThinking, setIsThinking] = useState(true);

    const handleSendMessage = async (message: string) => {
        if (!isConnected) {
            console.log("No está conectado al WebSocket.");
            return;
        }

        setUserMessages([...userMessages, { user: "human", text: message }]);
        setIsThinking(true);

        sendMessage(message);
    };

    useEffect(() => {
        if (messages) {
            const newMessageObj = messages || { message: "No records available", records: [], status: "" };
            const newMessageText = newMessageObj.message;

            console.log("loading records", newMessageObj.records);


            // Evita duplicados comparando el último mensaje agregado
            if (userMessages[userMessages.length - 1]?.text !== newMessageText) {
                const newMessage = {
                    user: "ai",
                    text: newMessageText,
                    records: newMessageObj.records || [],
                };
                console.log("Creating new message", newMessage, "from: ", newMessageObj);
                setUserMessages((prev) => [...prev, newMessage]);
            }

            setIsThinking(false);
        }
    }, [messages, messages?.records]);

    return (
        <div
            className="fixed bottom-5 w-full min-h-96 max-h-[70vh] bg-secondary shadow-lg rounded-lg flex flex-col"
        >
            <div className="relative flex justify-start items-center gap-2 bg-primary text-white p-2 text-center rounded-t-lg ">
                <img src={chatbotIcon} className="h-7  " />
                <p className="text-sm font-bold">
                    Ivonne
                </p>
            </div>
            <div className="flex-1 p-4 overflow-y-scroll space-y-2">
                {userMessages.map((msg, index) => (
                    <div key={index}>
                        <MessageBubble user={msg.user} text={msg.text} />
                    
                    </div>
                ))}

                {isThinking && (
                    <div className="flex justify-start">
                        <BotThinking />
                    </div>
                )}
            </div>
            <ChatInput onSendMessage={handleSendMessage} isProcessing={isThinking} />
            {/* {!isThinking && <QuickReplies onReply={handleSendMessage} />} */}
            {/* <div className="bg-gray-100 text-gray-600 text-xs p-2 text-center">
                Al utilizar esta herramienta, aceptas los <a href="/terminos" className="text-primary underline">términos y condiciones</a>.
            </div> */}
        </div>

    );
};

export default ChatWindow;
