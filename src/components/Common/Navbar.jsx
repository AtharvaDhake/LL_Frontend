import  { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Common/SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight
} from "react-icons/hi2";
import { useSelector } from "react-redux";


const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  
  const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const [expandedMenu, setExpandedMenu] = useState({});

  const toggleMenu = (menu) => {
    setExpandedMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };


  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex md:grid md:grid-cols-3 items-center justify-between py-4 px-6 relative">
        {/* Left - Logo */}
        <div className="text-2xl md:text-3xl font-bold md:justify-self-start">
          <Link to="/">Learning Lounge</Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 justify-center md:justify-self-center relative z-50">
          
          {/* Shop By Skill */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors cursor-default focus:outline-none py-2">
              Shop By Skill
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 p-4 z-50">
              <div className="flex flex-col space-y-2">
                {[
                  "Cognitive Development",
                  "Language & Literacy",
                  "Numeracy & Counting",
                  "Sensory & Visual Skills",
                  "Fine Motor Skills"
                ].map((skill) => (
                  <Link 
                    key={skill}
                    to={`/collections/all?skill=${encodeURIComponent(skill)}`}
                    className="text-gray-600 hover:text-primary hover:bg-red-50 px-2 py-1 rounded transition-colors text-sm"
                  >
                    {skill}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Shop By Age */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors cursor-default focus:outline-none py-2">
              Shop By Age
            </button>
             <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 p-4 z-50">
              <div className="flex flex-col space-y-2">
                {[
                  "Toddlers (2-4)",
                  "Preschoolers (4-6)",
                  "Early School-Age (6-8)"
                ].map((age) => (
                  <Link 
                    key={age}
                    to={`/collections/all?age=${encodeURIComponent(age)}`}
                    className="text-gray-600 hover:text-primary hover:bg-red-50 px-2 py-1 rounded transition-colors text-sm"
                  >
                    {age}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Shop By Activity */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors cursor-default focus:outline-none py-2">
              Shop By Activity
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 p-4 z-50">
              <div className="flex flex-col space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                {[
                  "Sorting & Placing",
                  "Matching & Recognizing",
                  "Tracing & Pre-Writing",
                  "Lacing & Beading",
                  "Puzzling & Patterning",
                  "Counting & Stacking",
                  "Spelling & Storytelling",
                  "Sensory Touch & Feel",
                  "Practical Life Skills",
                  "Letter & Language Basics"
                ].map((activity) => (
                   <Link 
                    key={activity}
                    to={`/collections/all?activity=${encodeURIComponent(activity)}`}
                    className="text-gray-600 hover:text-primary hover:bg-red-50 px-2 py-1 rounded transition-colors text-sm"
                  >
                    {activity}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Shop All */}
          <div className="relative z-50">
            <Link 
              to="/collections/all" 
              className="text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors py-2 inline-block pointer-events-auto cursor-pointer"
            >
              Shop All
            </Link>
          </div>

        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4 md:justify-self-end">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="block px-3 py-1 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="hover:text-black">
                <HiOutlineUser className="h-6 w-6 text-gray-700" />
              </Link>
            </>
          ) : (
            <Link to="/login" className="hover:text-black">
              <HiOutlineUser className="h-6 w-6 text-gray-700" />
            </Link>
          )}
          
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* Search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      
      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 overflow-y-auto ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            
            {/* Mobile Shop By Skill */}
            <div className="border-b border-gray-100 pb-2">
                 <button 
                    onClick={() => toggleMenu('skills')}
                    className="flex justify-between items-center w-full py-2 text-gray-800 hover:text-black font-medium text-lg uppercase"
                 >
                    Shop By Skill
                    <span className="text-xl">{expandedMenu['skills'] ? '-' : '+'}</span>
                 </button>
                 {expandedMenu['skills'] && (
                     <div className="pl-4 space-y-2 pb-2 mt-2 bg-gray-50 rounded-lg p-2">
                        {[
                          "Cognitive Development",
                          "Language & Literacy",
                          "Numeracy & Counting",
                          "Sensory & Visual Skills",
                          "Fine Motor Skills"
                        ].map((skill) => (
                          <Link 
                            key={skill}
                            to={`/collections/all?skill=${encodeURIComponent(skill)}`}
                            onClick={toggleNavDrawer}
                            className="block text-sm text-gray-600 hover:text-primary py-1 border-b border-gray-200 last:border-0"
                          >
                            {skill}
                          </Link>
                        ))}
                     </div>
                 )}
            </div>

            {/* Mobile Shop By Age */}
            <div className="border-b border-gray-100 pb-2">
                 <button 
                    onClick={() => toggleMenu('ages')}
                    className="flex justify-between items-center w-full py-2 text-gray-800 hover:text-black font-medium text-lg uppercase"
                 >
                    Shop By Age
                    <span className="text-xl">{expandedMenu['ages'] ? '-' : '+'}</span>
                 </button>
                 {expandedMenu['ages'] && (
                     <div className="pl-4 space-y-2 pb-2 mt-2 bg-gray-50 rounded-lg p-2">
                        {[
                          "Toddlers (2-4)",
                          "Preschoolers (4-6)",
                          "Early School-Age (6-8)"
                        ].map((age) => (
                          <Link 
                            key={age}
                            to={`/collections/all?age=${encodeURIComponent(age)}`}
                            onClick={toggleNavDrawer}
                            className="block text-sm text-gray-600 hover:text-primary py-1 border-b border-gray-200 last:border-0"
                          >
                            {age}
                          </Link>
                        ))}
                     </div>
                 )}
            </div>

             {/* Mobile Shop By Activity */}
             <div className="border-b border-gray-100 pb-2">
                 <button 
                    onClick={() => toggleMenu('activities')}
                    className="flex justify-between items-center w-full py-2 text-gray-800 hover:text-black font-medium text-lg uppercase"
                 >
                    Shop By Activity
                    <span className="text-xl">{expandedMenu['activities'] ? '-' : '+'}</span>
                 </button>
                 {expandedMenu['activities'] && (
                     <div className="pl-4 space-y-2 pb-2 mt-2 bg-gray-50 rounded-lg p-2 max-h-60 overflow-y-auto">
                         {[
                          "Sorting & Placing",
                          "Matching & Recognizing",
                          "Tracing & Pre-Writing",
                          "Lacing & Beading",
                          "Puzzling & Patterning",
                          "Counting & Stacking",
                          "Spelling & Storytelling",
                          "Sensory Touch & Feel",
                          "Practical Life Skills",
                          "Letter & Language Basics"
                        ].map((activity) => (
                           <Link 
                            key={activity}
                            to={`/collections/all?activity=${encodeURIComponent(activity)}`}
                            onClick={toggleNavDrawer}
                            className="block text-sm text-gray-600 hover:text-primary py-1 border-b border-gray-200 last:border-0"
                          >
                            {activity}
                          </Link>
                        ))}
                     </div>
                 )}
             </div>

            {/* Mobile Shop All */}
            <div className="border-b border-gray-100 pb-2">
                <Link 
                  to="/collections/all"
                  onClick={toggleNavDrawer}
                  className="block py-2 text-gray-800 hover:text-black font-medium text-lg uppercase"
                >
                  Shop All
                </Link>
            </div>

          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;