import React from 'react';
import axios from 'axios'; // Import Axios
import fileIcon from '../assets/upload-file-svgrepo-com.svg'; // Import the SVG file

class FileUpload extends React.Component {
  // Function to handle file selection
  handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Get the selected file
    const formData = new FormData();
    formData.append('file', file); // Append the file to the FormData object

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/upload/pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });
      console.log('File uploaded successfully:', response.data);
      localStorage.setItem('filename', response.data.filename);
      if (this.props.onSuccess) {
        this.props.onSuccess(); // Call onSuccess callback if provided
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  render() {
    return (
      <div>
        {/* Hidden file input */}
        <input
          type="file"
          id="fileInput"
          ref={(fileInput) => (this.fileInput = fileInput)}
          style={{ display: 'none' }}
          onChange={this.handleFileUpload}
        />
        {/* Button or icon to trigger file selection */}
        <button onClick={() => this.fileInput.click()}>
          {/* Plus icon or any other visual */}
          <img src={fileIcon} alt="Upload File" style={{ width: '20px', height: '20px' }} />
        </button>
      </div>
    );
  }
}

export default FileUpload;
