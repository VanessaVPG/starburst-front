"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Adiciona a mensagem do usuário
    setMessages([...messages, { sender: "user", content: inputValue }]);
    setInputValue("");

    // Simula uma resposta do bot
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: "Esta é uma resposta simulada do bot." },
      ]);
    }, 1000);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botão para abrir/fechar o chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleChatbot}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 20.75c4.832 0 8.75-3.918 8.75-8.75S16.832 3.25 12 3.25 3.25 7.168 3.25 12 7.168 20.75 12 20.75z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.75 11.5h6.5M11.5 8.75v6.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Janela do chatbot */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-lg flex flex-col z-50">
          <div className="flex items-center justify-between p-4 bg-blue-600 rounded-t-lg">
            <h2 className="text-white text-lg">Chatbot</h2>
            <button onClick={toggleChatbot} className="text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-4 flex flex-col max-h-64 overflow-y-auto">
            {/* Limitação de altura e rolagem das mensagens */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } rounded-lg p-2 max-w-xs`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input para enviar mensagens */}
          <div className="flex">
            <input
              type="text"
              className="flex-1 border rounded-l-lg p-2"
              placeholder="Digite sua mensagem..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-2 rounded-r-lg"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
