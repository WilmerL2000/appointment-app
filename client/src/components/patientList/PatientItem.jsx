import { useDispatch } from 'react-redux';
import { setActivePatient } from '../../store/patientSlice';

function PatienItem({ patients = [] }) {
  const dispatch = useDispatch();

  const dateFormatter = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat('es-CR', { dateStyle: 'long' }).format(
      newDate
    );
  };

  return (
    <>
      {patients?.map((patient) => (
        <div
          key={patient._id}
          className="bg-white py-10 px-5 rounded-md mb-8 shadow-md space-y-3 lg:gap-0 md:justify-around break-all"
        >
          <div>
            <p className="font-semibold uppercase text-indigo-700">
              Nombre mascota
            </p>
            <span className="text-black">{patient.name}</span>
          </div>
          <div>
            <p className="font-semibold uppercase text-indigo-700">
              Propietario
            </p>
            <span className="text-black">{patient.owner}</span>
          </div>
          <div>
            <p className="font-semibold uppercase text-indigo-700">Email</p>
            <span className="text-black">{patient.email}</span>
          </div>
          <div>
            <p className="font-semibold uppercase text-indigo-700">
              Fecha alta
            </p>
            <span className="text-black">
              {dateFormatter(patient.dischargeDate)}
            </span>
          </div>
          <div>
            <p className="font-semibold uppercase text-indigo-700 ">Síntomas</p>
            <span className="text-black ">{patient.symptoms}</span>
          </div>
          <div className="flex gap-3 justify-between ">
            <button
              className="font-medium bg-indigo-600 p-2 hover:cursor-pointer hover:bg-indigo-800 text-white uppercase rounded-md"
              onClick={() => {
                dispatch(setActivePatient(patient));
              }}
            >
              Editar
            </button>
            <button
              className="font-medium bg-red-600 p-2 hover:cursor-pointer hover:bg-red-800 text-white uppercase rounded-md"
              onClick={() => {
                // dispatch();
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default PatienItem;
