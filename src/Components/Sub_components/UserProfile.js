import React, {useEffect} from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import { useGlobleContext } from '../../Context/Globle_Context'
import { useNavigate } from 'react-router-dom'
const UserProfile = () => {
    const {enabled}=useGlobleContext()
    const {user}=useAuthContext()
   const navigate=useNavigate()
    useEffect(()=>{
      if(!user){
        navigate('/')
      }
      // eslint-disable-next-line 
  },[])


  return (
   <>
    {user?<><div className='w-[100%] flex flex-col justify-center items-center'>
    <div className={`w-[300px] md:w-[400px] lg:w-[500px] ${enabled?'text-white':'text-black'} `}>
  <div className='image w-[100%] h-5 bg-pink-800'>

  </div>
  <div className='w-[100%] '>
 <h5>User name :<span> {user?user.username:''}</span></h5>
 <h5>Email ID :<span> {user?user.email:''}</span></h5>
  </div>
  <div className=''>
 <h5>Description : </h5>
 <p>NA</p>
  </div>
</div>
</div></>:''}
   </>
  )
}

export default UserProfile
