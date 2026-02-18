import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts } from "../../redux/slice/adminProductSlice";
import { fetchAllOrders } from "../../redux/slice/adminOrderSlice";
import { FaShoppingCart, FaBox, FaRupeeSign, FaArrowUp, FaTruck, FaCheckCircle, FaClock } from "react-icons/fa";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate quick stats
  const deliveredOrders = orders?.filter(o => o.status === "Delivered").length || 0;
  const pendingOrders = orders?.filter(o => o.status === "Processing" || o.status === "Pending").length || 0;
  const shippedOrders = orders?.filter(o => o.status === "Shipped").length || 0;

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalSales.toLocaleString()}`,
      icon: FaRupeeSign,
      bgColor: "from-green-500 to-emerald-600",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-600",
      trend: "+12.5%",
      trendUp: true
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: FaShoppingCart,
      bgColor: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-600",
      link: "/admin/orders",
      linkText: "View All"
    },
    {
      title: "Total Products",
      value: products.length,
      icon: FaBox,
      bgColor: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-600",
      link: "/admin/products",
      linkText: "Manage"
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: FaCheckCircle,
      bgColor: "from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-600",
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      {productsLoading || ordersLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : productsError ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Error fetching products: {productsError}
        </div>
      ) : ordersError ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Error fetching orders: {ordersError}
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                    <stat.icon className={`text-2xl ${stat.iconColor}`} />
                  </div>
                  {stat.trend && (
                    <div className={`flex items-center gap-1 text-sm font-semibold ${
                      stat.trendUp ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <FaArrowUp className={stat.trendUp ? '' : 'rotate-180'} />
                      <span>{stat.trend}</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-3">{stat.value}</p>
                
                {stat.link && (
                  <Link
                    to={stat.link}
                    className="text-sm font-medium text-green-600 hover:text-green-700 inline-flex items-center gap-1"
                  >
                    {stat.linkText} →
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Order Status Quick View */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <FaClock className="text-blue-600 text-xl" />
                <h3 className="font-semibold text-blue-900">Pending Orders</h3>
              </div>
              <p className="text-3xl font-bold text-blue-900">{pendingOrders}</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <FaTruck className="text-amber-600 text-xl" />
                <h3 className="font-semibold text-amber-900">Shipped</h3>
              </div>
              <p className="text-3xl font-bold text-amber-900">{shippedOrders}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <FaCheckCircle className="text-green-600 text-xl" />
                <h3 className="font-semibold text-green-900">Delivered</h3>
              </div>
              <p className="text-3xl font-bold text-green-900">{deliveredOrders}</p>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                  <p className="text-sm text-gray-600 mt-1">Latest orders from your customers</p>
                </div>
                <Link
                  to="/admin/orders"
                  className="text-sm font-medium text-green-600 hover:text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
                >
                  View All
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders && orders.length > 0 ? (
                    [...orders]
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .slice(0, 5)
                      .map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            #{order._id.slice(-8)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {formatDate(order.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.user?.name || "Unknown User"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            ₹{order.totalPrice.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            order.status === "Delivered" ? "bg-green-100 text-green-800" :
                            order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                            order.status === "Cancelled" ? "bg-red-100 text-red-800" :
                            "bg-amber-100 text-amber-800"
                          }`}>
                            {order.status || "Processing"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center">
                        <div className="text-gray-400">
                          <FaShoppingCart className="mx-auto text-4xl mb-2" />
                          <p className="text-sm">No recent orders found.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHomePage;
