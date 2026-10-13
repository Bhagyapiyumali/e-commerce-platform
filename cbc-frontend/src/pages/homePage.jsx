import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import LoginPage from './loginPage';
import ProductOverview from './home/productOverview';
import ProductPage from './home/product';
import Cart from './home/cart';
import ShippingPage from './home/shipping';
import MyOrdersPage from './home/orders';
import ContactPage from './home/contact';
import AboutPage from './home/about';
import HomeWebPage from './home/home';

export default function HomePage() {
    return (
        <div className="min-h-screen w-full flex flex-col bg-[#FAF7F3]">
            <Header/>
            <main className='w-full flex-1 bg-[#FAF7F3]'>
                <Routes>
                    <Route path="/" element={<HomeWebPage/>} />
                    <Route path="/products" element={<ProductPage/>} />
                    <Route path="/about" element={<AboutPage/>} />
                    <Route path="/contact" element={<ContactPage/>} />
                    <Route path="/login" element={<LoginPage/>} />

                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/shipping" element={<ShippingPage/>}/>   
                    <Route path='/orders' element={<MyOrdersPage/>}/>      
                    <Route path="/productInfo/:id" element={<ProductOverview/>} />


                </Routes>
            </main>
        </div>
    );
}