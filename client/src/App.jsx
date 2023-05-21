import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import { Login, Register, ConfirmAccount, ForgotPassword } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm-account/:id" element={<ConfirmAccount />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
