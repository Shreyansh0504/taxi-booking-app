import {useRef} from 'react';
import { FaArrowUp } from "react-icons/fa";

const ChatsForm = ({ChatHistory, setChatHistory, generateBotResponse}) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";

        setChatHistory((history)=> [...history,{role: "user", text: userMessage}]);

        setTimeout(() => {
            setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);
            generateBotResponse([...ChatHistory, { role: "user", text: `Using the details provided, please address this query: ${userMessage}` }]); // Or potentially the updated history
          }, 600);
        };
    
    return(
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="message..." className="message-input" required />
            <button className="material-symbols-outlined"><FaArrowUp/></button>
            </form> 
    );
};

export default ChatsForm;