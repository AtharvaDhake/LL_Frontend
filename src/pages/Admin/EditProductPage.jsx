import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slice/productSlice";
import { updateProduct } from "../../redux/slice/adminProductSlice";
import axios from "axios";

const EditProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedProduct, loading, error } = useSelector((state) => state.products);
    
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        productCode: "",
        category: "",
        brand: "",
        images: [],
        skills: "", // comma separated
        ages: "", // comma separated
        activities: "", // comma separated
    });

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProduct && selectedProduct._id === id) {
            setProductData({
                name: selectedProduct.name || "",
                description: selectedProduct.description || "",
                price: selectedProduct.price || 0,
                countInStock: selectedProduct.countInStock || 0,
                productCode: selectedProduct.productCode || "",
                category: selectedProduct.category || "",
                brand: selectedProduct.brand || "",
                images: selectedProduct.images || [],
                skills: selectedProduct.skills ? selectedProduct.skills.join(", ") : "",
                ages: selectedProduct.ages ? selectedProduct.ages.join(", ") : "",
                activities: selectedProduct.activities ? selectedProduct.activities.join(", ") : "",
            });
        }
    }, [selectedProduct, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setUploading(true);
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, config);
            
            // Add new image to the images array
            setProductData(prev => ({
                ...prev,
                images: [...prev.images, { url: data.imageUrl, altText: productData.name }]
            }));
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
            alert("Image upload failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Convert comma-separated strings back to arrays
        const formattedData = {
            ...productData,
            skills: productData.skills.split(",").map(item => item.trim()).filter(Boolean),
            ages: productData.ages.split(",").map(item => item.trim()).filter(Boolean),
            activities: productData.activities.split(",").map(item => item.trim()).filter(Boolean),
            price: Number(productData.price),
            countInStock: Number(productData.countInStock),
        };

        try {
            await dispatch(updateProduct({ id, productData: formattedData })).unwrap();
            alert("Product updated successfully!");
            navigate('/admin/products');
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update product.");
        }
    };

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-3xl font-bold mb-8">Edit Product</h2>
            <form onSubmit={handleSubmit}>
                {/* Product Name */}
                <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Description */}
                 <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Price */}
                <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Count in Stock */}
                 <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">Count in Stock</label>
                    <input
                        type="number"
                        name="countInStock"
                        value={productData.countInStock}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Product Code */}
                <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">Product Code</label>
                    <input
                        type="text"
                        name="productCode"
                        value={productData.productCode}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Category */}
                <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Brand */}
                <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={productData.brand}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Image Upload */}
                 <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">Upload Image</label>
                    <input type="file" onChange={handleImageUpload} />
                    {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                    <div className="flex gap-4 mt-4 overflow-x-auto">
                        {productData.images && productData.images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image.url}
                                    alt={image.altText || "Product Image"}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">Skills (comma separated)</label>
                    <input
                        type="text"
                        name="skills"
                        value={productData.skills}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                 {/* Ages */}
                 <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">Ages (comma separated)</label>
                    <input
                        type="text"
                        name="ages"
                        value={productData.ages}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                 {/* Activities */}
                 <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">Activities (comma separated)</label>
                    <input
                        type="text"
                        name="activities"
                        value={productData.activities}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-end mt-8">
                     <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors font-bold"
                    >
                        Update Product
                    </button>
                </div>

            </form>
        </div>
    );
};

export default EditProductPage;
