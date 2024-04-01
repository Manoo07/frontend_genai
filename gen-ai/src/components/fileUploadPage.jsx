import { useState } from 'react';
import FileUpload from './fileUpload';
import ChatWindow from './ChatWindow';
import Loader from './Loader/Loader';

const FileUploadPage = ({ messages, sendMessage, setUrl }) => {
    const [fileUploaded, setFileUploaded] = useState(false); // State to track file upload
    const [isLoading, setIsLoading] = useState(false); // State to track loading state

    const handleFileUploadSuccess = () => {
        setIsLoading(false); // Turn off loader
        setFileUploaded(true); // Set fileUploaded to true after successful upload
    };

    const handleFileUploadStart = () => {
        setIsLoading(true); // Turn on loader
    };

    const { filename, session_id } = localStorage;
    console.log(filename, session_id);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className='flex'>
            <h2 className="text-3xl font-bold mb-3 ml-40 mr-3">Upload File and Query </h2>
            <div className="flex flex-col items-center"> 
                <FileUpload onSuccess={handleFileUploadSuccess} onStart={handleFileUploadStart} />
                <ChatWindow messages={messages} sendMessage={sendMessage} />
            </div>
            </div>
            {isLoading && (
                <div className="flex flex-col items-center mt-8">
                    <Loader />
                    <p className="mt-2">Uploading...</p>
                </div>
            )}
            {fileUploaded && (
                <div>
                    {setUrl(`http://127.0.0.1:8000/api/v1/query/pdf/${filename}/1/${session_id}`)}
                </div>
            )}
        </div>
    );
};

export default FileUploadPage;
