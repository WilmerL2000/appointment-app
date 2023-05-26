import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../store/thunks';

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
          className="flex text-white rounded hover:bg-indigo-700 uppercase p-2 w-full"
          onClick={() => dispatch(startLogout())}
        >
          Cerrar sesión
        </button>
      </li>
    </>
  );
}
export default NavLinks;
