import React, { useState } from 'react'
import RatingStar from '../../../components/RatingStar'
import avatar from '../../../assets/avatar.png'
import PostAReview from './PostAReview';

const ReviewsCard = ({productReviews}) => {
  const review = productReviews || [] ;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenReviewModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseReviewModal = () => {
    setIsModalOpen(false)
  }
  return (
    
 <section className="section__container mt-8">
                <div className="my-6 bg-white p-8">
            <div>
                
                {
                  review.length > 0 ? 
                                      <div>
                        <h3 className="text-lg font-medium">All Comments...</h3>
                        <div>
                          {
                            review.map((reviews, index)=> (
                                 <div key={index} className="mt-4">
                                    <div className="flex gap-4 items-center">
                                        <img src={avatar} alt="" className="h-14 w-14" />
                                        <div className="space-y-1">
                                            <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                                                {reviews?.userId?.username}
                                            </p>
                                           <p className="text-[12px] italic">
                                            {new Date(reviews?.createdAt).toLocaleDateString()}
                                          </p>
                                            <RatingStar rating={reviews?.rating}/>
                                        </div>
                                    </div>

                                    {/* Comment details */}
                                    <div className="text-gray-600 mt-5 border p-8">
                                        <p className="md:w-4/5">{reviews?.comment}</p>
                                    </div>
                                </div>
                            ))
                          }
                        </div>
                    </div>
                    : 
                    <p>No reviews yet.</p>
                }
              
                    
           
            </div>

            {/* Add comment section */}
            <div className='mt-12'>
                <button
                   onClick={handleOpenReviewModal}
                    className="px-6 py-3 bg-primary text-white rounded-md flex items-center gap-2"
                >
                    <i className="ri-pencil-line mr-2"></i> Add A Comment
                </button>
            </div>

            {/* PostAReview Modal */}
              <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal} />
            
        </div>
  </section>
  )
}

export default ReviewsCard