import React, { useState, useEffect } from 'react';
import { useFetchAllProductsQuery } from '../redux/features/products/productsApi';
import ProductCards from '../pages/shop/ProductCards';
import Loading from './Loading';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const { data: productsData = {}, isLoading, error } = useFetchAllProductsQuery({
        category: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: 1,
        limit: 100 
    });

    useEffect(() => {
        const products = productsData.data?.products || [];
        
        // যদি সার্চ বক্স খালি থাকে, তবে ফিল্টার্ড লিস্ট খালি করে দাও
        if (searchQuery.trim() === '') {
            setFilteredProducts([]); 
        } else {
            const query = searchQuery.toLowerCase().trim();
            const filtered = products.filter(product => {
                const productName = (product.name || product.title || "").toLowerCase();
                return productName.includes(query);
            });
            setFilteredProducts(filtered);
        }
        setCurrentPage(1); 
    }, [searchQuery, productsData]);

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 500, behavior: 'smooth' });
    };

    return (
        <>
            <section className="section__container bg-red-100">
                <h2 className='section__header capitalize'>Search Products</h2>
                <p className='section__subheader'>Type a product name to see the results.</p>
            </section>

            <section className='section__container'>
                <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by product name (e.g. Polo Shirt)..."
                        className='search-bar w-full max-w-4xl p-2 border rounded outline-none focus:border-red-300'
                    />
                </div>

                {isLoading && <Loading/>}
                {error && <p className="text-center text-red-500">Error loading products!</p>}
                
                {!isLoading && !error && (
                    <>
                        {/* যদি সার্চ বক্স খালি থাকে তবে একটি মেসেজ দেখাবে */}
                        {searchQuery === '' && (
                            <div className="text-center py-10">
                                <i className="ri-search-eye-line text-5xl text-gray-300"></i>
                                <p className="text-gray-400 mt-2">Start typing to search for amazing products!</p>
                            </div>
                        )}

                        <ProductCards products={currentProducts} />
                        
                        {/* Pagination Buttons - শুধু তখনই দেখাবে যখন রেজাল্ট ১২ এর বেশি */}
                        {filteredProducts.length > productsPerPage && (
                            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                                <button 
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Prev
                                </button>

                                {[...Array(totalPages).keys()].map(number => (
                                    <button
                                        key={number + 1}
                                        onClick={() => handlePageChange(number + 1)}
                                        className={`px-4 py-2 rounded ${currentPage === number + 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}
                                    >
                                        {number + 1}
                                    </button>
                                ))}

                                <button 
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
                
                {/* যদি টাইপ করার পর কিছু খুঁজে না পাওয়া যায় */}
                {!isLoading && searchQuery !== '' && filteredProducts?.length === 0 && (
                    <p className='text-center mt-4 text-gray-500'>No products found matching "{searchQuery}"</p>
                )}
            </section>
        </>
    );
};

export default Search;