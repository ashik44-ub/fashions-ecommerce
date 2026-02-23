import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/CartSlice'
import { loadStripe } from '@stripe/stripe-js';
import { getBaseUrl } from '../../utils/getBaseUrl';
import axios from 'axios';

const OrderSummery = () => {
    const {products, selectedItems, totalPrice} = useSelector((state)=> (state.cart));
    const {user} = useSelector((state)=> state.auth)

    const dispatch =  useDispatch()

    const hanldeClearCart = ()=> {
     dispatch(clearCart())
    }

    //make payment
    const makePayment = async(e) => {

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK)
      
     
      const body = {
        products: products,
        userId: user?._id
      }


      try {
        //route url index.js file er sathe thik rakhte hobe /api/orders eita ashce 
      // /create-checkout-session eita ashce order.route theke
            const response = await axios.post(`${getBaseUrl()}/api/orders/create-checkout-session`, 
          body, {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        // ২. স্ট্রাইপের নতুন নিয়ম অনুযায়ী সরাসরি রিডাইরেক্ট করুন
        // আপনার ব্যাকএন্ডে সেশন তৈরি করার সময় session.url রিটার্ন করতে হবে
        if (response.data.url) {
            window.location.href = response.data.url;
        } else {
            // যদি ব্যাকএন্ড শুধু ID পাঠায় (পুরাতন নিয়ম), তবে এই এররটি আসবে
            console.error("Backend must send session.url instead of just session.id");
        }
        
      } catch (error) {
        console.error("Error Creating Checkout", error)
      }
    }

  return (
    <div className=" bg-primary-light mt-5 rounded text-base">
  <div className="px-6 py-4 space-y-5">
    <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
    <p className="text-dark mt-2">Selected Items : {selectedItems}</p>
    {/* <p className="text-dark mt-2">Total Price : ${totalPrice.toFixed(2)}</p> */}
    <p className="text-dark mt-2">
  Total Price : ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
</p>
  </div>
  <div className="px-4 pb-6">
    <button
    onClick={(e)=> {
      e.stopPropagation();
      hanldeClearCart()
    }}
    className="bg-red-500 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center mb-4">
      <span className="mr-2">Clear Cart</span>

      <i className="ri-delete-bin-7-line"></i>
    </button>
    <button
    onClick={(e)=> {
      e.stopPropagation();
      makePayment();
    }}
    className="bg-green-600 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center">
      <span className="mr-2">Proceed Checkout</span>
      <i className="ri-bank-card-line"></i>
    </button>
  </div>
</div>
  )
}

export default OrderSummery