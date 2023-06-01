import { useSelector } from 'react-redux';
import Spinner from '../Spinner';

function SubmitButton({ text }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <button
      className="bg-indigo-700 w-full md:w-3/4 p-3 rounded-xl text-white uppercase 
      font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 "
      type="submit"
      disabled={loading}
    >
      {loading ? <Spinner /> : text}
    </button>
  );
}

export default SubmitButton;
