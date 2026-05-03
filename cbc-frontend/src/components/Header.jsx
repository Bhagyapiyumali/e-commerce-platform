import { Link, Routes } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-white w-full h-12.5 relative flex justify-center items-center">
            <img src="/logo.png" alt="Logo" className="cursor-pointer h-10 absolute left-4 top-1.5"/>
            
            <nav className="flex gap-6 ml-6">
                <Link to="/" className="text-[#E5D5C4] text-sm hover:border-b border-b-[#E5D5C4]">
                    Home
                </Link>

                <Link to="/products" className="text-[#E5D5C4] text-sm hover:border-b border-b-[#E5D5C4]">
                    Products
                </Link>
                <Link to="/about" className="text-[#E5D5C4] text-sm hover:border-b border-b-[#E5D5C4]">
                    About
                </Link>
                <Link to="/contact" className="text-[#E5D5C4] text-sm hover:border-b border-b-[#E5D5C4]">
                    Contact
                </Link>
            </nav>
        </header>
    )
}