const BASE_URL = "https://your-backend-url.com"; // change to Render URL

// GET JWT TOKEN
const getToken = () => localStorage.getItem("token");

// COMMON FETCH WRAPPER
export const apiRequest = async (endpoint, method = "GET") => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
};