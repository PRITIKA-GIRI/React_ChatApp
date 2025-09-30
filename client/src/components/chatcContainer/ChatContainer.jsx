// ChatContainer.jsx
import { useState, useEffect, useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";

const ChatContainer = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        room,
        message,
        author: username,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      socket.emit("sent_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prev) => [...prev, data]);
    });``

    return () => {
      socket.off("s");
    };
  }, [socket]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <>
     <div className="text-green-400 font-semibold text-center text-xl">
        Joined Room: <span className="font-extrabold">{room}</span>
      </div>

      <div className="mt-6 h-80 overflow-y-auto bg-white/10 border border-white/20 rounded-xl p-4 space-y-2 shadow-inner">
        {messageList.length === 0 ? (
          <p className="text-white/40 italic">No messages yet</p>
        ) : (
          messageList.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg w-fit max-w-[80%] ${
                msg.author === username
                  ? "ml-auto bg-purple-600 text-white"
                  : "mr-auto bg-gray-700 text-white"
              }`}
            >
              <div className="text-sm font-italic mb-1">
                
                <span className="text-white/50 text-xs">{msg.author}{" "} at {msg.time}</span>
              </div>
              <div>{msg.message}</div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex items-center gap-4 mt-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-5 py-3 bg-white/20 rounded-xl border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-md"
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl shadow-lg transition-transform hover:scale-110"
          aria-label="Send Message"
        >
          <FaTelegramPlane className="w-6 h-6" />
        </button>
      </div>
      
    </>
  );
};

export default ChatContainer;
