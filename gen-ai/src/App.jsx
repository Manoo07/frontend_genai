import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './components/Loader/Loader';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import UploadSidebar from './components/UploadSidebar';
import ChatWindow from './components/ChatWindow';
import FileUploadPage from './components/fileUploadPage';
 
const getMessageFromGenAI = async (user, url, setUrl) => {
  try {
    const response = await axios.post(url, {
      user
    });
    console.log(user);
    console.log(response.data.bot);
    const session_id = response.data.session_id;
    localStorage.setItem('session_id', session_id);
    console.log(url);
    if (!url.includes(session_id)) {
      const newUrl = `${url}${session_id}`;
      console.log(newUrl);
      setUrl(newUrl);
    }
    console.log(url);
 
    return response.data.bot;
 
  } catch (error) {
    console.error('Error communicating with GenAI API:', error);
    return 'An error occurred. Please try again.';
  }
};
 
const DatabaseChatWindow = ({ messages, sendMessage ,setUrl}) => {
  // const [databaseStateVariable, setDatabaseStateVariable] = useState(initialValue);
  // Add any other state variables specific to this component
  let session_id = localStorage.session_id
  console.log(session_id)
  setUrl(`http://127.0.0.1:8000/api/v1/sql-query/1/${session_id}`)
  return (
    <div>
      <h1>Query on Database</h1>
      <ChatWindow messages={messages} sendMessage={sendMessage} />
    </div>
  );
};
 
const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("http://127.0.0.1:8000/api/v1/query/1/");
  const location = useLocation();
  const navigate = useNavigate();
 
  const sendMessage = async (userInput) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/user/1/conversations`);
 
    const prevMessages = response.data.previous_chat;
 
    setLoading(true);
 
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'user', content: userInput },
    ]);
 
    const GenAIResponse = await getMessageFromGenAI(userInput, url, setUrl);
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'bot', content: GenAIResponse },
    ]);
 
    setLoading(false);
  };
 
  useEffect(() => {
    if (location.pathname === '/query/pdf' || location.pathname === '/query/database') {
      setMessages([]);
    }
  }, [location.pathname]);
 
  const handleQueryDatabaseClick = () => {
    navigate('/query/database');
  };
 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl flex flex-row-reverse font-bold mb-4"><button onClick={() => {
        navigate('/')
      }}>Generative AI</button></h1>
      <div className="flex">
        <UploadSidebar />
        <Routes>
          <Route path="/query/pdf" element={<FileUploadPage setUrl={setUrl} messages={messages} sendMessage={sendMessage} />} />
          <Route path="/" element={<ChatWindow messages={messages} sendMessage={sendMessage} />} />
          <Route path="/query/database" element={<DatabaseChatWindow messages={messages} sendMessage={sendMessage} setUrl = {setUrl}/>} />
        </Routes>
        {loading && <Loader />}
      </div>
      <div>
        <button onClick={handleQueryDatabaseClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Query Database</button>
      </div>
    </div>
  );
};
 
export default App;
 