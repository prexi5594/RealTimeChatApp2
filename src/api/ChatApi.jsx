const BASE_URL = "https://realtimechatappbackend-y8z2.onrender.com";

const parseApiResponse = async (response) => {
  const result = await response.json().catch(() => null);

  if (!response.ok) {
    if (result?.action === "login") {
      window.location.pathname = "/login";
      throw new Error(result.error || "Please log in again.");
    }

    throw new Error(result?.error || "Request failed.");
  }

  if (result?.action === "login") {
    window.location.pathname = "/login";
    throw new Error(result.error || "Please log in again.");
  }

  return result;
};

// REGISTER
export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await parseApiResponse(res);
}

// VERIFY OTP
export async function verifyOtp(data) {
  const res = await fetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await parseApiResponse(res);
}

export async function fetchMessages(roomId) {
  try {
    const response = await fetch(`${BASE_URL}/messages/${roomId}`);
    return await parseApiResponse(response);
  } catch (error) {
    console.error("fetchMessages error:", error);
    throw error;
  }
}

export async function sendMessage(data) {
  try {
    const response = await fetch(`${BASE_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: data.message,
        username: data.username,
        room_id: data.roomId,
      }),
    });

    return await parseApiResponse(response);
  } catch (error) {
    console.error("sendMessage error:", error);
    throw error;
  }
}

export async function createChatRoom(roomData) {
  try {
    const response = await fetch(`${BASE_URL}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });

    return await parseApiResponse(response);
  } catch (error) {
    console.error("createChatRoom error:", error);
    throw error;
  }
}
export async function deleteChatRoom(roomId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/admin/rooms/${roomId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    return await parseApiResponse(response);
  } catch (error) {
    console.error("deleteChatRoom error:", error);
    throw error;
  }
}

export async function fetchChatRooms() {
  try {
    const response = await fetch(`${BASE_URL}/rooms`);
    return await parseApiResponse(response);
  } catch (error) {
    console.error("fetchChatRooms error:", error);
    throw error;
  }
}

export async function fetchChatRoomDetails(roomId) {
  try {
    const response = await fetch(`${BASE_URL}/rooms/${roomId}`);
    return await parseApiResponse(response);
  } catch (error) {
    console.error("fetchChatRoomDetails error:", error);
    throw error;
  }
}

export const deleteMessage = async (messageId) => {
  const res = await fetch(`${BASE_URL}/messages/${messageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await parseApiResponse(res);
};