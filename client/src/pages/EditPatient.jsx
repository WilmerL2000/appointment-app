import { useParams } from 'react-router-dom';
import { FormPatient } from '../components';

export const EditPatient = () => {
  const { id } = useParams();

  return (
    <div className=" flex flex-col items-center">
      <div className=" md:w-2/5">
        <FormPatient />
      </div>
    </div>
  );
};
