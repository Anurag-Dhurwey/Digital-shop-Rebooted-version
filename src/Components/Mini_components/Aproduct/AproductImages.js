import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { AiFillHeart } from "react-icons/ai";
import { useWishlistContext } from '../../../Context/WishlistContext';
import { useAuthContext } from '../../../Context/AuthContext';
const AproductImages = ({image,item}) => {
    const {user}=useAuthContext()
    const { Wishlist, postWishlist, DELETEWishlist } = useWishlistContext()
    // eslint-disable-next-line
    const {head_img,banner_img}=image;
    const {id}=item
    const [imgUrl,setImgUrl]=useState(head_img[0])


    const wishlised_Or_Not = Wishlist?.filter((item) => {
        return item.attributes.wishlist.id === id;
      });
  return (
    <Wrapper>
        <div className="img_arry">
         {head_img.map((img,i)=>{
            return (
                <div key={i} >
                    <figure >
                        <img className='cursor-pointer my-1'  src={img} alt={'img.name'} width="70px" onClick={()=>{setImgUrl(img)}} onMouseEnter={()=>{setImgUrl(img)}}/>
                    </figure>
                </div>
            )
         })}
        </div>
        <div className="main_img">
             <figure className='relative'>
             {user && (
                  <AiFillHeart
                    onClick={() => {
                      wishlised_Or_Not.length
                        ? DELETEWishlist(wishlised_Or_Not[0].id)
                        : postWishlist(item);
                    }}
                    className={`rounded-full bg-gray-600  text-2xl absolute left-[80%]  cursor-pointer ${
                      Wishlist
                        ? wishlised_Or_Not.length
                          ? "hover:text-white text-red-600"
                          : "hover:text-red-600 text-white"
                        : "hover:text-red-600 text-white"
                    }`}
                  />
                )}
             <img src={imgUrl} alt={'imgAlt'} width="400px"/>
             </figure>
        </div>
    </Wrapper>
  )
}

const Wrapper=styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    gap:5px;
    margin-bottom: auto;
    padding-top: 10%;
`

export default AproductImages
