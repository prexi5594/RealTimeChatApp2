
const BASE_URL = "https://realtimechatappbackend-zhb5.onrender.com";

export async function fetchMessages(room) {
  try {
    const response = await fetch(
      `${BASE_URL}/messages/${room}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || "Failed to fetch messages"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("fetchMessages error:", error);
    throw error;
  }
}


export async function sendMessage(data) {
  try {
    const response = await fetch(
      `${BASE_URL}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: data.message,
          username: data.username,
          room: data.room
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      console.error(
        "Backend error:",
        errorData
      );

      throw new Error(
        errorData.error || "Failed to send message"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("sendMessage error:", error);
    throw error;
  }
}