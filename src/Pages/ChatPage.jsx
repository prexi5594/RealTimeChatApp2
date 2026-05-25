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


  const chatRooms = [
    {
      id: 1,
      name: 'Sports',
      topic: 'Sports & Athletics',
      icon: '⚽',
      members: 234,
      description:
        'Discuss football, basketball, tennis, and more!',
    },

    {
      id: 2,
      name: 'Politics',
      topic: 'Politics & Government',
      icon: '🏛️',

      description:
        'Political discussions and debates',
    },

    {
      id: 3,
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

      const data = await fetchMessages(selectedChatRoom.name.toLowerCase());

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
  room: selectedChatRoom.name.toLowerCase(),
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

  const handleLeaveRoom = roomId => {

    const updatedRooms =
      joinedRooms.filter(
        id => id !== roomId
      );

    setJoinedRooms(updatedRooms);

    if (
      selectedRoom === roomId &&
      updatedRooms.length > 0
    ) {
      setSelectedRoom(updatedRooms[0]);
    }
  };

  //CREATE ROOM HANDLER
  
  const handleCreateRoom = async () => {

  if (!newRoomName.trim()) {
    alert("Room name is required");
    return;
  }

  const newRoom = {
    id: Date.now(),
    name: newRoomName,
    topic: newRoomTopic,
    description: newRoomDescription,
    icon: "💬",
    members: 1,
  };

  setCustomRooms([
    ...customRooms,
    newRoom
  ]);

  setJoinedRooms([
    ...joinedRooms,
    newRoom.id
  ]);

  setSelectedRoom(newRoom.id);

  setShowModal(false);

  setNewRoomName('');
  setNewRoomTopic('');
  setNewRoomDescription('');
};

const handleDeleteRoom = (roomId) => {

  // remove room from custom rooms
  const updatedRooms =
    customRooms.filter(
      room => room.id !== roomId
    );

  setCustomRooms(updatedRooms);

  // remove joined state
  const updatedJoined =
    joinedRooms.filter(
      id => id !== roomId
    );

  setJoinedRooms(updatedJoined);

  // switch to first room
  setSelectedRoom(1);
};

const handleDeleteMessage = async (messageId) => {
  try {
    await deleteMessage(messageId);
    loadMessages(); // refresh chat
  } catch (err) {
    console.log("Delete error:", err);
  }
};

  
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
                      key={`${room.id}-${room.name}`}

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
                    key={`${room.id}-${room.name}`}

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
    {showRoomMenu && (
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

              {messages.map(msg => (
                

                <div
                  key={msg.id}
                  className="flex gap-3"
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
      </div>
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
              onChange={(e) =>
                setNewRoomName(e.target.value)
              }
              className="w-full border p-3 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Topic"
              value={newRoomTopic}
              onChange={(e) =>
                setNewRoomTopic(e.target.value)
              }
              className="w-full border p-3 rounded mb-3"
            />

            <textarea
              placeholder="Description"
              value={newRoomDescription}
              onChange={(e) =>
                setNewRoomDescription(e.target.value)
              }
              className="w-full border p-3 rounded mb-4"
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={() =>
                  setShowModal(false)
                }
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
  );
}


export default ChatRooms;