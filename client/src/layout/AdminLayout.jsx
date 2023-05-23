import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) return null;

  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
        {!!auth ? <Outlet /> : <Navigate to="/" />}
      </main>
    </>
  );
};

export default AdminLayout;
