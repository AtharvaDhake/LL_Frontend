import React from 'react'
import { Link } from 'react-router-dom'

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className="group block h-full">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
                    {/* Image Container */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                        <img 
                            src={product.images?.[0]?.url || "https://placehold.co/600x400?text=No+Image"} 
                            alt={product.images?.[0]?.altText || product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Product Badges */}
                        {product.isNew && (
                            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                                New
                            </div>
                        )}
                        {product.onSale && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                                Sale
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem] mb-3">
                            {product.name}
                        </h3>
                        
                        <div className="mt-auto pt-4 flex items-center justify-between">
                            <p className="text-2xl font-bold text-gray-900">
                                ₹{product.price.toLocaleString()}
                            </p>
                             <button className="text-base bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors">
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default ProductGrid