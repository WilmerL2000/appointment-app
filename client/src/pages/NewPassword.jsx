import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { newPasswordSchema } from '../schemas/schemas';
import { Title, Alert } from '../components';
import { SubmitButton } from '../components/buttons';
import { InputPassword } from '../components/inputs';
import { useEffect, useState } from 'react';
import { checkToken, restorePassword } from '../api/v1/functions';

export const NewPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  /**
   * The function handles the submission of a new password, restores the password using a token, resets
   * the form, and navigates to the home page after a delay.
   */
  const handleNewPassword = async ({ password, ...rest }, onSubmitProps) => {
    await restorePassword({ password, token });
    onSubmitProps.resetForm();
    setTimeout(() => {
      navigate('/');
    }, 2500);
  };

  useEffect(() => {
    return async () => {
      await checkToken(token).then((data) => {
        if (data?.error) {
          setMessage(data?.msg);
          setIsError(true);
        }
      });
    };
  }, []);

  return (
    <>
      <div>
        <Title
          mainText="Restablece tu contraseña y no pierdas acceso a"
          subText="tus Pacientes"
        />
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {isError ? (
          <Alert message={message} error={true} />
        ) : (
          <Formik
            onSubmit={handleNewPassword}
            initialValues={{ password: '', passwordConfirmation: '' }}
            validationSchema={newPasswordSchema}
          >
            {() => (
              <Form>
                <div className="my-5">
                  <InputPassword label="Nueva Contraseña" name="password" />
                </div>
                <div className="my-5">
                  <InputPassword
                    label="Confirmar contraseña"
                    name="passwordConfirmation"
                  />
                </div>

                <div className=" flex justify-center">
                  <SubmitButton text="Restablecer contraseña" />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};
