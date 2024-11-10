import { useEffect, useState } from "react";
import './ChatBotPlayground.css';
import axios from "axios";

function ChatBotPlayground() {
    const [messages, setMessages] = useState([{ sender: "bot", text: "Hello!"}]);
    const [userMessage, setUserMessage] = useState("Hi");
    const [isLoading, setIsLoading] = useState(false);

    // Function to parse and highlight text wrapped in ** **
    const parseMessage = (text) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/); // Split by **text**
        return parts.map((part, index) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            } else {
                return part;
            }
        });
    };

    const handleSendMessage = async () => {
        if (userMessage.trim() === "") return;

        const userMessageObject = { sender: "user", text: userMessage };
        setMessages((prevMessages) => [...prevMessages, userMessageObject]);
        setUserMessage("");
        setIsLoading(true);

        const thinkingMessage = { sender: "bot", text: "thinking...", type: "thinking" };
        setMessages((prevMessages) => [...prevMessages, thinkingMessage]);

        try {
            const response = await axios.post("https://groove-bot-production.up.railway.app/generate", {
                text: userMessage, user: {
                    "_id": "pugal",
                    "name": "Pugal",
                    "email": "pugalkmc@gmail.com"
                },
                chat_id: -4543563663,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const botMessageObject = { sender: "bot", text: response.data.response };
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                botMessageObject
            ]);
        } catch (error) {
            console.error("Error generating response:", error);
            const errorMessage = { sender: "bot", text: "Sorry, there was an error processing your message." };
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                errorMessage
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="chatbot-container">
            <h3 className="text-center">Chatbot Playground</h3>

            <div className="chat-display">
                {messages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.sender} ${message.type === "thinking" ? "thinking" : ""}`}>
                        <p>{message.sender === "bot" ? parseMessage(message.text) : message.text}</p>
                    </div>
                ))}
            </div>

            <div className="chat-input-container">
                <input
                    type="text"
                    className="chat-input"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                />
                <button
                    className="btn btn-submit"
                    onClick={handleSendMessage}
                    disabled={isLoading || userMessage.trim() === ""}
                >
                    {isLoading ? "Sending..." : "Send"}
                </button>
            </div>
        </section>
    );
}

export default ChatBotPlayground;
