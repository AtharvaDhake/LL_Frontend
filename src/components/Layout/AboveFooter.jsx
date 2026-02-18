import React from 'react';
import { HiOutlineMapPin, HiOutlineTruck, HiOutlineStar, HiOutlineHeart } from "react-icons/hi2";

const AboveFooter = () => {
  const features = [
    {
      icon: <HiOutlineMapPin className="h-10 w-10" />,
      title: "Locally Made",
      description: "Our products are 100% handcrafted with care."
    },
    {
      icon: <HiOutlineTruck className="h-10 w-10" />,
      title: "Fast Shipping, Easy Returns",
      description: "We usually ship within 1-3 business days."
    },
    {
      icon: <HiOutlineStar className="h-10 w-10" />,
      title: "High-Quality Materials",
      description: "We use premium, sustainably sourced materials."
    },
    {
      icon: <HiOutlineHeart className="h-10 w-10" />,
      title: "Small Business",
      description: "We are a passion-led small business."
    }
  ];

  return (
    <div className="bg-[#EFEDE9] py-28">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 text-gray-700">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif md:font-sans">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboveFooter;