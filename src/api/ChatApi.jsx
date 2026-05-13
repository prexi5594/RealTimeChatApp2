const BASE_URL = "http://127.0.0.1:5000";

export const fetchMessages = async () => {
  const response = await fetch(`${BASE_URL}/messages`);
  return response.json();
};

export const sendMessage = async (messageData) => {
  const response = await fetch(`${BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });

  return response.json();
};
