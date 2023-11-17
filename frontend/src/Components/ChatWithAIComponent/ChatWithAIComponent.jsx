import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import "./ChatwithAIComponent.css";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useDispatch, useSelector } from "react-redux";
import { chatWithAi } from "../../Actions/chatWithAi";

const ChatWithAIComponent = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const { result } = useSelector((state) => state.result);
  const dispatch = useDispatch();

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      setConversation((prev) => [...prev, { user: message, ai: null }]); // Update the conversation state before sending the message
      setMessage("");

      try {
        await dispatch(chatWithAi(message));
      } catch (error) {
        console.error("Error fetching response:", error);
      }
    }
  };

  useEffect(() => {
    const updateConversation = async () => {
      if (result && result.candidates) {
        setConversation((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1
              ? { ...msg, ai: result.candidates.map((c) => c.output) }
              : msg
          )
        );
      }
    };

    updateConversation();
  }, [result]);

  return (
    <div className="chatwithai">
      <SmartToyIcon />
      <div className="chatwithai_container">
        {conversation.map((entry, idx) => (
          <div key={idx} className="conversation_entry">
            <div className="user_sent_msg">{entry.user}</div>
            {entry.ai &&
              entry.ai.map((reply, replyIdx) => (
                <div key={replyIdx} className="ai_sent_msg">
                  {reply}
                </div>
              ))}
          </div>
        ))}

        <div className="chatinputarea">
          <textarea
            rows="2"
            cols="10"
            maxLength="100000"
            placeholder="Enter your Text"
            value={message}
            onChange={handleMessageChange}
          ></textarea>
          <div
            className="sendbutton"
            onClick={() => {
              handleSendMessage();
            }}
          >
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAIComponent;
