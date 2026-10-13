import './App.css';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import SignUpPage from './pages/signUpPage';
import AdminHomePage from './pages/adminHomePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminProductPage from './pages/admin/adminProductPage';
import AdminCustomerPage from './pages/admin/adminCustomerPage';
import AdminDashboardPage from './pages/admin/adminDashboardPage';
import AdminOrderPage from './pages/admin/adminOrderPage';
import AddProductPage from './pages/admin/addProduct';
import EditProductPage from './pages/admin/editProductForm';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
          <Routes>
            {/* Admin Nested Routes */}
            <Route path="/admin" element={<AdminHomePage />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="products" element={<AdminProductPage />} />
              <Route path="customers" element={<AdminCustomerPage />} />
              <Route path="orders" element={<AdminOrderPage />} />
              <Route path="addProduct" element={<AddProductPage />} />
              <Route path="products/editProduct" element={<EditProductPage />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Customer Storefront Routes */}
            <Route path="/*" element={<HomePage />} />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
