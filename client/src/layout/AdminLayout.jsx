import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile } from '../api/v1/functions';
import { setUser } from '../store/authSlice';
import { Footer, Header } from '../components';

const AdminLayout = () => {
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    return async () => {
      await getUserProfile({ token }).then((user) =>
        dispatch(setUser({ user }))
      );
    };
  }, [isAuth]);

  return (
    <>
      <Header />
      {isAuth ? (
        <main className="container mx-auto mt-10 md:px-10 px-2">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};

export default AdminLayout;
