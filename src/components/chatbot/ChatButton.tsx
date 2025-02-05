import React, { Fragment, useEffect } from "react";
import ChatbotIcon from "../../assets/chatbotIcon.gif"
interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {

  const [showTooltip, setShowTooltip] = React.useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
    }
  }, [isOpen]);

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-12 right-8 bg-primary w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform duration-400  ${isOpen ? "rotate-45" : "rotate-0"
        }`}
    >
      {isOpen ?
        <span className="text-white">✕</span>
        :
        <Fragment>
          {
            showTooltip &&
            <div className="absolute w-52 bg-white p-4 rounded-lg shadow-md bottom-16 right-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={ChatbotIcon}
                    alt="Logo"
                    className="w-6 h-6"
                  />
                  <span className="font-bold text-lg">Ivonne</span>
                </div>
                <button className="text-black font-bold hover:text-gray-600" onClick={(e) => { e.stopPropagation(); setShowTooltip(false) }}>✕</button>
              </div>
              <p className="text-gray-700 mt-2" >
                ¡Hola! Soy tu asistente Ivonne, ¿en qué puedo ayudarte?
              </p>
            </div>
          }
          <img src={ChatbotIcon} alt="" className="w-full h-full object-cover rounded-full scale-150" />
        </Fragment>
      }



    </button>
  );
};

export default ChatButton;
