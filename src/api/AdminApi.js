import API from "../services/api";

const BASE = "/admin";

/* ======================
   USERS
====================== */

// GET ALL USERS
export const getAllUsers = () => {
  return API.get(`${BASE}/users`);
};

// BAN USER
export const banUser = (userId) => {
  return API.post(`${BASE}/ban/${userId}`);
};

// UNBAN USER
export const unbanUser = (userId) => {
  return API.post(`${BASE}/unban/${userId}`);
};


/* ======================
   MESSAGES
====================== */

// GET ALL MESSAGES
export const getAllMessages = () => {
  return API.get(`${BASE}/messages`);
};

// DELETE MESSAGE
export const deleteMessage = (messageId) => {
  return API.delete(`${BASE}/messages/${messageId}`);
};


/* ======================
   ROOMS
====================== */

// GET ALL ROOMS
export const getAllRooms = () => {
  return API.get(`${BASE}/rooms`);
};

// DELETE ROOM
export const deleteRoom = (roomId) => {
  return API.delete(`${BASE}/rooms/${roomId}`);
};


/* ======================
   REPORTS / MODERATION
====================== */

// GET CHAT REPORTS (abuse reports, flagged messages, etc.)
export const getReports = () => {
  return API.get(`${BASE}/reports`);
};