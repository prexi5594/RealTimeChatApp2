
const BASE_URL = "http://localhost:5000";

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

export async function createChatRoom(roomData) {
  try {
    const response = await fetch(
      "http://172.28.42.45:5000/rooms",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(roomData)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Failed to create chat room"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("createChatRoom error:", error);
    throw error;
  }
}

export async function deleteChatRoom(roomId) {
  try {
    const response = await fetch(
      `http://172.28.42.45:5000/rooms/${roomId}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Failed to delete chat room"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("deleteChatRoom error:", error);
    throw error;
  }
}

export async function fetchChatRooms() {
  try {
    const response = await fetch(
      "http://172.28.42.45:5000/rooms"
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || "Failed to fetch chat rooms"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("fetchChatRooms error:", error);
    throw error;
  }
}


export async function fetchChatRoomDetails(roomId) {
  try {
    const response = await fetch(
      `http://172.28.42.45:5000/rooms/${roomId}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || "Failed to fetch chat room details"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("fetchChatRoomDetails error:", error);
    throw error;
  }
}


export const deleteMessage = async (messageId) => {
  const res = await fetch(
    `${BASE_URL}/messages/${messageId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return res.json();
};