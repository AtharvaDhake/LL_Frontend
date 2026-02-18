import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchProductDetails, 
  fetchSimilarProducts 
} from "../../redux/slice/productSlice";
import { addToCart } from "../../redux/slice/cartSlice";


const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Educational kit added to cart!", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 bg-red-50 border border-red-200 rounded-xl">
        <p className="text-center text-red-600 text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 bg-gray-50 border border-gray-200 rounded-xl">
        <p className="text-center text-gray-600 text-lg">Educational kit not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-body">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <span>/</span>
          <a href="/collections/all" className="hover:text-primary transition-colors">Products</a>
          <span>/</span>
          <span className="text-gray-900 font-medium">{selectedProduct.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 p-4 lg:p-8">
            
            {/* Left - Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative group">
                <img
                  src={mainImage || "https://placehold.co/600x600?text=No+Image"}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {selectedProduct.isNew && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase shadow-lg">
                    New
                  </div>
                )}
                {selectedProduct.onSale && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase shadow-lg">
                    Sale
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {selectedProduct.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {selectedProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(image.url)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        mainImage === image.url
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.altText || `View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right - Product Info */}
            <div className="flex flex-col">
              {/* Product Name & Price */}
              <div className="mb-4">
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-gray-900 mb-3 leading-tight">
                  {selectedProduct.name}
                </h1>
                
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.discountPrice && selectedProduct.discountPrice < selectedProduct.price && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ₹{selectedProduct.discountPrice.toLocaleString()}
                      </span>
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md">
                        Save ₹{(selectedProduct.price - selectedProduct.discountPrice).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>

                {selectedProduct.countInStock > 0 && selectedProduct.countInStock < 10 && (
                  <p className="text-sm text-orange-600 font-medium">
                    Only {selectedProduct.countInStock} left in stock!
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                {selectedProduct.description}
              </p>

              {/* Skills, Ages, Activities */}
              <div className="space-y-4 mb-6">
                {selectedProduct.skills && selectedProduct.skills.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                      Skills Developed
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProduct.ages && selectedProduct.ages.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                      Age Group
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.ages.map((age, index) => (
                        <span
                          key={index}
                          className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-green-200 hover:bg-green-100 transition-colors"
                        >
                          {age}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProduct.activities && selectedProduct.activities.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                      Activities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.activities.map((activity, index) => (
                        <span
                          key={index}
                          className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-purple-200 hover:bg-purple-100 transition-colors"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Quantity & Add to Cart - Sticky on mobile */}
              <div className="mt-auto">
                {/* Quantity Selector */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-900 mb-2 block uppercase tracking-wide">
                    Quantity
                  </label>
                  <div className="inline-flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange("minus")}
                      disabled={quantity <= 1}
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <span className="px-5 py-2 text-base font-bold text-gray-900 min-w-[50px] text-center bg-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("plus")}
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-base transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isButtonDisabled || selectedProduct.countInStock === 0}
                  className={`w-full bg-black text-white font-bold py-3 px-6 rounded-xl text-base uppercase tracking-wide transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
                    isButtonDisabled || selectedProduct.countInStock === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {selectedProduct.countInStock === 0
                    ? "Out of Stock"
                    : isButtonDisabled
                    ? "Adding..."
                    : "Add to Cart"}
                </button>

                {/* Product Meta */}
                {selectedProduct.brand && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="font-medium">Brand:</span>
                      <span className="font-semibold text-gray-900">{selectedProduct.brand}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts && similarProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              You May Also Like
            </h2>
            <p className="text-gray-600">
              Discover more educational kits to enhance learning
            </p>
          </div>
          <ProductGrid products={similarProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;