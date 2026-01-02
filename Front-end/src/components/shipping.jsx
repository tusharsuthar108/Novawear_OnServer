import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, User, Phone } from "lucide-react";

export default function ShippingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // SIMULATING FETCH FROM DATABASE
  useEffect(() => {
    setTimeout(() => {
      setUserData({
        name: "John Doe",
        phone: "+91 9876543210",
        savedAddress: "Apartment 402, High-Rise Towers, Mumbai, MH - 400001",
        pincode: "400001"
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center font-black animate-pulse">FETCHING SECURE DATA...</div>;

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 lg:p-20 space-y-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter">Delivery Details</h1>
          
          <div className="space-y-6">
            <div className="p-8 border-2 border-black rounded-[2.5rem] bg-gray-50 relative">
               <div className="absolute -top-3 left-8 bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">Saved Address</div>
               <div className="flex gap-4 items-start">
                  <MapPin className="text-red-600 mt-1" />
                  <div>
                    <p className="font-black text-lg">{userData.name}</p>
                    <p className="text-gray-500 font-medium leading-relaxed mt-2">{userData.savedAddress}</p>
                    <p className="font-bold mt-4 flex items-center gap-2"><Phone size={14}/> {userData.phone}</p>
                  </div>
               </div>
            </div>
            
            <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-[2rem] font-black uppercase text-[10px] tracking-widest text-gray-400 hover:border-black hover:text-black transition-all">
              + Add New Address
            </button>
          </div>
        </div>

        <div className="bg-black text-white p-6 lg:p-20 flex flex-col justify-center">
          <div className="max-w-md space-y-8">
            <h2 className="text-3xl font-black italic uppercase">Ready for Payment?</h2>
            <p className="text-gray-400">By continuing, you agree to our express delivery terms. Your items are reserved for 15:00 minutes.</p>
            <button 
              onClick={() => navigate('/payment')}
              className="w-full bg-white text-black h-20 rounded-full font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}