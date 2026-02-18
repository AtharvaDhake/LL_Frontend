import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slice/checkoutSlice";
import { fetchCart } from "../../redux/slice/cartSlice";
import { toast } from "sonner";
import axios from "axios";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Shipping, 2: Payment
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (user?._id || guestId) {
      dispatch(fetchCart({ userId: user?._id, guestId }));
    }
  }, [dispatch, user, guestId]);

  // Pre-fill phone number from user profile
  useEffect(() => {
    if (user?.phone) {
      setShippingAddress((prev) => ({
        ...prev,
        phone: user.phone,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (
      !loading &&
      !error &&
      (!cart || !cart.products || cart.products.length === 0)
    ) {
      navigate("/");
    }
  }, [cart, loading, error, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "COD",
          totalPrice: cart.totalPrice,
        }),
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
        setCheckoutStep(2);
        toast.success("Shipping details saved!");
      }
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
      toast.error("Error finalizing checkout");
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: { method: "COD" } },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
      toast.error("Payment failed.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (error)
    return <p className="text-center text-red-600 py-20">Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <p className="text-center text-gray-600 py-20">Your cart is empty</p>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-4">
            <div
              className={`flex items-center gap-2 ${checkoutStep >= 1 ? "text-green-600" : "text-gray-400"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${checkoutStep >= 1 ? "bg-green-600 text-white" : "bg-gray-200"}`}
              >
                {checkoutStep > 1 ? <FaCheckCircle /> : "1"}
              </div>
              <span className="hidden sm:block font-semibold">Shipping</span>
            </div>
            <div
              className={`h-1 w-20 ${checkoutStep >= 2 ? "bg-green-600" : "bg-gray-300"}`}
            ></div>
            <div
              className={`flex items-center gap-2 ${checkoutStep >= 2 ? "text-green-600" : "text-gray-400"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${checkoutStep >= 2 ? "bg-green-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="hidden sm:block font-semibold">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                {checkoutStep === 1 ? (
                  <>
                    <FaTruck className="text-primary" />
                    Shipping Details
                  </>
                ) : (
                  <>
                    <FaLock className="text-primary" />
                    Payment Method
                  </>
                )}
              </h2>

              {checkoutStep === 1 ? (
                <form onSubmit={handleCreateCheckout} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <FaEnvelope className="text-gray-400" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user ? user.email : ""}
                      className="w-full border border-gray-200 rounded-lg p-3.5 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll send your order confirmation here
                    </p>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FaUser className="text-gray-400" />
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingAddress.firstName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        placeholder="John"
                        pattern="[A-Za-z\s]{2,50}"
                        minLength="2"
                        maxLength="50"
                        title="First name should contain only letters and spaces (2-50 characters)"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FaUser className="text-gray-400" />
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingAddress.lastName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        placeholder="Doe"
                        pattern="[A-Za-z\s]{2,50}"
                        minLength="2"
                        maxLength="50"
                        title="Last name should contain only letters and spaces (2-50 characters)"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      placeholder="123 Main Street, Apartment 4B"
                      minLength="10"
                      maxLength="200"
                      title="Address should be between 10 and 200 characters"
                      required
                    />
                  </div>

                  {/* City & Postal */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        placeholder="Mumbai"
                        pattern="[A-Za-z\s\-]{2,50}"
                        minLength="2"
                        maxLength="50"
                        title="City name should contain only letters, spaces, and hyphens (2-50 characters)"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        placeholder="400001"
                        pattern="[0-9]{6}"
                        minLength="6"
                        maxLength="6"
                        title="Postal code should be exactly 6 digits"
                        required
                      />
                    </div>
                  </div>

                  {/* Country & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        placeholder="India"
                        pattern="[A-Za-z\s]{2,50}"
                        minLength="2"
                        maxLength="50"
                        title="Country name should contain only letters and spaces (2-50 characters)"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FaPhone className="text-gray-400" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        placeholder="9876543210"
                        pattern="[0-9]{10}"
                        minLength="10"
                        maxLength="10"
                        title="Phone number should be exactly 10 digits (without country code)"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold text-base hover:bg-gray-800 transition-colors mt-6"
                  >
                    Continue to Payment →
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Select Payment Method
                  </h3>

                  <div
                    onClick={handlePaymentSuccess}
                    className="p-4 border-2 border-green-500 bg-green-50 rounded-lg cursor-pointer hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-white text-2xl">💵</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">
                            Cash on Delivery
                          </h4>
                          <p className="text-sm text-gray-600">
                            Pay when you receive your order
                          </p>
                        </div>
                      </div>
                      <div className="text-green-600 text-2xl">
                        <FaCheckCircle />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <div className="text-blue-600 text-xl mt-0.5">ℹ️</div>
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Please keep the exact amount ready.
                      Our delivery partner will collect the payment at your
                      doorstep.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 sticky top-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>📦</span> Order Summary
              </h3>

              <div className="space-y-3 border-b border-gray-200 pb-4 mb-4 max-h-[350px] overflow-y-auto">
                {cart.products.map((product) => (
                  <div
                    key={product.productId}
                    className="flex gap-3 items-start p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Qty: {product.quantity}
                      </p>
                      <p className="text-sm font-bold text-gray-900 mt-2">
                        ₹{product.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₹{cart.totalPrice?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{cart.totalPrice?.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaCheckCircle className="text-green-600" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaCheckCircle className="text-green-600" />
                  <span>Free & fast shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaCheckCircle className="text-green-600" />
                  <span>Easy returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
