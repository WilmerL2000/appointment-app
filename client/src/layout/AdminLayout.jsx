import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile } from '../api/v1/functions';
import { setUser } from '../store/authSlice';
import { Footer, Header } from '../components';
import { startLoadingInfo } from '../store/thunks';

const AdminLayout = () => {
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingInfo());
  }, []);

  return (
    <>
      <Header />
      {isAuth ? (
        <main className="container mx-auto mt-10 px-4 lg:px-10">
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
