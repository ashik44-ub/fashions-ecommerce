import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { usePostAReviewMutation } from '../../../redux/features/reviews/reviewsApi'

const PostAReview = ({ isModalOpen, handleClose }) => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    // id না থাকলে কুয়েরি স্কিপ করার লজিক ঠিক করা হয়েছে
    const { refetch } = useFetchProductByIdQuery(id, {
        skip: !id 
    });

    const [postAReview] = usePostAReviewMutation();
    const navigate = useNavigate();

    const handleRating = (value) => {
        setRating(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ইউজার লগইন আছে কি না চেক
        if (!user) {
            alert("You must be logged in to post a review");
            return navigate('/login');
        }

        // রেটিং ভ্যালিডেশন
        if (rating === 0) {
            alert("Please select a rating!");
            return;
        }

        const newReview = {
            comment: comment,
            rating: rating,
            userId: user?._id,
            productId: id
        }

        try {
            await postAReview(newReview).unwrap();
            alert("Review posted successfully!");
            setRating(0);
            setComment('');
            handleClose(); // সফল হলে মডাল বন্ধ হবে
            refetch();    // নতুন ডাটা ফেচ করার জন্য
        } catch (error) {
            alert(error?.data?.message || "Error posting review");
        }
    }

    return (
        <div
            // মডালের বাইরে ক্লিক করলে মডাল বন্ধ হওয়ার লজিক
            onClick={handleClose}
            className={`fixed inset-0 ${isModalOpen ? "flex" : "hidden"} bg-black/90 items-center justify-center z-40 px-2`}
        >
            <div 
                // বক্সের ভেতরে ক্লিক করলে যেন মডাল বন্ধ না হয় (stopPropagation)
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-md shadow-lg w-96 z-50"
            >
                <h2 className="text-lg font-bold mb-4">Post a Review</h2>

                {/* স্টার রেটিং সেকশন */}
                <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleRating(star)}
                            className="cursor-pointer text-yellow-500 text-xl"
                        >
                            {rating >= star ? (
                                <i className="ri-star-fill"></i>
                            ) : (
                                <i className="ri-star-line"></i>
                            )}
                        </span>
                    ))}
                </div>

                {/* কমেন্ট বক্স */}
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Write your comment here..."
                />

                {/* বাটন সেকশন */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-400 transition-colors"
                    >
                        <i className="ri-close-line"></i> Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-primary text-white rounded-md flex items-center gap-2 hover:bg-opacity-90 transition-colors"
                    >
                        <i className="ri-check-line"></i> Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostAReview