import { useEffect, useState } from "react";
import Hero from "../Layout/Hero";
import NewArrivals from "../Products/NewArrivals";
import ProductDetails from "../Products/ProductDetails";
import FeaturedCollection from "../Products/FeaturedCollection";
import axios from "axios";

const Home = () => {
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestSeller();
  }, []);

  return (
    <div>
      <Hero />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product ...</p>
      )}

      <FeaturedCollection />
    </div>
  );
};

export default Home;