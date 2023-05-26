import { ProfileNav } from '../components';

export const ChangePassword = () => {
  return (
    <>
      <ProfileNav />
      <h2 className="font-black text-xl md:text-2xl mt-10 uppercase text-center">
        Cambiar <span className="text-indigo-600">contraseña</span>
        <div className="flex justify-center mt-5">
          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5 "></div>
        </div>
      </h2>
    </>
  );
};
