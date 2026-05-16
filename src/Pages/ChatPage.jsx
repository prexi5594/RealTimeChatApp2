import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Users,
  Hash,
  Plus,
  LogOut,
} from 'lucide-react';

function ChatRooms() {
  const [selectedRoom, setSelectedRoom] = useState(1);

  const [messageInput, setMessageInput] =
    useState('');

  const [joinedRooms, setJoinedRooms] =
    useState([1]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Did you see the game last night? Amazing performance!',
      sender: 'Mike Johnson',
      avatar: '👨‍🦰',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      text: 'Yeah! That last goal was incredible! 🎉',
      sender: 'Sarah Davis',
      avatar: '👩',
      timestamp: '10:32 AM',
    },
    {
      id: 3,
      text: 'Which team are you supporting?',
      sender: 'You',
      avatar: '😊',
      timestamp: '10:33 AM',
    },
    {
      id: 4,
      text: 'Manchester United! Been supporting them for years',
      sender: 'Mike Johnson',
      avatar: '👨‍🦰',
      timestamp: '10:35 AM',
    },
    {
      id: 5,
      text: 'Nice! I support Liverpool, but respect the rivalry 😄',
      sender: 'You',
      avatar: '😊',
      timestamp: '10:36 AM',
    },
  ]);

  const chatRooms = [
    {
      id: 1,
      name: 'Sports',
      topic: 'Sports & Athletics',
      icon: '⚽',
      members: 234,
      description:
        'Discuss football, basketball, tennis, and more!',
      joined: true,
    },
    {
      id: 2,
      name: 'Politics',
      topic: 'Politics & Government',
      icon: '🏛️',
      members: 189,
      description:
        'Political discussions and debates',
      joined: false,
    },
    {
      id: 3,
      name: 'Fashion',
      topic: 'Fashion & Style',
      icon: '👗',
      members: 312,
      description:
        'Latest trends, tips, and fashion advice',
      joined: false,
    },
    {
      id: 4,
      name: 'Real Estate',
      topic: 'Real Estate & Property',
      icon: '🏠',
      members: 156,
      description:
        'Property listings, investment tips, and advice',
      joined: false,
    },
  ];

  const selectedChatRoom = chatRooms.find(
    r => r.id === selectedRoom
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: messageInput,
          sender: 'You',
          avatar: '😊',
          timestamp:
            new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
        },
      ]);

      setMessageInput('');
    }
  };

  const handleJoinRoom = roomId => {
    if (!joinedRooms.includes(roomId)) {
      setJoinedRooms([
        ...joinedRooms,
        roomId,
      ]);

      setSelectedRoom(roomId);
    } else {
      setSelectedRoom(roomId);
    }
  };

  const handleLeaveRoom = roomId => {
    setJoinedRooms(
      joinedRooms.filter(id => id !== roomId)
    );

    if (selectedRoom === roomId) {
      const firstRoom = joinedRooms.find(
        id => id !== roomId
      );

      if (firstRoom) {
        setSelectedRoom(firstRoom);
      }
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0052CC] to-[#0052CC] text-white py-4 px-6 shadow-md">
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

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Chat Rooms
              </h2>

              <button className="p-1 hover:bg-gray-100 rounded-lg transition">
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

          {/* Rooms */}
          <div className="flex-1 overflow-y-auto">
            {/* Joined */}
            {joinedRooms.length > 0 && (
              <div>
                <div className="px-4 py-2 text-xs font-bold text-gray-700 uppercase">
                  Joined Rooms
                </div>

                {chatRooms
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

            {/* Available */}
            {chatRooms.some(
              room =>
                !joinedRooms.includes(room.id)
            ) && (
              <div>
                <div className="px-4 py-2 text-xs font-bold text-gray-700 uppercase">
                  Available Rooms
                </div>

                {chatRooms
                  .filter(
                    room =>
                      !joinedRooms.includes(
                        room.id
                      )
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
            )}
          </div>
        </div>

        {/* Chat Window */}
        {selectedChatRoom && (
          <div className="flex-1 flex flex-col bg-white">
            {/* Header */}
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
                    {
                      selectedChatRoom.description
                    }
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Users size={14} />
                    {
                      selectedChatRoom.members
                    }{' '}
                    members in this room
                  </div>
                </div>
              </div>

              {joinedRooms.includes(
                selectedChatRoom.id
              ) && (
                <button
                  onClick={() =>
                    handleLeaveRoom(
                      selectedChatRoom.id
                    )
                  }
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm font-semibold"
                >
                  Leave Room
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                    {msg.avatar}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-gray-900 text-sm">
                        {msg.sender}
                      </span>

                      <span className="text-xs text-gray-500">
                        {msg.timestamp}
                      </span>
                    </div>

                    <p className="text-gray-700 mt-1">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
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
    </div>
  );
}

export default ChatRooms;