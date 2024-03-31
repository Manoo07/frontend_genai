import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Loader from './Loader/Loader';

const ChatWindow = ({ messages, sendMessage, loading }) => {
  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} loading={loading} />
      {loading && <Loader className="self-center mt-4" />} 
      <UserInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
