import { Link } from 'react-router-dom';
import { Title } from '../components';

export const NotFoundAdmin = () => {
  return (
    <>
      <div className="flex justify-center">
        <Title mainText="Página no encontrada en" subText="APV" />
      </div>
      <div className="flex justify-center mt-5">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-10 ">
          <div className="flex justify-center">
            <Link
              to="/admin"
              className="bg-transparent hover:bg-indigo-500 w-2/3 text-center text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded-lg"
            >
              Regresar a Inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
