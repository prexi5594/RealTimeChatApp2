// Mock data for frontend-only chat app
let mockMessages = {
  general: [
    { id: 1, user: "Bot", text: "Welcome to the general chat!" },
    { id: 2, user: "Bot", text: "Type a message to get started." }
  ],
  sports: [
    { id: 1, user: "Bot", text: "Welcome to the sports chat!" }
  ],
  "class-chat": [
    { id: 1, user: "Bot", text: "Welcome to the class chat!" }
  ]
};

// =========================
// GET MESSAGES (BY ROOM)
// =========================
export const getMessages = async (room) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Return mock messages for the room
  return mockMessages[room] || [];
};

// alias (optional, keeps old code working)
export const fetchMessages = getMessages;

// =========================
// SEND MESSAGE (ROOM + USER + TEXT)
// =========================
export const sendMessage = async (messageData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const { room, username, text } = messageData;

  // Create new message
  const newMessage = {
    id: Date.now(),
    user: username,
    text: text
  };

  // Add to mock messages
  if (!mockMessages[room]) {
    mockMessages[room] = [];
  }
  mockMessages[room].push(newMessage);

  // Simulate bot response after a delay
  setTimeout(() => {
    const botResponse = {
      id: Date.now() + 1,
      user: "Bot",
      text: `Thanks for your message: "${text}"`
    };
    mockMessages[room].push(botResponse);
  }, 1500);

  return { success: true };
};