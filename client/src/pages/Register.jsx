import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { initialValuesRegister } from '../../schemas/initialValues';
import { registerSchema } from '../../schemas/schemas';
import Title from '../components/Title';
import { SubmitButton } from '../components/buttons';
import { InputPassword, InputText } from '../components/inputs';
import { register } from '../../api/v1/functions';

export const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (values, onSubmitProps) => {
    await register(values);
    // navigate('/');
  };

  return (
    <>
      <div>
        <Title
          mainText="Crea una Cuenta y Administra tus"
          subText="Pacientes"
        />
      </div>
      <div className="md:w-5/6 w-full mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <Formik
          onSubmit={handleRegister}
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
        >
          {() => (
            <Form>
              <div className="my-5">
                <InputText label="Nombre" name="name" />
              </div>
              <div className="my-5">
                <InputText label="Email" name="email" />
              </div>
              <div className="my-5">
                <InputPassword label="Contraseña" name="password" />
              </div>
              <div className="my-5">
                <InputPassword
                  label="Confirmar contraseña"
                  name="passwordConfirmation"
                />
              </div>
              <div className=" flex justify-center">
                <SubmitButton text="Crear cuenta" />
              </div>
            </Form>
          )}
        </Formik>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            to="/forgot-password"
            className="block text-center my-5 text-gray-500"
          >
            Olvidé mi contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};
