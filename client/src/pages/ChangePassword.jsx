import { ProfileNav } from '../components';
import { ChangePasswordForm } from '../components/profileForms';

export const ChangePassword = () => {
  return (
    <>
      <ProfileNav />
      <h2 className="font-black text-xl md:text-2xl mt-10 uppercase text-center">
        Cambiar <span className="text-indigo-600">contraseña</span>
      </h2>
      <div className="flex justify-center mt-5">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5 ">
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
};
