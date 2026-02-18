
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import ProductGrid from "../components/Products/ProductGrid";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import { fetchProducts } from "../redux/slice/productSlice";
import Breadcrumb from "../components/Common/Breadcrumb";
import { ProductGridSkeleton } from "../components/Common/SkeletonLoader";

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        
        // Construct filters object
        const filters = {
             collection,
             page: params.page || 1,
             limit: params.limit || 50,
             sort: params.sort,
             search: params.search,
             minPrice: params.minPrice,
             maxPrice: params.maxPrice,
             skill: params.skill, 
             age: params.age,
             activity: params.activity,
             brand: params.brand,
             category: params.category 
        };

        dispatch(fetchProducts(filters));
    }, [collection, searchParams, dispatch]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            {/* Hero / Header Section */}
            <div className="bg-white shadow-sm py-10 px-4 sm:px-6 lg:px-8 mb-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 capitalize tracking-tight">
                            {collection === 'all' ? 'All Collections' : collection}
                        </h1>
                        <p className="mt-3 text-base text-gray-500 max-w-2xl">
                            Explore our curated selection designed to spark creativity and learning.
                        </p>
                    </div>
                     {/* Mobile Filter Toggle */}
                    <button 
                        className="mt-4 sm:mt-0 lg:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition shadow-md"
                        onClick={toggleSidebar}
                    >
                         {isSidebarOpen ? "Close Filters" : "Filter Products"}
                    </button>
                </div>
            </div>

            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 pb-12">
                <div className="flex flex-col lg:flex-row gap-8 relative items-start max-w-[1920px] mx-auto">
                    
                    {/* Sidebar - Desktop: Sticky, Mobile: Modal/Overlay logic could be improved but keeping simple toggle for now */}
                    <aside className={`lg:w-64 flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
                        <div className="sticky top-6">
                             <FilterSidebar />
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 w-full">
                        {/* Breadcrumb */}
                        <Breadcrumb items={[
                            { label: 'Collections', link: '/collections/all' },
                            { label: collection === 'all' ? 'All Products' : collection }
                        ]} />

                        {/* Toolbar: Sort & Count */}
                        <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                             <p className="text-sm text-gray-500 font-medium pl-2">
                                Showing <span className="text-gray-900 font-bold">{products.length}</span> results
                             </p>
                             <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                                <SortOptions />
                             </div>
                        </div>

                        {/* Product Grid */}
                        <div className="min-h-[400px]">
                            {loading ? (
                                <ProductGridSkeleton count={8} />
                            ) : error ? (
                                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center">
                                    <p>Error loading products: {error}</p>
                                </div>
                            ) : products.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                                </div>
                            ) : (
                                <ProductGrid products={products} />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CollectionPage;
