import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { forgotPasswordSchema } from '../schemas/schemas';
import { Title } from '../components';
import { SubmitButton } from '../components/buttons';
import { InputText } from '../components/inputs';
import { forgotPassword } from '../api/v1/functions';

export const ForgotPassword = () => {
  /**
   * This function handles the submission of a forgot password form by calling the forgotPassword
   * function with the provided email and resetting the form.
   */
  const handleForgotPassword = async ({ email }, onSubmitProps) => {
    await forgotPassword(email);
    onSubmitProps.resetForm();
  };

  return (
    <>
      <div>
        <Title
          mainText="Recupera tu Acceso y no Pierdas"
          subText="tus Pacientes"
        />
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <Formik
          onSubmit={handleForgotPassword}
          initialValues={{ email: '' }}
          validationSchema={forgotPasswordSchema}
        >
          {() => (
            <Form>
              <div className="my-5">
                <InputText label="Email" name="email" />
              </div>

              <div className=" flex justify-center">
                <SubmitButton text="Enviar instrucciones" />
              </div>
            </Form>
          )}
        </Formik>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link to="/register" className="block text-center my-5 text-gray-500">
            ¿No tienes una cuenta? Registrate
          </Link>
        </nav>
      </div>
    </>
  );
};
