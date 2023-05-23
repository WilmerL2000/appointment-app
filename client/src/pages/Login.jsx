import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { initialValuesLogin } from '../schemas/initialValues';
import { loginSchema } from '../schemas/schemas';
import { Title } from '../components';
import { SubmitButton } from '../components/buttons';
import { InputPassword, InputText } from '../components/inputs';
import { login } from '../api/v1/functions';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values, onSubmitProps) => {
    await login(values).then((token) => dispatch(setToken({ token })));
    onSubmitProps.resetForm();
    navigate('/admin');
  };

  return (
    <>
      <div>
        <Title mainText="Inicia Sesión y Administra tus" subText="Pacientes" />
      </div>
      <div className="md:w-5/6 w-full mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <Formik
          onSubmit={handleLogin}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
        >
          {() => (
            <Form>
              <div className="my-5">
                <InputText label="Email" name="email" />
              </div>
              <div className="my-5">
                <InputPassword label="Contraseña" name="password" />
              </div>
              <div className=" flex justify-center">
                <SubmitButton text="Iniciar sesión" />
              </div>
            </Form>
          )}
        </Formik>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/register" className="block text-center my-5 text-gray-500">
            ¿No tienes una cuenta? Registrate
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
