import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import Loading from '../../../components/Loading';
import RatingStar from '../../../components/RatingStar';
import ReviewsCard from '../reviews/ReviewsCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/features/cart/CartSlice';

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const { data: { data: productDetails } = {}, isLoading, isError } = useFetchProductByIdQuery(id);

    if (isLoading) return <Loading />

    if (isError) return <div className='flex items-center justify-center h-96'>Error to load Product Details</div>

    const { product, reviews } = productDetails || {}



    const handleAddToCart = (product) => {
    // Action creator-ta call koro: ()
    dispatch(addToCart(product)); 
    };

    return (
        <>
            <section className="section__container rounded bg-primary-light">
                <h2 className="section__header">Single Product Page</h2>
                <div className="section__subheader space-x-2">
                    <span className='hover:text-primary'><Link to="/">home</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'><Link to="/shop">shop</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'>{product.name}</span>
                </div>
            </section>
            <section className="section__container mt-8">
                <div className="flex flex-col items-start md:flex-row gap-12">
                    {/* Product Image */}
                    <div className="w-full md:w-1/2 shadow-md rounded-lg overflow-hidden">
                        <img
                            src={product?.image}
                            alt={product?.name}
                            className="w-full h-auto hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="w-full md:w-1/2">
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">{product?.name}</h3>

                        <div className="flex items-center gap-4 mb-4">
                            <p className="text-2xl font-semibold text-primary">
                                ${product?.price}
                            </p>
                            {product?.oldPrice && (
                                <p className="text-xl text-gray-400 line-through">
                                    ${product?.oldPrice}
                                </p>
                            )}
                        </div>

                        <div className='flex gap-2 items-center mb-4'>
                            <RatingStar rating={product?.rating} />
                            <span className="text-sm">({product?.rating} reviews)</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            {product?.description}
                        </p>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-gray-200">
                            <p className='capitalize'><strong>Category:</strong> <span className="text-gray-600">{product?.category}</span></p>
                            <p className='capitalize'><strong>Color:</strong> <span className="text-gray-600">{product?.color}</span></p>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                        onClick={()=> handleAddToCart(product)}
                            className="mt-8 w-full md:w-max px-12 py-3 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 transition-all shadow-lg"
                            
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </section>
            {/* Review Section */}
            <section>
                <ReviewsCard productReviews={reviews}/>
            </section>
        </>
    )
}

export default SingleProduct