import React, { useState } from "react";
import ChatBox from "../Components/ChatBox";

export default function ChatPage() {
  const [room, setRoom] = useState("general");
  const username = localStorage.getItem("username") || "Guest";

  const rooms = [
    { id: "general", label: "General" },
    { id: "sports", label: "Sports" },
    { id: "class-chat", label: "Class Chat" },
  ];

  return (
    <div className="page-container">
      <div className="chat-card">
        <header className="chat-header">
          <div>
            <p className="eyebrow">Real-Time Chat</p>
            <h1>Speech Balloon</h1>
          </div>
          <div className="status-pill">Online</div>
        </header>

        <div style={{ display: "flex", height: "100%" }}>
          {/* LEFT SIDE - ROOMS */}
          <div style={{ width: "200px", borderRight: "1px solid rgba(255,255,255,0.1)", padding: "20px", background: "rgba(255,255,255,0.05)" }}>
            <h3 style={{ color: "white", marginBottom: "20px" }}>Rooms</h3>

            {rooms.map((r) => (
              <button
                key={r.id}
                onClick={() => setRoom(r.id)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  background: room === r.id ? "rgba(71, 128, 255, 0.3)" : "rgba(255,255,255,0.1)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {r.label}
              </button>
            ))}

            <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "20px 0" }} />
            <p style={{ color: "white", fontSize: "14px" }}>
              <b>Current Room:</b> {room}
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginTop: "8px" }}>
              <b>User:</b> {username}
            </p>
          </div>

          {/* RIGHT SIDE - CHAT */}
          <div style={{ flex: 1 }}>
            <ChatBox room={room} username={username} />
          </div>
        </div>
      </div>
    </div>
  );
}