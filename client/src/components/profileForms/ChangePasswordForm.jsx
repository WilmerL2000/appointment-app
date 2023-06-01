import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { SubmitButton } from '../../components/buttons';
import { InputPassword } from '../../components/inputs';
import { changePasswordSchema } from '../../schemas/schemas';
import { startChangePassword } from '../../store/thunks';

function ChangePasswordForm() {
  const dispatch = useDispatch();

  const handleNewPassword = (values, onSubmitProps) => {
    dispatch(startChangePassword(values));
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      onSubmit={handleNewPassword}
      initialValues={{
        actualPassword: '',
        newPassword: '',
        passwordConfirmation: '',
      }}
      validationSchema={changePasswordSchema}
    >
      {() => (
        <Form>
          <div className="my-5">
            <InputPassword label="Contraseña actual" name="actualPassword" />
          </div>
          <div className="my-5">
            <InputPassword label="Nueva Contraseña" name="newPassword" />
          </div>
          <div className="my-5">
            <InputPassword
              label="Confirmar contraseña"
              name="passwordConfirmation"
            />
          </div>
          <div className=" flex justify-center">
            <SubmitButton text="Cambiar contraseña" />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ChangePasswordForm;
