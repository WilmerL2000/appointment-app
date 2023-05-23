import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
        {isAuth ? <Navigate to="/admin" /> : <Outlet />}
      </main>
    </>
  );
};

export default AuthLayout;
