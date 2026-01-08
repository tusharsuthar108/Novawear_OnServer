import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Box,
  Truck,
  ShoppingCart,
  Layers,
  Bookmark,
  Tag,
  CircleDollarSign,
  ChevronDown,
  Menu,
  X,
  Settings,
  LogOut,
  Command,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Bell,
  Award,
} from "lucide-react";

// Import all components
import MasterCategory from '../../components/admin/MasterCategory';
import Category from '../../components/admin/Category';
import SubCategory from '../../components/admin/SubCategory';
import ProductType from '../../components/admin/ProductType';
import ProductColour from '../../components/admin/ProductColour';
import ProductFabric from '../../components/admin/ProductFabric';
import ProductPattern from '../../components/admin/ProductPattern';
import ProductSize from '../../components/admin/ProductSize';
import ProductBadge from '../../components/admin/ProductBadge';
import BadgesOnProduct from '../../components/admin/BadgesOnProduct';
import AdminOrders from './Orders';
import OrderDetails from '../../components/admin/OrderDetails';
import Transactions from '../../components/admin/Transactions';
import PricingPlans from '../../components/admin/PricingPlans';
import Productpricing from '../../components/admin/Productpricing';
import DiscountsCoupons from '../../components/admin/DiscountsCoupons';
import TaxesFees from '../../components/admin/TaxesFees';
import Inventory from '../../components/admin/Inventory';
import AddProduct from "../../components/admin/AddProduct";
import Pending from '../../components/admin/Pending';
import InTransit from '../../components/admin/InTransit';
import Delivered from '../../components/admin/Delivered';
// import BrandList from './BrandList';
// import AddBrand from './AddBrand';
// import ProductList from './ProductList';
// import AddProduct from './AddProduct';
// import PriceList from './PriceList';
// import OrderList from './OrderList';
// import OrderDetails from './OrderDetails';
// import StockLevels from './StockLevels';
// import Warehouse from './Warehouse';
// import Adjustments from './Adjustments';
// import Pending from './Pending';
// import InTransit from './InTransit';
// import Delivered from './Delivered';
// import NewProduct from './NewProduct';
// import Management from './Management';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [currentComponent, setCurrentComponent] = useState(
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">Dashboard Overview</h1>
      <p className="text-slate-600">Welcome to NovaWear Admin Panel. Select a menu item to get started.</p>
    </div>
  );

  // Component mapping
  const getComponent = (itemName) => {
    const components = {
      "Master Category": <MasterCategory />,
      "Category": <Category />,
      "Sub Category": <SubCategory />,
      "Product Type": <ProductType />,
      "Product Colour": <ProductColour />,
      "Product Fabric": <ProductFabric />,
      "Product Pattern": <ProductPattern />,
      "Product Size": <ProductSize />,
      "Product Badge": <ProductBadge />,
      "Badges on Product": <BadgesOnProduct />,
      "Order List": <AdminOrders />,
      "Order Details": <OrderDetails />,
      "Inventory": <Inventory />,
      "Transactions": <Transactions />,
      "Pricing Plans": <PricingPlans />,
      "Product Pricing": <Productpricing />,
      "Discounts & Coupons": <DiscountsCoupons />,
      "Taxes & Fees": <TaxesFees />,
      "Add Product": <AddProduct />,
      "Pending": <Pending />,
      "In Transit": <InTransit />,
      "Delivered": <Delivered />,
      // "Brand List": <BrandList />,
      // "Add Brand": <AddBrand />,
      // "Product List": <ProductList />,
      // "Add Product": <AddProduct />,
      // "Price List": <PriceList />,
      // "Order List": <OrderList />,
      // "Order Details": <OrderDetails />,
      // "Stock Levels": <StockLevels />,
      // "Warehouse": <Warehouse />,
      // "Adjustments": <Adjustments />,
      // "Pending": <Pending />,
      // "In Transit": <InTransit />,
      // "Delivered": <Delivered />,
      // "New Product": <NewProduct />,
      // "Management": <Management />
    };
    return components[itemName] || null;
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleDropdown = (menu) => {
    if (!isOpen) setIsOpen(true);
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} /> },
    {
      title: "Inventory",
      icon: <Box size={20} />,
      submenu: true,
      submenuItems: ["Inventory", "Stock Levels", "Warehouse", "Adjustments"],
    },
    {
      title: "Shipment",
      icon: <Truck size={20} />,
      submenu: true,
      submenuItems: ["Pending", "In Transit", "Delivered"],
    },
    {
      title: "Orders",
      icon: <Truck size={20} />,
      submenu: true,
      submenuItems: ["Order List", "Order Details", "Transactions"],
    },
    {
      title: "Category",
      icon: <Box size={20} />,
      submenu: true,
      submenuItems: ["Master Category", "Category", "Sub Category"],
    },

    { title: "Brand", icon: <Bookmark size={20} /> },
    { title: "Shop", icon: <ShoppingCart size={20} /> },
    {
      title: "Badges",
      icon: <Award size={20} />,
      submenu: true,
      submenuItems: ["Product Badge", "Badges on Product"],
    },
    {
      title: "Product",
      icon: <Tag size={20} />,
      submenu: true,
      submenuItems: ["Product Type", "Product Colour", "Product Fabric", "Product Pattern", "Product Size"],
    },
    { title: "Pricing", icon: <CircleDollarSign size={20} />, submenu: true, submenuItems: ["Pricing Plans", "Product Pricing", "Discounts & Coupons", "Taxes & Fees"] },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans antialiased">
      
      <aside
        className={`h-screen sticky top-0 bg-white border-r border-slate-200 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col
        ${isOpen ? "w-[280px]" : "w-[80px]"}`}
      >
        {/* Header Section - Internal Toggle */}
        <div className="h-20 flex items-center justify-between px-5 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 shrink-0">
              <Command className="text-white" size={22} />
            </div>
            <span
              className={`font-bold text-slate-900 text-lg transition-all duration-300 whitespace-nowrap ${
                !isOpen && "opacity-0 invisible"
              }`}
            >
              NovaAdmin
            </span>
          </div>

          {/* Integrated Toggle Button - INSIDE the sidebar */}
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors
            ${!isOpen && "hidden"}`} // Hide icon button when closed, or keep it to toggle back
          >
            <PanelLeftClose size={20} />
          </button>
        </div>

        {/* Small Toggle for Closed State */}
        {!isOpen && (
          <div className="flex justify-center py-2">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <PanelLeftOpen size={20} />
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item, idx) => {
            const isActive = activeItem === item.title;
            const hasActiveSubmenu = item.submenuItems?.some(sub => activeItem === sub);
            const shouldShowAsActive = isActive || hasActiveSubmenu;
            
            return (
              <div key={idx} className="relative">
                <button
                  onClick={() => {
                    // 1️⃣ If sidebar is closed, just open it without toggling dropdown
                    if (!isOpen) {
                      setIsOpen(true);
                      return; // Exit early, don't toggle dropdown
                    }

                    // 2️⃣ Set active item
                    setActiveItem(item.title);

                    // 3️⃣ For non-submenu items, set the component directly
                    if (!item.submenu) {
                      setCurrentComponent(getComponent(item.title));
                      setOpenMenus({}); // close all submenus
                    } else {
                      // Toggle submenu (open/close) only if sidebar is already open
                      setOpenMenus(prev => {
                        const isCurrentlyOpen = prev[item.title];
                        return {
                          [item.title]: !isCurrentlyOpen
                        };
                      });
                    }
                  }}
                  className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-200 group
                    ${
                      shouldShowAsActive
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                    ${!isOpen && "justify-center"}`}
                >
                  <span
                    className={`shrink-0 ${
                      shouldShowAsActive
                        ? "text-indigo-600"
                        : "text-slate-400 group-hover:text-indigo-600"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span
                    className={`flex-1 text-[14px] text-left transition-all duration-300 ${
                      !isOpen ? "opacity-0 w-0 hidden" : "opacity-100"
                    }`}
                  >
                    {item.title}
                  </span>

                  {item.submenu && isOpen && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        openMenus[item.title] ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Submenu Dropdown with Internal Guide Line */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${
                    openMenus[item.title] && isOpen
                      ? "max-h-[200px] opacity-100 mt-1"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-5 border-l border-slate-200 pl-4 space-y-1 py-1">
                    {item.submenuItems?.map((sub, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveItem(sub);
                          setCurrentComponent(getComponent(sub));
                        }}
                        className={`w-full text-left py-2 text-[13px] transition-colors block font-medium ${
                          activeItem === sub 
                            ? 'text-indigo-600 font-semibold' 
                            : 'text-slate-500 hover:text-indigo-600'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer Profile */}
        <div className="p-4 border-t border-slate-100 shrink-0">
          <div
            className={`flex items-center gap-3 p-2 rounded-2xl transition-all duration-300 ${
              isOpen ? "hover:bg-slate-50" : "justify-center"
            }`}
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Krunal"
              className="w-9 h-9 rounded-lg bg-indigo-50"
              alt="user"
            />
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-slate-900 truncate">
                  Krunal N.
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  System Admin
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          {/* Search Bar */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Settings size={20} />
            </button>

            {/* Logout */}
            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div key={activeItem}>{currentComponent}</div>
        </main>
      </div>
    </div>

  );
};

export default Dashboard;