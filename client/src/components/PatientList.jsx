import { Link } from 'react-router-dom';

const heads = [
  'Nombre mascota',
  'Propietario',
  'Email',
  'Fecha alta',
  'Sintomas',
  'Acciones',
];

function PatienList() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-hidden ">
      <table className="w-full text-sm text-gray-500 text-center">
        <thead className="text-md text-white uppercase bg-indigo-600  ">
          <tr>
            {heads.map((head, i) => (
              <th key={i} className="px-6 py-3">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center font-medium ">
          <tr className=" border-b bg-gray-200">
            <td className="px-6 py-4 ">Apple MacBook </td>
            <td className="px-6 py-4 ">Silver</td>
            <td className="px-6 py-4 w-1/5">wilmerlopezcespedes@gmail.com</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6  w-1/5 h-2">
              <span className="h-3  py-4">
                Ea nostrud velit aliquip consecteturEa nostrud velit aliquip
              </span>
            </td>
            <td className="px-6 py-4 flex gap-3 justify-center ">
              <Link
                to="/admin"
                className="font-medium bg-indigo-600 p-2 hover:cursor-pointer hover:bg-indigo-800 text-white uppercase rounded-md"
              >
                Editar
              </Link>
              <button
                className="font-medium bg-red-600 p-2 hover:cursor-pointer hover:bg-red-800 text-white uppercase rounded-md"
                onClick={() => {}}
              >
                Eliminar
              </button>
            </td>
          </tr>
          <tr className=" border-b bg-gray-200 divide-y-4">
            <td className="px-6 py-4 ">Apple MacBook </td>
            <td className="px-6 py-4 ">Silver</td>
            <td className="px-6 py-4 w-1/5">wilmerlopezcespedes@gmail.com</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6  w-1/5 ">
              <span className="h-3 py-4">
                Ea nostrud velit aliquip consecteturEa nostrud velit aliquip Ea
                nostrud velit aliquip consecteturEa nostrud velit aliquip
              </span>
            </td>
            <td className="px-6 py-4 flex gap-3 justify-center ">
              <Link
                to="/admin"
                className="font-medium bg-indigo-600 p-2 hover:cursor-pointer hover:bg-indigo-800 text-white uppercase rounded-md"
              >
                Editar
              </Link>
              <button
                className="font-medium bg-red-600 p-2 hover:cursor-pointer hover:bg-red-800 text-white uppercase rounded-md"
                onClick={() => {}}
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PatienList;
