// Change this line to use localhost (127.0.0.1)
const BASE_URL = "http://127.0.0"; 

const getToken = () => localStorage.getItem("token");

export const apiRequest = async (endpoint, method = "GET") => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  
  try {
    const res = await fetch(`${BASE_URL}${cleanEndpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!res.ok) {
      throw new Error(`Server returned status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    alert("Cannot connect to backend");
    console.error("Connection error details:", error);
    throw error;
  }
};
