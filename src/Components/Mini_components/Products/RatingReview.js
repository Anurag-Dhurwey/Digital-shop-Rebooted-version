import React from 'react'

const RatingReview = ({rating}) => {
  return (
    <>
      <div className="review text-xs lg:text-base">
                <p className="text-pink-800">
                  {!rating ? "No reviews" : "true"}
                </p>{" "}
              </div>
    </>
  )
}

export default RatingReview
