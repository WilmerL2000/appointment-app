import { Link } from 'react-router-dom';
import { PatietnsList } from '../components';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux';

export const ManagePatients = () => {
  const { isLoading } = useSelector((state) => state.patient);

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between items-center text-white bg-indigo-600 md:p-3 p-2 rounded-lg">
        <p className="uppercase">Administra tus pacientes</p>
        <Link
          to="/admin/new-patient"
          className="font-medium bg-indigo-700 p-2 hover:cursor-pointer hover:bg-indigo-800  uppercase rounded-md flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <span className="md:block hidden">Nuevo paciente</span>
        </Link>
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <PatietnsList />
        )}
      </div>
    </div>
  );
};
