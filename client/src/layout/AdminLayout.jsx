import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile } from '../api/v1/functions';
import { setUser } from '../store/authSlice';

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
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
        {isAuth ? <Outlet /> : <Navigate to="/" />}
      </main>
    </>
  );
};

export default AdminLayout;
