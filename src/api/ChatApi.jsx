
const BASE_URL = "http://127.0.0.1:5000";

// REGISTER
export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.error || "Register failed");

  return result;
}

// VERIFY OTP
export async function verifyOtp(data) {
  const res = await fetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.error || "OTP verification failed");

  return result;
}



export async function fetchMessages(roomId) {
  try {
    const response = await fetch(
      `${BASE_URL}/messages/${roomId}`
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
          room_id: data.roomId
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
      `${BASE_URL}/rooms`,
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
      `${BASE_URL}/rooms/${roomId}`,
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
      `${BASE_URL}/rooms`
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
      `${BASE_URL}/rooms/${roomId}`
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