import { Link } from 'react-router-dom';
import { PatietnsList } from '../components';

export const ManagePatients = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex">
        <Link
          to="/admin/new-patient"
          className="font-medium bg-indigo-600 p-2 hover:cursor-pointer hover:bg-indigo-800 text-white uppercase rounded-md"
        >
          Nuevo paciente
        </Link>
      </div>
      <div className="w-full ">
        <PatietnsList />
      </div>
    </div>
  );
};
