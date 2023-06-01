import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/v1/functions';
import { Title } from '../components';
import { SubmitButton } from '../components/buttons';
import { InputPassword, InputText } from '../components/inputs';
import { initialValuesRegister } from '../schemas/initialValues';
import { registerSchema } from '../schemas/schemas';
import { useDispatch } from 'react-redux';
import { startRegister } from '../store/thunks';

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * This function handles registration by dispatching a startRegister action with provided values and
   * navigation, and passing onSubmitProps.
   */
  const handleRegister = (values, onSubmitProps) => {
    dispatch(startRegister(values, navigate, onSubmitProps));
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
