import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Send,
  Users,
  Hash,
  Plus,
  LogOut,
  MoreVertical,
} from 'lucide-react';

import {
  fetchMessages,
  sendMessage,
} from '../api/ChatApi';
import { createChatRoom } from '../api/ChatApi';
import { deleteChatRoom } from '../api/ChatApi';
import { deleteMessage } from '../api/ChatApi';
import { toast } from 'react-toastify';

function ChatRooms() {

  const [selectedRoom, setSelectedRoom] =
    useState(1);

  const [messageInput, setMessageInput] =
    useState('');

  const [joinedRooms, setJoinedRooms] =
    useState([1]);


  const [messages, setMessages] =
    useState([]);

  const [showModal, setShowModal] = useState(false);

  const [customRooms, setCustomRooms] = useState([]); 

  const [newRoomName, setNewRoomName] = useState('');

  const [newRoomTopic, setNewRoomTopic] = useState('');

  const [newRoomDescription, setNewRoomDescription] = useState('');

  const [showRoomMenu, setShowRoomMenu] = useState(false);

  const [selectedMessageID, setSelectedMessageID] = useState(null);

  const [showMessageMenu, setShowMessageMenu] = useState(false);


  const DEFAULT_ROOM = {
  id: 1,
  name: "General",
  topic: "Welcome",
  icon: "🏠",
  description: "Say hi, meet people, and start conversations"
};


  const chatRooms = [
    
     
    {
      id: 2,
      name: 'Sports',
      topic: 'Sports & Athletics',
      icon: '⚽',
      members: 234,
      description:
        'Discuss football, basketball, tennis, and more!',
    },

    {
      id: 3,
      name: 'Politics',
      topic: 'Politics & Government',
      icon: '🏛️',

      description:
        'Political discussions and debates',
    },

    {
      id: 4,
      name: 'Fashion',
      topic: 'Fashion & Style',
      icon: '👗',
      description:
        'Latest trends, tips, and fashion advice',
    },

  ];

  
  // =========================
  // CURRENT ROOM
  // =========================
  
  const allRooms = [
  ...chatRooms,
  ...customRooms,
  DEFAULT_ROOM
    ];

  const selectedChatRoom =
    allRooms.find(
      room => room.id === selectedRoom
    );

  // =========================
  // LOAD MESSAGES
  // =========================
  const loadMessages = async () => {

    if (!selectedChatRoom) return;

    try {

      const data = await fetchMessages(selectedChatRoom.id);

      setMessages(Array.isArray(data) ? data : data.messages || []);
    } catch (error) {
      console.log(
        "Error loading messages:",
        error
      );
    }
  };

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSendMessage = async () => {

    if (!messageInput.trim()) return;

    try {

      const username =
        localStorage.getItem("username")
        || "Anonymous";

      await sendMessage({
  username,
  roomId: selectedChatRoom.id,
  message: messageInput,
      });

      setMessageInput('');
      loadMessages();

    } catch (error) {

      console.log(
        "Error sending message:",
        error
      );
    }
  };

  // =========================
  // POLLING
  // =========================
  useEffect(() => {
  setMessages([]); //  CLEAR OLD ROOM MESSAGES FIRST

  loadMessages();

  const interval = setInterval(() => {
    loadMessages();
  }, 2000);

  return () => clearInterval(interval);

  const handleClickOutside = () => {
    setShowRoomMenu(false);
  };

  if (showRoomMenu) {
    window.addEventListener('click', handleClickOutside);
  }

  return () => {
    window.removeEventListener('click', handleClickOutside);
  };

}, [selectedRoom]);

  
  // JOIN ROOM
 
  const handleJoinRoom = roomId => {

    if (!joinedRooms.includes(roomId)) {

      setJoinedRooms([
        ...joinedRooms,
        roomId,
      ]);
    }

    setSelectedRoom(roomId);
  };

  
  // LEAVE ROOM

  const handleLeaveRoom = (roomId) => {
  const updatedRooms = joinedRooms.filter(id => id !== roomId);

  setJoinedRooms(updatedRooms);

  if (updatedRooms.length === 0) {
    setSelectedRoom(0); // always fallback to General
    return;
  }

  if (selectedRoom === roomId) {
    setSelectedRoom(updatedRooms[0]);
  }
};
  // ROOM HANDLER
  
const handleCreateRoom = async () => {
  if (!newRoomName.trim()) {
    toast.error("Room name is required");
    return;
  }

  const loadingToast = toast.loading("Creating your chat room...");

  try {
    // 1. Send the new room to your Flask API
    const res = await fetch("https://realtimechatappbackend-lkza.onrender.com/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newRoomName,
        topic: newRoomTopic || "General Discussion",
        description: newRoomDescription || "A custom created chatroom."
      }),
    });

    const data = await res.json();
    toast.dismiss(loadingToast);

    if (!res.ok) {
      toast.error(data.error || "Failed to create room");
      return;
    }

    // 2. Builds the structural room object using the ID from the DATABASE backend!
    const backendRoom = {
      id: data.room.id, 
      name: data.room.name,
      topic: newRoomTopic || "General Discussion",
      description: newRoomDescription || "A custom created chatroom.",
      icon: "💬",
      members: 1,
    };

    // 3. Update your React local states cleanly
    setCustomRooms([...customRooms, backendRoom]);
    setJoinedRooms([...joinedRooms, backendRoom.id]);
    
    // 4. Clear form input fields
    setNewRoomName("");
    setNewRoomTopic("");
    setNewRoomDescription("");
    setShowModal(false);
    
    toast.success(`Welcome to #${backendRoom.name.toLowerCase()}!`);

  } catch (error) {
    toast.dismiss(loadingToast);
    console.error("Error creating room:", error);
    toast.error("Could not connect to server to create room.");
  }
};


