import { Link, Routes, Route } from 'react-router-dom';
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
        <div className="h-screen w-full">
            <Header/>
            <div className='w-full h-[calc(100vh-100px)] bg-[#dabaa6] '>
                <Routes path="/*">
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
            </div>
        </div>
    );
}