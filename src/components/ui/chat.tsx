"use client";

import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { BorderBeam } from "./border-beam";

interface Message {
  sender: "user" | "bot";
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const getOptionUrl = (label: string): string => {
    switch (label.toLowerCase()) {
      case "pagamento online":
        return "/pagamento-online";
      case "pagamento em loja":
        return "/pagamento-loja";
      case "débito automático":
        return "/debito-automatico";
      default:
        return "/";
    }
  };

  const parseOptions = (message: string): Array<{ label: string; url: string }> | null => {
    const regex = /\*\*([^*]+)\*\*:/g;
    let match;
    const options = [];

    while ((match = regex.exec(message)) !== null) {
      const label = match[1].trim();
      const url = getOptionUrl(label);
      options.push({ label, url });
    }

    return options.length > 0 ? options : null;
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    // Adiciona a mensagem do usuário
    const newMessages: Message[] = [
      ...messages,
      { sender: "user", content: inputValue },
    ];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot_proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }

      const data = await response.json();

      // Adiciona a resposta do bot
      const botMessage: Message = { sender: "bot", content: data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        sender: "bot",
        content:
          "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
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
          className="bg-bemobi-secondary text-white px-4 py-2 rounded-full shadow-lg hover:bg-bemobi-primary transition duration-300 flex items-center gap-2 animate-pulse-slow"
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
              {messages.map((message, index) => {
                const options = message.sender === "bot" ? parseOptions(message.content) : null;

                // Remover a parte das opções do conteúdo da mensagem
                const content = message.sender === "bot" && options
                  ? message.content.split("\n").slice(0, -options.length).join("\n")
                  : message.content;

                return (
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
                      <p className="text-sm whitespace-pre-line">{content}</p>
                      {/* Renderizar botões de opções, se existirem */}
                      {options && (
                        <div className="mt-2 flex flex-col gap-2">
                          {options.map((option, idx) => (
                            <a
                              key={idx}
                              href={option.url}
                              className="inline-block bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition duration-200"
                            >
                              {option.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="mb-2 flex justify-start">
                  <div className="bg-gray-200 text-gray-800 rounded-lg p-2 max-w-xs">
                    <p className="text-sm">Carregando...</p>
                  </div>
                </div>
              )}
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
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className="bg-bemobi-secondary text-white p-2 rounded-r-lg -ml-1 hover:bg-bemobi-primary transition-all duration-300 animate-bounce-slow"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar"}
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
