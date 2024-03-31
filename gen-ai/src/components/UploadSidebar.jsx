import { Link } from 'react-router-dom';

const UploadSidebar = () => {
  return (
    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded">
      <Link to="/query/pdf">Upload file</Link>
    </div>
  );
};

export default UploadSidebar;
