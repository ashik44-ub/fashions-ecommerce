import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const CategoryPage = () => {
    const {categoryName} = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState(12);
    const {data: productsData = {}, error, isLoading} = useFetchAllProductsQuery({
        category: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: currentPage,
        limit: filteredProducts 
    });

      const { products = [], totalProducts = 0 } = productsData?.data || {};

    useEffect(()=> {
        const filtered = products.filter((product)=> product?.category === categoryName.toLowerCase());
        setFilteredProducts(filtered)
    },[])
  return (
    <>
     <section className="section__container bg-red-100">
            <h2 className='section__header capitalize'>{categoryName}</h2>
            <p className='section__subheader'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, delectus explicabo et suscipit dolores nesciunt.</p>
        </section>
        {/* Products Card Showing Here */}
        <div className='section__container'>
            <ProductCards  products={filteredProducts} />
        </div>
    </>
  )
}

export default CategoryPage