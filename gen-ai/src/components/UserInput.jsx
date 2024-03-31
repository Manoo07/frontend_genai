import React, { useState, useRef } from 'react';
import Loader from './Loader/Loader';

const UserInput = ({ sendMessage }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleSendMessage = async () => {
    setLoading(true);
    await sendMessage(input);
    setInput('');
    setLoading(false);

    inputRef.current?.focus();
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-300 flex items-center">
      <input
        onKeyDown={
          (e)=>{
            if(e.key==='Enter')handleSendMessage()
          }
        }
        ref={inputRef}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask question ..."
      />
      <div className="w-4"></div> 
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-700"
        onClick={handleSendMessage}
        disabled={loading}
      >
        {loading ? <Loader className="w-6 h-6 mx-auto" /> : 'Send'}
      </button>
    </div>
  );
};

export default UserInput;


