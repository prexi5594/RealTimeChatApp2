import API from "../services/api";

const BASE_URL = "https://realtimechatappbackend-y8z2.onrender.com/admin";


export const getAllUsers = () => {
  return API.get(`${BASE_URL}/users`);
};

// BAN USER
export const banUser = (userId) => {
  return API.post(`${BASE_URL}/ban/${userId}`);
};

// UNBAN USER
export const unbanUser = (userId) => {
  return API.post(`${BASE_URL}/unban/${userId}`);
};



// GET ALL MESSAGES
export const getAllMessages = () => {
  return API.get(`${BASE_URL}/messages`);
};

// DELETE MESSAGE
export const deleteMessage = (messageId) => {
  return API.delete(`${BASE_URL}/messages/${messageId}`);
};




// GET ALL ROOMS
export const getAllRooms = () => {
  return API.get(`${BASE_URL}/rooms`);
};

// DELETE ROOM
export const deleteRoom = (roomId) => {
  return API.delete(`${BASE_URL}/rooms/${roomId}`);
};



// GET CHAT REPORTS (abuse reports, flagged messages, etc.)
export const getReports = () => {
  return API.get(`${BASE_URL}/reports`);
};