import ChatbotIcon from "./ChatbotIcon";
import ChatsForm from "./ChatsForm";
import ChatMessage from "./ChatMessage";
import { useRef, useState, useEffect } from "react";
import { companyInfo } from "./companyInfo";
import "../component/index.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaCommentAlt } from "react-icons/fa";

const Chat = () => {
  const [ChatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);
  const [showChatbot, setShowChatbot] = useState([false]);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=AIzaSyB9GdAuZdONKNcJKozdLtmpb_ZcjPnZWf8",
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    console.log("in chat");
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [ChatHistory]);

  return (
    <div className={`container chatbot-container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span className="material-symbols-outlined-comment"><FaCommentAlt/></span>
        <span className="material-symbols-outlined"><IoClose/></span>
      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">uberwalah</h2>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className="material-symbols-outlined"
          >
            <IoIosArrowDown/>
          </button>
        </div>

        {/* Chatbody */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there <br /> How can i help you?
            </p>
          </div>

          {ChatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatsForm
            ChatHistory={ChatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
