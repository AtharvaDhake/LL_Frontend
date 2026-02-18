import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleCartDrawer}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform 
          duration-300 flex flex-col z-50 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleCartDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Cart contents with scrollable area */}
        <div className="flex-grow p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cart && cart?.products?.length > 0 ? (
            <CartContents cart={cart} userId={userId} guestId={guestId} />
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Checkout button fixed at the bottom */}
        <div className="p-4 bg-white sticky bottom-0 border-t">
          {cart && cart?.products?.length > 0 && (
             <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-gray-600">Total Amount:</span>
                <span className="text-xl font-bold text-gray-900">
                   ₹{cart.totalPrice?.toLocaleString()}
                </span>
             </div>
          )}
          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!cart || cart?.products?.length === 0}
          >
            Checkout
          </button>
          <p className="text-sm tracking-tighter text-center text-gray-500 mt-2">
            Secure payment. Fast shipping.
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;