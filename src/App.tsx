import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import AdminUsers from './pages/admin/AdminUsers';
import AdminRoles from './pages/admin/AdminRoles';
import Configurations from './pages/admin/Configurations';
import Locations from './pages/Locations';
import UserDocumentations from './pages/users/UserDocumentations';
import Notifications from './pages/Notifications';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes with Layout */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/roles" element={<AdminRoles />} />
          <Route path="admin/configurations" element={<Configurations />} />
          <Route path="locations" element={<Locations />} />
          <Route path="users/documentations" element={<UserDocumentations />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
