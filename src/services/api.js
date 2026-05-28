const BASE_URL = "https://realtimechatappbackend-y8z2.onrender.com";
const getToken = () => localStorage.getItem("token");

const handleApiResponse = async (res) => {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (data?.action === "login") {
      window.location.pathname = "/login";
      throw new Error(data.error || "Please log in again.");
    }

    throw new Error(data?.error || `Server returned status code: ${res.status}`);
  }

  if (data?.action === "login") {
    window.location.pathname = "/login";
    throw new Error(data.error || "Please log in again.");
  }

  return data;
};

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken() ? `Bearer ${getToken()}` : "",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(`${BASE_URL}${cleanEndpoint}`, options);
    return await handleApiResponse(res);
  } catch (error) {
    console.error("Connection error details:", error);
    throw error;
  }
};