const handleDeleteMessage = async (messageId) => {
  try {
    const idToDelete =
      messageId ?? selectedMessageID;

    console.log("Deleting message:", idToDelete);

    if (idToDelete === undefined || idToDelete === null) {
      console.log("No message ID found");
      return;
    }

    const response = await deleteMessage(idToDelete);
    console.log("Delete response:", response);

    
    setMessages(prevMessages =>
      prevMessages.map(msg => {
        const msgId = msg.id ?? msg._id;

        if (msgId === idToDelete) {
          return {
            ...msg,
            message: "Message deleted",
            isDeleted: true
          };
        }

        return msg;
      })
    );

    setShowMessageMenu(false);
    setSelectedMessageID(null);

  } catch (err) {
    console.log("Delete error:", err);
  }
};


const handleDeleteRoom = (roomId) => {
  if (!roomId) return;

  // Create a custom confirmation toast with action buttons
  toast.info(
    <div>
      <p className="font-semibold mb-2 text-gray-800">Delete this room permanently?</p>
      <div className="flex gap-2 justify-end">
        <button 
          className="bg-gray-200 text-gray-800 px-2 py-1 text-xs rounded font-medium hover:bg-gray-300 transition"
          onClick={() => toast.dismiss()}
        >
          Cancel
        </button>
        <button 
          className="bg-red-600 text-white px-2 py-1 text-xs rounded font-medium hover:bg-red-700 transition"
          onClick={async () => {
            toast.dismiss(); // Close confirmation
            await proceedWithDelete(roomId); // Run actual deletion
          }}
        >
          Confirm
        </button>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: false, // Don't close automatically
      closeOnClick: false,
      draggable: false
    }
  );
};

