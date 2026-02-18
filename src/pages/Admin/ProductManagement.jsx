import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts, deleteProduct } from "../../redux/slice/adminProductSlice";
import { FaBox, FaPlus, FaEdit, FaTrash, FaSearch, FaRupeeSign, FaCube, FaExclamationTriangle } from "react-icons/fa";

const ProductManagement = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.adminProducts);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    const handleDelete = (id, name) => {
        if(window.confirm(`Are you sure you want to delete "${name}"?`)) {
             dispatch(deleteProduct(id));
        }
    };

    // Filter products
    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.productCode?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate stats
    const lowStockProducts = products.filter(p => p.countInStock < 10).length;
    const outOfStockProducts = products.filter(p => p.countInStock === 0).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.countInStock), 0);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
                <p className="text-gray-600">Manage your product inventory and catalog</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-1">Total Products</p>
                            <p className="text-3xl font-bold text-gray-900">{products.length}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <FaBox className="text-blue-600 text-2xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-1">Inventory Value</p>
                            <p className="text-3xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <FaRupeeSign className="text-green-600 text-2xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-1">Low Stock</p>
                            <p className="text-3xl font-bold text-amber-600">{lowStockProducts}</p>
                        </div>
                        <div className="p-3 bg-amber-100 rounded-lg">
                            <FaExclamationTriangle className="text-amber-600 text-2xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-1">Out of Stock</p>
                            <p className="text-3xl font-bold text-red-600">{outOfStockProducts}</p>
                        </div>
                        <div className="p-3 bg-red-100 rounded-lg">
                            <FaCube className="text-red-600 text-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products by name or code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>

                    {/* Create Button */}
                    <Link 
                        to="/admin/products/create" 
                        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-medium whitespace-nowrap"
                    >
                        <FaPlus />
                        <span>Create New Product</span>
                    </Link>
                </div>
            </div>
            
            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Product Code
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                {product.images && product.images[0] ? (
                                                    <img
                                                        src={product.images[0].url}
                                                        alt={product.name}
                                                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                                        <FaBox className="text-gray-400" />
                                                    </div>
                                                )}
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">₹{product.price.toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600 font-mono">{product.productCode || "N/A"}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                                product.countInStock === 0 ? "bg-red-100 text-red-800" :
                                                product.countInStock < 10 ? "bg-amber-100 text-amber-800" :
                                                "bg-green-100 text-green-800"
                                            }`}>
                                                {product.countInStock} units
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    to={`/admin/products/${product._id}/edit`}
                                                    className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-sm font-medium"
                                                >
                                                    <FaEdit />
                                                    <span>Edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product._id, product.name)}
                                                    className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition-all text-sm font-medium"
                                                >
                                                    <FaTrash />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="text-gray-400">
                                            <FaBox className="mx-auto text-4xl mb-2" />
                                            <p className="text-sm">
                                                {searchTerm ? "No products match your search." : "No products found."}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;
