const API_URL = "https://realtimechatappbackend-95ex.onrender.com";

// GET messages
export const fetchMessages = async (room) => {
  const res = await fetch(`${API_URL}/api/messages?room=${room}`);
  return res.json();
};

// SEND message
export const sendMessage = async ({ room, username, text }) => {
  const res = await fetch(`${API_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ room, username, text })
  });

  return res.json();
};