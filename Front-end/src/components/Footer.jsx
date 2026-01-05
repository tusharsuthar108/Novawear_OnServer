import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-[1440px] mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand & About */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-tight">ShopNow</h2>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Your one-stop destination for premium fashion and lifestyle products. We bring you the latest trends with quality you can trust.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="hover:text-white transition"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-white transition"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-white transition"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-white transition"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition">Home</a></li>
                            <li><a href="#" className="hover:text-white transition">Shop</a></li>
                            <li><a href="#" className="hover:text-white transition">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition">Blog</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Customer Service</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-white transition">Returns & Exchanges</a></li>
                            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                                <span>123 Fashion Street, Design District, New York, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="flex-shrink-0" />
                                <span>support@shopnow.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 text-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
