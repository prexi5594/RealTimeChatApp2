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

export const getMessages = async (room) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMessages[room] || [];
};

export const fetchMessages = getMessages;

export const sendMessage = async (messageData) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const { room, username, text } = messageData;

  const newMessage = {
    id: Date.now(),
    user: username,
    text: text
  };

  if (!mockMessages[room]) {
    mockMessages[room] = [];
  }
  mockMessages[room].push(newMessage);

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