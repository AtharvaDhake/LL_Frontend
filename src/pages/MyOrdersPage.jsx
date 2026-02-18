import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../redux/slice/orderSlice';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaShippingFast, FaCheckCircle, FaClock } from 'react-icons/fa';

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
      navigate(`/order/${orderId}`)
  }

  if (loading) return (
      <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
  );

  if (error) return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
      </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <FaBoxOpen className="text-blue-600" /> My Orders
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                {orders?.length || 0} Orders
            </span>
        </div>
        
        <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="min-w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-medium">
                    <tr>
                        <th className="py-3 px-4">Image</th>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Ordered On</th>
                        <th className="py-3 px-4 text-center">Shipping Status</th>
                        <th className="py-3 px-4 text-center">Items</th>
                        <th className="py-3 px-4 text-right">Price</th>
                        <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {orders && orders.length > 0 ? (
                        orders.map((order) => (
                          <tr 
                            key={order._id} 
                            onClick={() => handleRowClick(order._id)} 
                            className="bg-white border-b hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                          >
                              <td className="py-4 px-4">
                                  <img 
                                    src={order.orderItems[0].image} 
                                    alt={order.orderItems[0].name} 
                                    className="w-12 h-12 object-cover rounded-lg border border-gray-200 shadow-sm"
                                  />
                              </td>
                              <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">#{order._id}</td>
                              <td className="py-4 px-4">
                                  <div className="flex flex-col">
                                      <span className="text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</span>
                                      <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</span>
                                  </div>
                              </td>
                              <td className="py-4 px-4 text-center">
                                  <span className={`inline-flex items-center gap-1 ${order.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-xs font-medium`}>
                                    {order.isDelivered ? <FaCheckCircle /> : <FaClock />}
                                    {order.isDelivered ? 'Delivered' : 'Pending'}   
                                  </span>
                              </td>
                              <td className="py-4 px-4 text-center font-medium text-gray-700">{order.orderItems.length}</td> 
                              <td className="py-4 px-4 text-right font-medium text-gray-900">₹{order.totalPrice}</td>
                              <td className="py-4 px-4 text-center">
                                  <span className={`inline-block ${order.isPaid ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"} px-3 py-1 rounded-md text-xs font-semibold`}>
                                      {order.isPaid ? 'Paid' : 'Unpaid'}
                                  </span>
                              </td>
                          </tr>  
                        ))
                    ) : (
                         <tr>
                             <td colSpan={7} className="py-12 px-4 text-center text-gray-500">
                                 <div className="flex flex-col items-center justify-center">
                                     <FaBoxOpen className="text-gray-300 text-6xl mb-4" />
                                     <h3 className="text-lg font-medium text-gray-900 mb-1">No Orders Found</h3>
                                     <p className="text-gray-500">You haven't placed any orders yet.</p>
                                 </div>
                             </td>
                         </tr>   
                    )}
                </tbody>
            </table>

        </div>
    </div>
  );
};
export default MyOrdersPage;
