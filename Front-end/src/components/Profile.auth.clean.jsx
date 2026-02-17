import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  CheckCircle2, 
  ArrowLeft,
  Save
} from "lucide-react";
import { profileAPI } from "../api/profileAPI";

export default function FullScreenProfileSettings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId') || localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      loadProfile();
    } else {
      setError('Please set userId in localStorage. Open console and run: localStorage.setItem("userId", "1")');
    }
  }, []);

  const loadProfile = async () => {
    try {
      setError(null);
      const result = await profileAPI.getProfile(userId);
      
      if (result.success) {
        setFormData({
          name: result.data.full_name || "",
          email: result.data.email || "",
          phone: result.data.phone || ""
        });
        if (result.data.profile_image) {
          setProfileImage(`http://localhost:3000${result.data.profile_image}`);
        }
      }
    } catch (error) {
      setError('Failed to load profile: ' + error.message);
    }
  };

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!userId) {
        alert('Please set userId in localStorage first');
        return;
      }
      setLoading(true);
      try {
        const result = await profileAPI.uploadProfileImage(userId, file);
        
        if (result.success) {
          setProfileImage(`http://localhost:3000${result.data.profile_image}`);
          setFormData({
            name: result.data.full_name,
            email: result.data.email,
            phone: result.data.phone
          });
          alert('Image uploaded successfully!');
        }
      } catch (error) {
        alert('Upload failed: ' + error.message);
      }
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userId) {
      alert('Please set userId in localStorage first');
      return;
    }
    
    if (!formData.name || !formData.email || !formData.phone) {
      alert('All fields are required');
      return;
    }
    
    setLoading(true);
    try {
      const result = await profileAPI.updateProfile(userId, {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      
      if (result.success) {
        alert('Profile updated successfully!');
        await loadProfile();
      } else {
        alert(result.message || 'Update failed');
      }
    } catch (error) {
      alert('Update failed: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* LEFT PANEL */}
      <div className="w-full md:w-1/3 bg-gradient-to-br from-indigo-700 via-indigo-800 to-blue-900 p-8 md:p-12 flex flex-col justify-between text-white relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 rounded-full bg-blue-400 blur-3xl" />
        </div>

        <div className="relative z-10">
          <button className="flex items-center gap-2 text-indigo-100 hover:text-white transition-all group mb-12">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Store</span>
          </button>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
            Profile <br />
            <span className="text-blue-300">Settings</span>
          </h1>
          <p className="text-indigo-100/60 text-[10px] font-bold uppercase tracking-[0.2em] max-w-xs leading-relaxed">
            Personalize your identity within the NovaWear ecosystem.
          </p>
        </div>

        <div className="relative z-10 hidden md:block">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest">Profile Status</p>
              <p className="text-[9px] text-indigo-200 uppercase font-bold tracking-wider">Fully Encrypted & Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-2/3 bg-white overflow-y-auto px-8 md:px-24 py-16 md:py-24 flex flex-col items-center">
        <div className="w-full max-w-xl">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center md:items-start mb-16">
            {error && (
              <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm w-full">
                {error}
              </div>
            )}
            <input 
              type="file" 
              id="fileInput" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={{ display: 'none' }} 
            />
            <div className="relative group cursor-pointer" onClick={handleImageClick}>
              <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-indigo-600 to-blue-400 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <div className="w-full h-full bg-gray-50 rounded-full overflow-hidden flex items-center justify-center relative">
                   {profileImage ? (
                     <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                     <User size={80} className="text-gray-300" />
                   )}
                   <div className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={32} className="text-white" />
                   </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-indigo-600 text-white p-3 rounded-full shadow-xl border-4 border-white">
                <Camera size={18} />
              </div>
            </div>
            <div className="mt-8 text-center md:text-left">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Personal Details</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Update your profile image and contact info</p>
            </div>
          </div>

          {/* Input Grid */}
          <div className="space-y-10">
            
            {/* Full Name */}
            <div className="group">
              <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-indigo-600 transition-colors mb-2">
                <User size={12} /> Full Name
              </label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border-b-[3px] border-gray-100 py-4 text-xl font-bold text-gray-900 focus:border-indigo-600 transition-all outline-none bg-transparent"
              />
            </div>

            {/* Email Address */}
            <div className="group">
              <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-indigo-600 transition-colors mb-2">
                <Mail size={12} /> Email Address
              </label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border-b-[3px] border-gray-100 py-4 text-xl font-bold text-gray-900 focus:border-indigo-600 transition-all outline-none bg-transparent"
              />
            </div>

            {/* Phone Number */}
            <div className="group">
              <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 group-focus-within:text-indigo-600 transition-colors mb-2">
                <Phone size={12} /> Phone Number
              </label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full border-b-[3px] border-gray-100 py-4 text-xl font-bold text-gray-900 focus:border-indigo-600 transition-all outline-none bg-transparent"
              />
            </div>

            {/* Bottom Controls */}
            <div className="pt-12 flex flex-col sm:flex-row gap-5">
              <button 
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-black text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 disabled:opacity-50"
              >
                <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                onClick={loadProfile}
                disabled={loading}
                className="px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Discard Changes
              </button>
            </div>
          </div>

          <footer className="mt-20 text-[8px] font-bold text-gray-300 uppercase tracking-[0.4em] text-center md:text-left">
            NovaWear Security Protocol // v2.0.26
          </footer>
        </div>
      </div>

    </div>
  );
}
