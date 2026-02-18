import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/featured-kids.jpg";

const FeatureCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center bg-green-50 rounded-3xl overflow-hidden">
        
        {/* Left Side: Text Content */}
        <div className="p-8 text-center md:text-left md:w-1/2">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Fun & Learning
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Educational Kits made for your child's everyday discovery
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover high-quality, engaging educational kits that effortlessly blend
            fun and learning. Designed to spark curiosity, build skills, and make
            every day an exciting adventure in science, engineering, creativity,
            and more.
          </p>
          <Link
            to="/collections/all"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition-colors"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/2">
          <img
            src={featured}
            alt="Children learning with educational kits"
            className="w-full h-full object-cover md:rounded-tr-3xl md:rounded-br-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureCollection;