import PatienItem from './PatientItem';
import { useSelector } from 'react-redux';

function PatienList() {
  const { patients } = useSelector((state) => state.patient);

  return (
    <div className="md:px-10 px-5 py-8 bg-gray-200 rounded-lg lg:grid lg:grid-cols-3 gap-5">
      {patients.length ? (
        <PatienItem patients={patients} />
      ) : (
        <div className="font-bold text-xl">No hay pacientes</div>
      )}
    </div>
  );
}

export default PatienList;
