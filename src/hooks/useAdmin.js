import { useEffect, useState } from "react";
import {
  fetchAllMessages,
  deleteMessage,
  deleteRoom,
} from "../admin/AdminApi";

export default function useAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    setLoading(true);
    const data = await fetchAllMessages();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const removeMessage = async (id) => {
    await deleteMessage(id);
    loadMessages();
  };

  const removeRoom = async (id) => {
    await deleteRoom(id);
    loadMessages();
  };

  return {
    messages,
    loading,
    removeMessage,
    removeRoom,
    refresh: loadMessages,
  };
}