// Helper function that actually talks to your Flask backend
const proceedWithDelete = async (roomId) => {
  const loadingToast = toast.loading("Deleting room from database...");
  try {
    const res = await fetch(`http://127.0.0.1:5000/rooms/${roomId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    toast.dismiss(loadingToast);

    if (!res.ok) {
      toast.error(data.error || "Failed to remove room");
      return;
    }


    setCustomRooms(customRooms.filter((room) => room.id != roomId));
    setJoinedRooms(joinedRooms.filter((id) => id != roomId));
    if (selectedRoom?.id == roomId) {
      setSelectedRoom(allRooms.find(r => r.id == 1) || null);
    }

    toast.success("Room deleted!");
  } catch (error) {
    toast.dismiss(loadingToast);
    console.error(error);
    toast.error("Network error during deletion");
  }
};
const handleLongPress = (msgId) => {
  setSelectedMessageID(msgId);
  setShowMessageMenu(true);
};

useEffect(() => {
  const disableContextMenu = (e) => {
    e.preventDefault();
  };

  document.addEventListener("contextmenu", disableContextMenu);

  return () => {
    document.removeEventListener("contextmenu", disableContextMenu);
  };
}, []);

  
  return (
    <div className="h-screen bg-white flex flex-col">

      {/* HEADER */}
      <header className="bg-[#0052CC] text-white py-4 px-6 shadow-md">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">

            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-[#0052CC] font-bold text-lg">
                Q
              </span>
            </div>

            <span className="text-xl font-bold">
              Quickchat Rooms
            </span>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-white text-[#0052CC] rounded font-semibold hover:bg-gray-100 transition text-sm"
          >
            <LogOut size={16} />
            Logout
          </Link>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <div className="w-80 border-r border-gray-200 flex flex-col bg-white">

          <div className="p-4 border-b border-gray-200">

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-lg font-bold text-gray-900">
                Chat Rooms
              </h2>

              
                <button
                  onClick={() =>
                    setShowModal(true)
                  }
                  className="p-1 hover:bg-gray-100 rounded-lg transition"
                >
                <Plus
                  size={20}
                  className="text-[#0052CC]"
                />
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Join a room to start chatting
            </p>
          </div>

          {/* ROOMS */}
          <div className="flex-1 overflow-y-auto">

            {/* JOINED ROOMS */}
            {joinedRooms.length > 0 && (
              <div>

                <div className="px-4 py-2 text-xs font-bold text-gray-700 uppercase">
                  Joined Rooms
                </div>

                {allRooms
                  .filter(room =>
                    joinedRooms.includes(room.id)
                  )
                  .map(room => (

                    <button
                      key={room.id}

                      onClick={() =>
                        setSelectedRoom(room.id)
                      }

                      className={`w-full text-left p-3 mx-2 my-1 rounded-lg transition ${
                        selectedRoom === room.id
                          ? 'bg-blue-100 border-l-4 border-l-[#0052CC]'
                          : 'hover:bg-gray-100'
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div className="text-2xl">
                          {room.icon}
                        </div>

                        <div className="flex-1 min-w-0">

                          <h3 className="font-semibold text-gray-900">
                            {room.name}
                          </h3>

                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Users size={12} />
                            {room.members} members
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            )}

            {}
            <div>

              <div className="px-4 py-2 text-xs font-bold text-gray-700 uppercase">
                Available Rooms
              </div>

              {allRooms
                .filter(room =>
                  !joinedRooms.includes(room.id)
                )
                .map(room => (

                  <button
                    key={room.id}

                    onClick={() =>
                      handleJoinRoom(room.id)
                    }

                    className="w-full text-left p-3 mx-2 my-1 rounded-lg hover:bg-gray-100 transition"
                  >

                    <div className="flex items-center gap-3">

                      <div className="text-2xl">
                        {room.icon}
                      </div>

                      <div className="flex-1 min-w-0">

                        <h3 className="font-semibold text-gray-900">
                          {room.name}
                        </h3>

                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Users size={12} />
                          {room.members} members
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-blue-600 mt-2 font-semibold">
                      + Join
                    </p>
                  </button>
                ))}
            </div>
          </div>
        </div>

        {}
        {selectedChatRoom && (

          <div className="flex-1 flex flex-col bg-white">

            {/* ROOM HEADER */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">

              <div className="flex items-center gap-3">

                <div className="text-4xl">
                  {selectedChatRoom.icon}
                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <Hash
                      size={18}
                      className="text-gray-600"
                    />

                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedChatRoom.name}
                    </h2>
                  </div>

                  <p className="text-sm text-gray-600">
                    {selectedChatRoom.description}
                  </p>
                </div>
              </div>

              {joinedRooms.includes(selectedChatRoom.id) && (
  <div className="relative">

    {/* 3-dot button */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        setShowRoomMenu(prev => !prev);
      }}
      className="p-2 rounded hover:bg-gray-100"
    >
      <MoreVertical size={20} />
    </button>

    {/* Dropdown */}
    {showRoomMenu && selectedChatRoom?.id !== 1 && (
      <div
        className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Leave Room */}
        <button
          onClick={() => {
            handleLeaveRoom(selectedChatRoom.id);
            setShowRoomMenu(false);
          }}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
        >
          Leave Room
        </button>

        {/* Delete Room (only custom rooms) */}
        {customRooms.some(
          room => room.id === selectedChatRoom.id
        ) && (
          <button
            onClick={() => {
              handleDeleteRoom(selectedChatRoom.id);
              setShowRoomMenu(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
          >
            Delete Room
          </button>
        )}

      </div>
    )}

  </div>
)}

                
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">

              {messages.map((msg, index) => (
                <div
                 key={msg.id ?? msg._id ?? index}
                  onContextMenu={() => {
                  setSelectedMessageID(msg.id ?? msg._id ?? index);
                  setShowMessageMenu(true);
                 }}
                >

                  {/* USER ICON */}
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">

                    {msg.username
                      ? msg.username[0]
                          .toUpperCase()
                      : "A"}
                  </div>

                  {/* MESSAGE */}
                  <div className="flex-1">

                    <div className="flex items-baseline gap-2">

                      <span className="font-semibold text-gray-900 text-sm">
                        {msg.username}
                      </span>

                      <span className="text-xs text-gray-500">

                        {msg.timestamp
                          ? new Date(
                              msg.timestamp
                            ).toLocaleTimeString()
                          : ""}
                      </span>
                    </div>

                    <p
  className={`mt-1 ${
    msg.isDeleted
      ? "text-gray-400 italic"
      : "text-gray-700"
  }`}
>
  
  {msg.isDeleted ? "Message deleted" : msg.message}

                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-4 border-t border-gray-200 bg-white">

              <div className="flex gap-2">

                <input
                  type="text"

                  value={messageInput}

                  onChange={e =>
                    setMessageInput(
                      e.target.value
                    )
                  }

                  onKeyDown={e =>
                    e.key === 'Enter' &&
                    handleSendMessage()
                  }

                  placeholder={`Message #${selectedChatRoom.name.toLowerCase()}...`}

                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                />

                <button
                  onClick={handleSendMessage}

                  className="bg-[#00B85C] hover:bg-[#009950] text-white p-2 rounded-lg transition"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MESSAGE MENU */}
{showMessageMenu && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={() =>{
        setShowMessageMenu(false);
        setSelectedMessageID(null);
      }}
      >
    <div className="bg-white rounded-lg shadow-lg w-40 overflow-hidden"
         onClick={(e) => e.stopPropagation()}>
      <button
  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
  onClick={() => {
    handleDeleteMessage(selectedMessageID);
    setShowMessageMenu(false);
    setSelectedMessageID(null);
  }}
>
  Delete Message
</button>

      <button
        className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 text-sm"
        onClick={() => {
          setShowMessageMenu(false);
          setSelectedMessageID(null);
        }}
      >
        Cancel
      </button>

    </div>
  </div>
)}

{/* CREATE ROOM MODAL */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-96 shadow-xl">

      <h2 className="text-2xl font-bold mb-4">
        Create Chat Room
      </h2>

      <input
        type="text"
        placeholder="Room Name"
        value={newRoomName}
        onChange={(e) => setNewRoomName(e.target.value)}
        className="w-full border p-3 rounded mb-3"
      />

      <input
        type="text"
        placeholder="Topic"
        value={newRoomTopic}
        onChange={(e) => setNewRoomTopic(e.target.value)}
        className="w-full border p-3 rounded mb-3"
      />

      <textarea
        placeholder="Description"
        value={newRoomDescription}
        onChange={(e) => setNewRoomDescription(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleCreateRoom}
          className="px-4 py-2 bg-[#0052CC] text-white rounded"
        >
          Create
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

         

    

export default ChatRooms;