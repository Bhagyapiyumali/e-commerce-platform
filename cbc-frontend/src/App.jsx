import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/loginPage'
import HomePage from './pages/homePage'
import SignUpPage from './pages/signUpPage'
import AdminHomePage from './pages/adminHomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import AdminProductPage from './pages/admin/adminProductPage'
import AdminCustomerPage from './pages/admin/adminCustomerPage'
import AdminDashboardPage from './pages/admin/adminDashboardPage'
import AdminOrderPage from './pages/admin/adminOrderPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Toaster/>
        <Routes path="/*">
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/admin" element={<AdminHomePage />}>
          
          <Route path="products" element={<AdminProductPage />} />
          <Route path="customers" element={<AdminCustomerPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="orders" element={<AdminOrderPage />} />

        </Route>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
