import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="p-5">
        {/* Title skeleton */}
        <div className="h-5 bg-gray-200 rounded mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
        
        {/* Price and button skeleton */}
        <div className="flex items-center justify-between mt-6">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
