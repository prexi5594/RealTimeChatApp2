import React, { useState } from "react";
import ChatBox from "../Components/ChatBox";

export default function ChatPage() {
  // :fire: ACTIVE ROOM STATE
  const [room, setRoom] = useState("general");

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
          {/* ===================== */}
          {/* LEFT SIDE - ROOMS     */}
          {/* ===================== */}
          <div style={{ width: "200px", borderRight: "1px solid rgba(255,255,255,0.1)", padding: "20px", background: "rgba(255,255,255,0.05)" }}>
            <h3 style={{ color: "white", marginBottom: "20px" }}>Rooms</h3>

            <button
              onClick={() => setRoom("general")}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                background: room === "general" ? "rgba(71, 128, 255, 0.3)" : "rgba(255,255,255,0.1)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              General
            </button>

            <button
              onClick={() => setRoom("sports")}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                background: room === "sports" ? "rgba(71, 128, 255, 0.3)" : "rgba(255,255,255,0.1)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Sports
            </button>

            <button
              onClick={() => setRoom("class-chat")}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                background: room === "class-chat" ? "rgba(71, 128, 255, 0.3)" : "rgba(255,255,255,0.1)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Class Chat
            </button>

            <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "20px 0" }} />

            {/* show active room */}
            <p style={{ color: "white", fontSize: "14px" }}><b>Current Room:</b> {room}</p>
          </div>

          {/* ===================== */}
          {/* RIGHT SIDE - CHAT     */}
          {/* ===================== */}
          <div style={{ flex: 1 }}>
            <ChatBox room={room} />
          </div>
        </div>
      </div>
    </div>
  );
}