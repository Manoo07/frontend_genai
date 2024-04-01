import { Link } from 'react-router-dom';

const UploadButton = () => {
  return (
    <div className="my-2">
      <Link to="/query/pdf" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload file
      </Link>
    </div>
  );
};

export default UploadButton;

