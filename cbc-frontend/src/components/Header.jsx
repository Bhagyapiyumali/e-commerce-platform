import { Link, Routes } from 'react-router-dom';
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";


export default function Header() {
    return (
        <header className="bg-white w-full h-14 relative flex justify-center items-center shadow-sm">

            {/* Logo */}
            <img
                src="/logo.png"
                alt="Logo"
                className="cursor-pointer h-10 absolute left-4 top-2"
            />

            {/* Navigation */}
            <nav className="flex gap-8">
                <Link
                to="/"
                className="text-[#6B4F3A] text-sm hover:text-[#B08D57] transition"
                >
                Home
                </Link>

                <Link
                to="/products"
                className="text-[#6B4F3A] text-sm hover:text-[#B08D57] transition"
                >
                Products
                </Link>

                <Link
                to="/about"
                className="text-[#6B4F3A] text-sm hover:text-[#B08D57] transition"
                >
                About
                </Link>

                <Link
                to="/contact"
                className="text-[#6B4F3A] text-sm hover:text-[#B08D57] transition"
                >
                Contact
                </Link>
            </nav>

            {/* Cart Icon */}
            <Link
                to="/cart"
                className="absolute right-6 text-[#6B4F3A] hover:text-[#B08D57] transition"
            >
                <FiShoppingCart size={24} />
            </Link>

        </header>
    )
}