import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slice/cartSlice';
import { FaCheckCircle, FaTruck, FaMapMarkerAlt, FaCreditCard, FaBox, FaCalendarAlt } from 'react-icons/fa';

const OrderConfirmationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout);

    const calculateEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10);
        return orderDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    useEffect(() => {
        if (checkout && checkout._id) {
            dispatch(clearCart());
            localStorage.removeItem("cart");
        } else {
            navigate("/my-orders");
        }
    }, [checkout, dispatch, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Success Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-50 border-2 border-green-200 rounded-full">
                            <FaCheckCircle className="text-green-600 text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Order Confirmed
                            </h1>
                            <p className="text-sm text-gray-600">
                                Your order has been successfully placed and is being processed.
                            </p>
                        </div>
                    </div>
                </div>
                
                {checkout && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Order Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Order ID & Delivery Info */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-gray-200">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Order ID</p>
                                        <h2 className="text-base font-mono font-semibold text-gray-900">
                                            {checkout._id}
                                        </h2>
                                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                                            <FaCalendarAlt />
                                            {new Date(checkout.createdAt).toLocaleDateString('en-US', { 
                                                month: 'long', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg px-4 py-3 border border-green-200">
                                        <p className="text-xs text-gray-600 mb-1">Estimated Delivery</p>
                                        <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                            <FaTruck className="text-green-600" />
                                            {calculateEstimatedDelivery(checkout.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mt-6">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                                        Order Items
                                    </h3>
                                    <div className="space-y-4">
                                        {checkout.checkoutItems.map((item) => (
                                            <div 
                                                key={item.productId} 
                                                className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-base font-semibold text-gray-900">₹{item.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Payment & Delivery Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Payment Info */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                                        <FaCreditCard className="text-gray-400" />
                                        Payment Info
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Method</span>
                                            <span className="text-sm font-medium text-gray-900">{checkout.paymentMethod}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Status</span>
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                                checkout.isPaid 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {checkout.isPaid ? "Paid" : "Pending"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Info */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-gray-400" />
                                        Delivery Address
                                    </h4>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-700">
                                            {checkout.shippingAddress.address}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            {checkout.shippingAddress.city}, {checkout.shippingAddress.postalCode}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {checkout.shippingAddress.country}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Order Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium text-gray-900">
                                            ₹{checkout.checkoutItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium text-green-600">FREE</span>
                                    </div>
                                    <div className="pt-3 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-semibold text-gray-900">Total</span>
                                            <span className="text-xl font-bold text-gray-900">
                                                ₹{checkout.checkoutItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6">
                                    <button
                                        onClick={() => navigate('/collections/all')}
                                        className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>

                                {/* Thank You Message */}
                                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-xs text-gray-700 text-center">
                                        We appreciate your business! You'll receive an email confirmation shortly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
