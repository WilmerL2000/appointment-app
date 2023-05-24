import { Formik, Form } from 'formik';
import { InputText, InputDate } from './inputs';
import { SubmitButton } from './buttons';
import { patientSchema } from '../schemas/schemas';
import { initialValuesPatient } from '../schemas/initialValues';
import { TextArea } from './textarea';
import { savePatient } from '../api/v1/functions';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPatient } from '../store/patientSlice';
import { useNavigate } from 'react-router-dom';

function FormPatient() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePatient = async (values, onSubmitProps) => {
    await savePatient({ token }, values).then((patient) =>
      dispatch(addNewPatient(patient))
    );
    onSubmitProps.resetForm();
    navigate('/admin');
  };
  return (
    <>
      <p className="text-lg text-center  mb-10">
        Añade tus pacientes y{' '}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>
      <div className="bg-white py-10 px-5 rounded-md mb-10 md:mb-0 shadow-md">
        <Formik
          onSubmit={handlePatient}
          initialValues={initialValuesPatient}
          validationSchema={patientSchema}
        >
          {() => (
            <Form>
              <div className="my-5">
                <InputText label="Nombre" name="name" />
              </div>
              <div className="my-5">
                <InputText label="Propietario" name="owner" />
              </div>
              <div className="my-5">
                <InputText label="Email" name="email" />
              </div>
              <div className="my-5">
                <InputDate label="Fecha de alta" name="dischargeDate" />
              </div>
              <div className="my-5">
                <TextArea
                  label="Síntomas"
                  name="symptoms"
                  placeHolder="Describe los síntomas"
                />
              </div>
              <div className=" flex justify-center">
                <SubmitButton text="Agregar paciente" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default FormPatient;
