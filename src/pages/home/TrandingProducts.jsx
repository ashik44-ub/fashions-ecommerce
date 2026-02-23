import React, { useState } from 'react';
// Remove unused static data import: import products from '../../data/products.json'
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import Loading from '../../components/Loading';

const TrandingProducts = () => {
    // 1. Initialize page state, set higher initial limit if needed
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12); 

    const { data: productsData = {}, error, isLoading } = useFetchAllProductsQuery({
        category: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: currentPage,
        limit: productsPerPage // 2. API uses this to define how many items to return
    });

    if (isLoading) return <Loading />;
    if (error) return <div>Error loading products.</div>;

    // 3. Destructure safe data
    const { products = [], totalProducts = 0 } = productsData?.data || {};

    // 4. Load More Logic: Increase limit instead of splicing
    const loadMoreProducts = () => {
        // If your API supports it, you can increase the currentPage 
        // to fetch the next set of data.
        // Assuming current setup: we just increase the limit to show more
        // Or better: update a 'limit' state and refetch.
        // For simplicity with this hook, we assume backend pagination:
        setCurrentPage(prev => prev + 1);
    };

    return (
        <section className='section__container product__container'>
            <h2 className='section__header'>Trending Products</h2>
            <p className='section__subheader'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Iste hic aut culpa, aliquam neque nostrum libero quaerat pariatur!
            </p>

            {/* products card - Pass all fetched products */}
            <div className='mt-10'>
                <ProductCards products={products} />
            </div>

            {/* load more button */}
            <div className='product__btn'>
                {/* 5. Check against totalProducts from API */}
                {products.length < totalProducts && (
                    <button onClick={loadMoreProducts} className='btn'>
                        Load More
                    </button>
                )}
            </div>
        </section>
    );
};

export default TrandingProducts;
