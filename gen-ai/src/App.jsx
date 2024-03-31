import { useState,useEffect } from 'react';
import axios from 'axios';
import Loader from './components/Loader/Loader';
import { BrowserRouter, Routes, Route ,useLocation} from 'react-router-dom';
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
    localStorage.setItem('session_id',session_id)
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

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("http://127.0.0.1:8000/api/v1/query/1/");
  const location = useLocation();


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
    if (location.pathname === '/query/pdf') {

      setMessages([]);
    }
  }, [location.pathname]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl flex flex-row-reverse font-bold mb-4">Generative AI</h1>
        <div className="flex">
          <UploadSidebar />
          <Routes>
            <Route path="/query/pdf" element={<FileUploadPage setUrl={setUrl} messages={messages} sendMessage={sendMessage}/>} />
            <Route path="/" element={<ChatWindow messages={messages} sendMessage={sendMessage} />} />
          </Routes>
          {loading && <Loader />}
        </div>
    </div>
  );
};

export default App;
