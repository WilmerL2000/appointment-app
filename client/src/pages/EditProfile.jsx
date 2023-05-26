import { ProfileNav } from '../components';
import { ProfileForm } from '../components/profileForms';

export const EditProfile = () => {
  return (
    <div>
      <ProfileNav />
      <h2 className="font-black text-xl md:text-2xl mt-10 uppercase text-center">
        Editar <span className="text-indigo-600">perfil</span>
      </h2>
      <div className="flex justify-center mt-5">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5 ">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};
