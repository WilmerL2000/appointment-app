import { Formik, Form } from 'formik';
import { InputText, InputDate } from './inputs';
import { SubmitButton } from './buttons';
import { patientSchema } from '../schemas/schemas';
import { initialValuesPatient } from '../schemas/initialValues';
import { TextArea } from './textarea';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { startSavePatient, startUpdatePatient } from '../store/thunks';

function FormPatient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { activePatient } = useSelector((state) => state.patient);

  /**
   * The function `dateFormat` formats a given date into a string with the format "MM/DD/YYYY" using
   * the French-Canadian locale.
   * @returns The `dateFormat` function is returning a formatted date string in the format of
   * "MM/DD/YYYY" for the given `date` parameter. The format is specified using the
   * `Intl.DateTimeFormat` constructor with the options for month, year, and day.
   */
  const dateFormat = (date) => {
    return new Intl.DateTimeFormat('fr-CA', {
      month: '2-digit',
      year: 'numeric',
      day: '2-digit',
    }).format(date);
  };

  /**
   * The function modifies an active patient object by formatting the discharge date and returning the
   * rest of the patient object.
   * @returns The function `modifiedPatientObj` is returning an object that includes all the properties
   * of the `activePatient` object except for the `dischargeDate` property. The `dischargeDate`
   * property is being reformatted using the `dateFormat` function and added back to the object.
   */
  const modifiedPatientObj = () => {
    const { dischargeDate, ...restPatient } = activePatient;
    return {
      dischargeDate: dateFormat(new Date(dischargeDate)),
      ...restPatient,
    };
  };

  /**
   * This function handles the submission of a patient form and either saves a new patient or updates
   * an existing one depending on the URL path.
   */
  const handlePatient = (values, onSubmitProps) => {
    if (pathname.includes('/admin/new-patient')) {
      dispatch(startSavePatient(values));
    } else {
      dispatch(startUpdatePatient(values));
    }
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
          initialValues={
            pathname.includes('/admin/new-patient')
              ? initialValuesPatient
              : { ...modifiedPatientObj() }
          }
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
                {pathname.includes('/admin/new-patient') ? (
                  <SubmitButton text="Agregar paciente" />
                ) : (
                  <SubmitButton text="Actualizar paciente" />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default FormPatient;
