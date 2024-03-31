import React from 'react';

const Sidebar = ({ previousChats, onSelectChat, selectedChat, onNewChat }) => {
  return (
    <div className="sidebar bg-gray-200 p-4">
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={onNewChat}
      >
        New Chat
      </button>
      <h2 className="text-lg font-bold mb-4">Previous Chats</h2>
      <ul>
        {previousChats.map(chat => (
          <li
            key={chat.id}
            className={`cursor-pointer py-2 px-4 rounded-md mb-2 ${
              selectedChat === chat.id ? 'bg-gray-300' : ''
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
