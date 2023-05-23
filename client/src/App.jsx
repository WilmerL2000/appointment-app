import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import {
  Login,
  Register,
  ConfirmAccount,
  ForgotPassword,
  NewPassword,
  ManagePatients,
} from './pages';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthProvider';
import AdminLayout from './layout/AdminLayout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="confirm-account/:id" element={<ConfirmAccount />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password/:token" element={<NewPassword />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<ManagePatients />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}

export default App;
