import { useState, useRef, useEffect } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid"; // Ícono de enviar

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean; // Cambié isDisabled a isProcessing para más claridad
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isProcessing }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ajusta la altura automáticamente
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }

    if (isProcessing) {
      e.preventDefault();
    }
  };

  return (
    <div className=" bg-gray-100 border-t rounded-b-lg shadow-md rounded-lg p-0">
      <form onSubmit={handleSubmit} className="flex items-end px-2">
        <div className="w-full relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje..."
            className="w-full min-h-8 resize-none border-none text-sm bg-gray-100 rounded-lg focus:outline-none max-h-28 overflow-y-auto m-0 p-2"
            rows={1}
          // disabled={isProcessing && input.length === 0} // Permitir escribir mientras la IA responde
          />


          <div className="flex bg-gray-100 h-8 items-center justify-between">
            {/* Label de Shift + Enter */}
            <p className="text-center  text-xs text-gray-400">
              ⇧ Shift + ⏎ Enter para nueva línea
            </p>
            <button
              type="submit"
              className={`w-8 h-8 text-white rounded-lg transition-all ${isProcessing ? "opacity-50 cursor-not-allowed" : "hover:bg-primaryDark"
                }`}
              disabled={input.trim() === "" || isProcessing} // Bloquea envío, pero permite escribir
            >
              <ArrowUpCircleIcon className="w-full h-full" fill="#EB2738" />
            </button>
          </div>

        </div>

      </form>
    </div>
  );
};

export default ChatInput;
