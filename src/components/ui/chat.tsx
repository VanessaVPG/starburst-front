// components/ui/Chatbot.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { BorderBeam } from "./border-beam";

interface Message {
  sender: "user" | "bot";
  content: string;
}

const mockResponses: string[] = [
  "Olá! Como posso ajudar você hoje?",
  "Estou aqui para responder suas dúvidas sobre a Bemobi AI.",
  "Posso esclarecer dúvidas sobre o uso dos seus planos contratados.",
  "Veja seu histórico de pagamentos aqui: [link para histórico].",
  "Quais métodos de pagamento você gostaria de utilizar?",
  "Se você tem faturas em atraso, posso oferecer opções de pagamento para resolver isso rapidamente."
];

const getRandomResponse = (): string => {
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Adiciona a mensagem do usuário
    const newMessages: Message[] = [...messages, { sender: "user", content: inputValue }];
    setMessages(newMessages);
    setInputValue("");

    // Simula uma resposta do bot com base na mensagem do usuário
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: botResponse } as Message
      ]);
    }, 1000);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const getBotResponse = (userMessage: string): string => {
    // Aqui você pode implementar lógica mais sofisticada para respostas
    // Por enquanto, retornamos uma resposta aleatória do array mockResponses
    return getRandomResponse();
  };

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  return (
    <>
      {/* Botão para abrir/fechar o chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleChatbot}
          className="bg-bemobi-secondary text-white px-4 py-2 rounded-full shadow-lg hover:bg-bemobi-primary transition duration-300 flex items-center gap-2"
        >
          <span>BEMOBI AI</span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? "transform rotate-45" : ""
            }`}
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
        </button>
      </div>

      {/* Janela do chatbot */}
      {isOpen && (
        <div>
          <div className="fixed border border-bemobi-hover bottom-20 right-4 w-80 bg-bemobi-gray rounded-lg shadow-lg flex flex-col z-50">
            <div className="flex items-center justify-between p-4 bg-bemobi-secondary rounded-t-lg">
              <h2 className="text-white text-lg">BEMOBI AI</h2>
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
                        ? "bg-bemobi-secondary text-white"
                        : "bg-gray-200 text-gray-800"
                    } rounded-lg p-2 max-w-xs`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input para enviar mensagens */}
            <div className="flex p-4">
              <input
                type="text"
                className="flex-1 border rounded-l-lg p-2 text-bemobi-gray focus:outline-none"
                placeholder="Digite sua mensagem..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
              <button
                onClick={handleSendMessage}
                className="bg-bemobi-secondary text-white p-2 rounded-r-lg -ml-1 hover:bg-bemobi-primary transition-all duration-300"
              >
                Enviar
              </button>
            </div>
          </div>
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
      )}
    </>
  );
};

export default Chatbot;
