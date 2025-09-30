import { useState, useEffect } from "react";
import io from "socket.io-client";
import { FaTelegramPlane, FaDoorOpen } from "react-icons/fa";
import { MdOutlineMeetingRoom } from "react-icons/md";
import ChatContainer from "../components/chatcContainer/ChatContainer";
const socket = io.connect("http://localhost:3001");

const Home = () => {
  const [hasJoined, setHasJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [room, setRoom] = useState("");
  const[username,setUsername]=useState("")

  const joinRoom = () => {
    if (room.trim() !== "") {
      socket.emit("join_room", room);
      setHasJoined(true);
    } else {
      alert("Room number cannot be empty.");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    });
  }, []);

  return (
  <div className=" flex flex-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
  
    <div className="container mx-auto px-4 py-10">
      
      <div className="flex justify-center">
        <div
          className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.7)] p-10 space-y-8 border border-white/20"
          style={{ fontFamily: "'Source Code Pro', monospace" }}
        >
          <h1 className="text-4xl font-extrabold text-center text-gradient tracking-widest select-none drop-shadow-lg">
            गफ 🗣️ गाफ
          </h1>

          {!hasJoined ? (
            <div className="flex flex-col items-center gap-6">
              

              <div className="flex flex-col sm:flex-row gap-4 w-full h-15">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && joinRoom()}
                  type="text"
                  placeholder="Enter username"
                  className="flex-1 px-5 py-3 bg-white/20 rounded-xl border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-md"
                />

                <input
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && joinRoom()}
                  type="text"
                  placeholder="Enter room name"
                  className="flex-1 px-5 py-3 bg-white/20 rounded-xl border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-md"
                />

                <button
                  onClick={joinRoom}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 shadow-lg transition-transform hover:scale-105"
                  aria-label="Join Room"
                >
                  <FaDoorOpen className="text-lg" />
                  Join
                </button>
              </div>
            </div>
          ) : (
            <>
             <ChatContainer username={username} socket={socket} room={room}/>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);
}
export default Home;


