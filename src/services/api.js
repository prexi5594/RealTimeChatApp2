const BASE_URL = "http://127.0.0.1:5000"; 
const getToken = () => localStorage.getItem("token");

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        // 🟢 ADDED "Bearer " BACK: This satisfies your backend's .split(" ")[1] logic
        "Authorization": getToken() ? `Bearer ${getToken()}` : ""
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(`${BASE_URL}${cleanEndpoint}`, options);

    if (!res.ok) {
      throw new Error(`Server returned status code: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Connection error details:", error);
    throw error;
  }
};