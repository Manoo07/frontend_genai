import { useState } from 'react';
import FileUpload from './fileUpload';
import ChatWindow from './ChatWindow';
import Loader from './Loader/Loader';

const FileUploadPage = ({ messages, sendMessage, setUrl }) => {
    const [fileUploaded, setFileUploaded] = useState(false); // State to track file upload
    const [isLoading, setIsLoading] = useState(false); // State to track loading state

    const handleFileUploadSuccess = () => {
        setFileUploaded(true); // Update file upload status to true
        setIsLoading(false); // Stop the loader after successful upload
    };

    const handleFileUploadStart = () => {
        setIsLoading(true); // Start the loader when user selects to upload the file
    };

    const { filename, session_id } = localStorage;
    console.log(filename, session_id);
    // Assuming these variables are stored in localStorage

    return (
        <div>
            <h2>Upload file and query</h2>
            <FileUpload onSuccess={handleFileUploadSuccess} onStart={handleFileUploadStart} />
            <ChatWindow messages={messages} sendMessage={sendMessage} />
            {isLoading && !fileUploaded && (
                // Display loader while uploading the file
                    <div>
                        <Loader/>
                        <p>Loading...</p>
                    </div>
            )}
            {fileUploaded && (
                // Once file is uploaded successfully, set the URL
                setUrl(`http://127.0.0.1:8000/api/v1/query/pdf/${filename}/1/${session_id}`)
            )}
        </div>
    );
};

export default FileUploadPage;
