import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLogout } from '../../store/authSlice';

function NavLinks({ routes = [], setOpen }) {
  const dispatch = useDispatch();
  return (
    <>
      {routes?.map(({ href, text }) => (
        <li key={text}>
          <Link
            to={href}
            onClick={() => setOpen((prev) => !prev)}
            className="block text-white rounded hover:bg-indigo-700 uppercase p-2"
          >
            {text}
          </Link>
        </li>
      ))}
      <li>
        <button
          className="block text-white rounded hover:bg-indigo-700 uppercase p-2"
          onClick={() => dispatch(setLogout())}
        >
          Cerrar sesión
        </button>
      </li>
    </>
  );
}
export default NavLinks;
