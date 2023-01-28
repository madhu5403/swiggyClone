import React from "react"
import { useNavigate } from "react-router-dom"
import { forwardRef } from "react"

type CardProps = {
  restaurant: any
}
const Card = forwardRef(({ restaurant }: CardProps, ref: any) => {
  const navigate = useNavigate()
  const cloudinaryImageId = restaurant?.data?.cloudinaryImageId
    ? restaurant?.data?.cloudinaryImageId
    : restaurant?.data?.data?.cloudinaryImageId
  return (
    <div
      ref={ref}
      style={{ margin: "1rem", width: "260", height: "200", cursor: "pointer" }}
      onClick={() => navigate(`/restaurent/${restaurant?.data?.id}`)}
    >
      <img
        width="254"
        height="160"
        src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${cloudinaryImageId}`}
      />
      <div style={{ fontWeight: "bold", cursor: "pointer" }}>
        {restaurant?.data?.name}
      </div>
      <span style={{ fontSize: "0.8rem", cursor: "pointer" }}>
        {restaurant?.data?.cuisines}
      </span>
    </div>
  )
})
export default Card
