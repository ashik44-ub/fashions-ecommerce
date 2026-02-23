import React from 'react'
import RatingStar from '../../components/RatingStar'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/CartSlice'

const ProductCards = ({ products }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {
        /* Optional chaining (?.) ব্যবহার করা হয়েছে যাতে products না থাকলে এরর না দেয় */
        products?.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="product__card">
              <div className="relative">
                <Link to={`/shop/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
                  />
                </Link>
                <div className="absolute top-3 right-3">
                  <button onClick={() => handleAddToCart(product)}>
                    <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i>
                  </button>
                </div>
              </div>

              <div className="product__card__content">
                <h4>{product.name}</h4>
                <p>${product.price} {product?.oldPrice ? <s>{product?.oldPrice}</s> : null}</p>
                <div className="product__rating">
                  <RatingStar rating={product?.rating} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-xl font-semibold text-gray-800 mb-2 col-span-full text-center">
            No Products Found
          </div>
        )
      }
    </div>
  )
}

export default ProductCards