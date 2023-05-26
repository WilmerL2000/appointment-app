import { Link } from 'react-router-dom';

function ProfileNav() {
  return (
    <nav className="flex justify-around bg-gray-200 p-2 rounded-lg">
      <Link
        to="/admin/profile"
        className="font-bold uppercase text-gray-500 hover:bg-gray-300 p-2 rounded-lg"
      >
        Perfil
      </Link>
      <Link
        to="/admin/change-password"
        className="font-bold uppercase text-gray-500 hover:bg-gray-300 p-2 rounded-lg"
      >
        Cambiar contraseña
      </Link>
    </nav>
  );
}

export default ProfileNav;
