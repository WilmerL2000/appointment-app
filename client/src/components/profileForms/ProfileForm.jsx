import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { profileSchema } from '../../schemas/schemas';
import { startChangeProfileInfo } from '../../store/thunks';
import { SubmitButton } from '../buttons';
import { InputText } from '../inputs';

function ProfileForm() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(startChangeProfileInfo(values));
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={user}
      validationSchema={profileSchema}
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
            <InputText label="Número de teléfono" name="phoneNumber" />
          </div>
          <div className="my-5">
            <InputText label="Sitio web" name="webPage" />
          </div>

          <div className=" flex justify-center">
            <SubmitButton text="Guardar cambios" />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ProfileForm;
