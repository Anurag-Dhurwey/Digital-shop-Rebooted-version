import React from 'react';
import styled from 'styled-components';
import {BsFacebook,BsGithub,BsLinkedin,BsPinterest} from 'react-icons/bs'
import {FaInstagramSquare} from 'react-icons/fa'
import {AiFillCodepenCircle} from 'react-icons/ai'
import { useGlobleContext } from '../Context/Globle_Context';

const Footer = () => {
  const {enabled}=useGlobleContext()
  return (
    <>
     <Wrapper className={`${enabled?'bg-gray-800 ':'bg-slate-300'} py-10`}>

        <div className='flex justify-center align-middle gap-x-5'>
          <BsFacebook className='Icon text-[#4267B2]' /> 
          <FaInstagramSquare className='Icon text-[#C13584]'/>
          <BsGithub className='Icon text-[#000000]'/>
          <BsLinkedin className='Icon text-[#0e76a8]'/>
          <BsPinterest className='Icon text-[#E60023]'/>
          <AiFillCodepenCircle className='Icon text-white text-lg'/>
        </div>
        <div className={`${enabled?'text-white':'text-black'} text-center mt-3`}>
        <h5>
        © 2023 Copyright: Digital Shop
        </h5>
    
        </div>
     </Wrapper>
    </>
  )
}

export default Footer


const Wrapper=styled.div`
.Icon{
    
    font-size: 30px;
}
`