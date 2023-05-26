import { Link } from 'react-router-dom';
import { Title } from '../components';

export const NotFoundLogin = () => {
  return (
    <>
      <div>
        <Title mainText="Página no encontrada en" subText="APV" />
      </div>
      <div className="md:w-5/6 w-full mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <div className="flex justify-center">
          <Link
            to="/"
            className="bg-transparent hover:bg-indigo-500 w-2/3 text-center text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded-lg"
          >
            Regresar
          </Link>
        </div>
      </div>
    </>
  );
};
