import { useDispatch } from 'react-redux';
import { setActivePatient, setPatientId } from '../../store/patientSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../Modal';

function PatienItem({ patients = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  /**
   * The function `dateFormatter` formats a given date into a long date string in the Spanish language.
   * @returns The `dateFormatter` function is returning a formatted date string in the long format for
   * the specified locale (in this case, 'es-CR'). The input `date` is being converted to a `Date`
   * object and then formatted using the `Intl.DateTimeFormat` constructor.
   */
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
          className="bg-white md:p-10 p-5 rounded-md mb-8 lg:mb-0 shadow-md space-y-3 lg:gap-0 md:justify-around break-all "
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
          <div className="flex gap-3 justify-between md:justify-around">
            <button
              className="font-medium bg-indigo-600 p-2 hover:cursor-pointer hover:bg-indigo-800 text-white uppercase rounded-md"
              onClick={() => {
                dispatch(setActivePatient(patient));
                navigate(`/admin/edit-patient/${patient.name}`);
              }}
            >
              Editar
            </button>
            <button
              className="font-medium bg-red-600 p-2 hover:cursor-pointer hover:bg-red-800 text-white uppercase rounded-md"
              onClick={() => {
                setOpen((prev) => !prev);
                dispatch(setPatientId(patient._id));
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      {open && <Modal setOpen={setOpen} />}
    </>
  );
}

export default PatienItem;
