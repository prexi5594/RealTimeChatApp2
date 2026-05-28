const BASE_URL = "https://realtimechatappbackend-y8z2.onrender.com"; 
const getToken = () => localStorage.getItem("token");

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        
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