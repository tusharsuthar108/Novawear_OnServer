import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Truck, Users, 
  BarChart3, LogOut, ChevronRight, 
  Plus, Search, Package, Bell, Settings,
  PanelLeftClose, PanelLeftOpen, ChevronDown, Tag,
  Award, FileText, Shirt, DollarSign
} from 'lucide-react';
import MasterCategory from '../../components/admin/MasterCategory';
import Category from '../../components/admin/Category';
import SubCategory from '../../components/admin/SubCategory';
import SubSubCategory from '../../components/admin/SubSubCategory';
import AdminOrders from './Orders';
import OrderDetails from '../../components/admin/OrderDetails';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Insights');
  const [isOpen, setIsOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);

  const menuItems = [
    { name: 'Insights', icon: <LayoutDashboard size={20} />, color: 'text-blue-500' },
    { name: 'Inventory', icon: <ShoppingBag size={20} />, color: 'text-emerald-500' },
    { name: 'Shipments', icon: <Truck size={20} />, color: 'text-orange-500' },
    { name: 'Customers', icon: <Users size={20} />, color: 'text-purple-500' },
    { name: 'Analytics', icon: <BarChart3 size={20} />, color: 'text-pink-500' },
  ];

  const categoryItems = [
    'Master Category',
    'Category', 
    'Sub Category',
    'Sub Sub Category'
  ];

  const brandItems = [
    'Brand List',
    'Add Brand'
  ];

  const orderItems = [
    'Order List',
    'Order Details'
  ];

  const productItems = [
    'Product List',
    'Add Product',
    'Size Chart',
    'Stock Management'
  ];

  const pricingItems = [
    'Price List',
    'Discount Rules',
    'Bulk Pricing'
  ];

  const renderContent = () => {
    if (activeTab === 'Master Category') {
      return <MasterCategory />;
    }
    if (activeTab === 'Category') {
      return <Category />;
    }
    if (activeTab === 'Sub Category') {
      return <SubCategory />;
    }
    if (activeTab === 'Sub Sub Category') {
      return <SubSubCategory />;
    }
    if (activeTab === 'Order List') {
      return <AdminOrders />;
    }
    if (activeTab === 'Order Details') {
      return <OrderDetails onBack={() => setActiveTab('Order List')} />;
    }
    
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl shadow-slate-200/20 p-16 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Package size={32} className="text-indigo-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">{activeTab} Module</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          This section is ready for development. Start building your {activeTab.toLowerCase()} management features here.
        </p>
        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200">
          Get Started
        </button>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* --- MODERN SIDEBAR --- */}
      <aside 
        className={`${
          isOpen ? 'w-72' : 'w-20'
        } bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl shadow-slate-200/50 flex flex-col sticky top-0 h-screen transition-all duration-500 ease-out hidden lg:flex`}
      >
        {/* Header */}
        <div className={`p-6 mb-2 flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
          {isOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                N
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">NeuWear</h1>
                <p className="text-xs text-slate-500 font-medium">Admin Portal</p>
              </div>
            </div>
          )}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all duration-200"
          >
            {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                activeTab === item.name 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              } ${!isOpen ? 'justify-center' : 'justify-between'}`}
            >
              <div className="flex items-center gap-4">
                <span className={`${activeTab === item.name ? 'text-white' : item.color} transition-colors`}>
                  {item.icon}
                </span>
                {isOpen && (
                  <span className="text-sm font-semibold">
                    {item.name}
                  </span>
                )}
              </div>
              
              {!isOpen && (
                <div className="absolute left-20 bg-slate-800 text-white text-xs font-medium px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                  {item.name}
                </div>
              )}

              {isOpen && activeTab === item.name && (
                <ChevronRight size={16} className="opacity-70" />
              )}
            </button>
          ))}
          
          {/* Category Dropdown */}
          <div className="pt-4">
            <div className="px-4 mb-2">
              {isOpen && <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Management</p>}
            </div>
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group relative text-slate-600 hover:bg-slate-50 hover:text-slate-800 ${
                !isOpen ? 'justify-center' : 'justify-between'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-amber-500"><Tag size={20} /></span>
                {isOpen && (
                  <span className="text-sm font-semibold">
                    Categories
                  </span>
                )}
              </div>
              
              {!isOpen && (
                <div className="absolute left-20 bg-slate-800 text-white text-xs font-medium px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  Categories
                </div>
              )}

              {isOpen && (
                <ChevronDown size={16} className={`transition-transform duration-300 ${
                  categoryOpen ? 'rotate-180' : ''
                }`} />
              )}
            </button>
            
            {isOpen && categoryOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l-2 border-slate-100 pl-4">
                {categoryItems.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === category
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    <span className="text-sm">
                      {category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Brand Dropdown */}
          <div className="pt-2">
            <button
              onClick={() => setBrandOpen(!brandOpen)}
              className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group relative text-slate-600 hover:bg-slate-50 hover:text-slate-800 ${
                !isOpen ? 'justify-center' : 'justify-between'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-rose-500"><Award size={20} /></span>
                {isOpen && (
                  <span className="text-sm font-semibold">
                    Brand
                  </span>
                )}
              </div>
              
              {!isOpen && (
                <div className="absolute left-20 bg-slate-800 text-white text-xs font-medium px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  Brand
                </div>
              )}

              {isOpen && (
                <ChevronDown size={16} className={`transition-transform duration-300 ${
                  brandOpen ? 'rotate-180' : ''
                }`} />
              )}
            </button>
            
            {isOpen && brandOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l-2 border-slate-100 pl-4">
                {brandItems.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setActiveTab(brand)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === brand
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    <span className="text-sm">
                      {brand}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Order Dropdown */}
          <div className="pt-2">
            <button
              onClick={() => setOrderOpen(!orderOpen)}
              className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group relative text-slate-600 hover:bg-slate-50 hover:text-slate-800 ${
                !isOpen ? 'justify-center' : 'justify-between'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-green-500"><FileText size={20} /></span>
                {isOpen && (
                  <span className="text-sm font-semibold">
                    Order
                  </span>
                )}
              </div>
              
              {!isOpen && (
                <div className="absolute left-20 bg-slate-800 text-white text-xs font-medium px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  Order
                </div>
              )}

              {isOpen && (
                <ChevronDown size={16} className={`transition-transform duration-300 ${
                  orderOpen ? 'rotate-180' : ''
                }`} />
              )}
            </button>
            
            {isOpen && orderOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l-2 border-slate-100 pl-4">
                {orderItems.map((order) => (
                  <button
                    key={order}
                    onClick={() => setActiveTab(order)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === order
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    <span className="text-sm">
                      {order}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Dropdown */}
          <div className="pt-2">
            <button
              onClick={() => setProductOpen(!productOpen)}
              className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group relative text-slate-600 hover:bg-slate-50 hover:text-slate-800 ${
                !isOpen ? 'justify-center' : 'justify-between'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-blue-500"><Shirt size={20} /></span>
                {isOpen && (
                  <span className="text-sm font-semibold">
                    Products
                  </span>
                )}
              </div>
              
              {!isOpen && (
                <div className="absolute left-20 bg-slate-800 text-white text-xs font-medium px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  Products
                </div>
              )}

              {isOpen && (
                <ChevronDown size={16} className={`transition-transform duration-300 ${
                  productOpen ? 'rotate-180' : ''
                }`} />
              )}
            </button>
            
            {isOpen && productOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l-2 border-slate-100 pl-4">
                {productItems.map((product) => (
                  <button
                    key={product}
                    onClick={() => setActiveTab(product)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === product
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    <span className="text-sm">
                      {product}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Dropdown */}
          <div className="pt-2">
            <button
              onClick={() => setPricingOpen(!pricingOpen)}
              className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group relative text-slate-600 hover:bg-slate-50 hover:text-slate-800 ${
                !isOpen ? 'justify-center' : 'justify-between'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-emerald-500"><DollarSign size={20} /></span>
                {isOpen && (
                  <span className="text-sm font-semibold">
                    Pricing
                  </span>
                )}
              </div>
              
              {!isOpen && (
                <div className="absolute left-20 bg-slate-800 text-white text-xs font-medium px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  Pricing
                </div>
              )}

              {isOpen && (
                <ChevronDown size={16} className={`transition-transform duration-300 ${
                  pricingOpen ? 'rotate-180' : ''
                }`} />
              )}
            </button>
            
            {isOpen && pricingOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l-2 border-slate-100 pl-4">
                {pricingItems.map((pricing) => (
                  <button
                    key={pricing}
                    onClick={() => setActiveTab(pricing)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all text-left ${
                      activeTab === pricing
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    <span className="text-sm">
                      {pricing}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-100">
          <div className={`bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4 flex items-center gap-3 ${!isOpen ? 'justify-center' : ''}`}>
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl overflow-hidden shrink-0 shadow-lg">
               <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100" alt="Admin" className="w-full h-full object-cover" />
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">Alex Rivera</p>
                <p className="text-xs text-slate-500">Store Manager</p>
              </div>
            )}
            {isOpen && (
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Settings size={16} />
              </button>
            )}
          </div>
          
          <button className={`w-full flex items-center gap-3 px-4 py-3 mt-3 text-slate-500 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50 ${!isOpen ? 'justify-center' : ''}`}>
            <LogOut size={18} />
            {isOpen && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Content Area */}
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;