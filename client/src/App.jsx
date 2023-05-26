import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import {
  Login,
  Register,
  ConfirmAccount,
  ForgotPassword,
  NewPassword,
  ManagePatients,
  NewPatient,
  EditPatient,
  EditProfile,
  ChangePassword,
} from './pages';
import { Toaster } from 'sonner';
import AdminLayout from './layout/AdminLayout';

function App() {
  return (
    <BrowserRouter>
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
          <Route path="profile" element={<EditProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="new-patient" element={<NewPatient />} />
          <Route path="edit-patient/:name" element={<EditPatient />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}

export default App;
