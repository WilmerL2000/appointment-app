import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';

const routes = [
  { href: '/admin', text: 'Pacientes' },
  { href: '/admin/profile', text: 'Perfil' },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <p className="self-center text-2xl font-semibold text-indigo-200 lg:block hidden">
            Administrador de Pacientes de{' '}
            <span className="text-white font-black">Veterinaria</span>
          </p>
          <p className="self-center text-2xl lg:hidden font-semibold text-indigo-200 ">
            AP<span className="text-white font-black">V</span>
          </p>
        </Link>
        <div className="flex md:order-2 md:hidden">
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-white rounded-lg 
             focus:outline-none focus:ring-2 "
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            !open ? 'hidden' : 'mt-4 md:mt-0'
          } w-full md:flex md:w-auto md:order-1 `}
        >
          <hr />
          <ul className="flex flex-col md:flex-row font-medium gap-3 md:gap-7">
            <NavLinks routes={routes} setOpen={setOpen} />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
