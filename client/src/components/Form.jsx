import { Formik } from 'formik';
import { InputPassword, InputText } from './inputs';
import { SubmitButton } from './buttons';

function Form() {
  const handlePatient = () => {};
  return (
    <p className="text-lg text-center mb-10">
      Añade tus pacientes y{' '}
      <span className="text-indigo-600 font-bold">Administralos</span>
      <>
        <Formik
          onSubmit={handlePatient}
          initialValues={{ email: '', password: '' }}
        >
          {() => (
            <Form>
              <div className="my-5">
                <InputText label="Nombre" name="name" />
              </div>

              <div className="my-5">
                <InputPassword label="Contraseña" name="password" />
              </div>

              <div className=" flex justify-center">
                <SubmitButton text="Crear cuenta" />
              </div>
            </Form>
          )}
        </Formik>
      </>
    </p>
  );
}

export default Form;
