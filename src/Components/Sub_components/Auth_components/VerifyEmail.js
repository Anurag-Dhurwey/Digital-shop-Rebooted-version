import React, { useEffect } from 'react'
import { useAuthContext } from '../../../Context/AuthContext'
import { useGlobleContext } from '../../../Context/Globle_Context'
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
const VerifyEmail = () => {
  const API=`${process.env.REACT_APP_DATAURL}`
    const {enabled}=useGlobleContext()
    const navigate = useNavigate();
    const { user,registerersEmail}=useAuthContext()



    const sendEmailConfirmation=async(email)=>{
      try {
       const response = await fetch(`${API}${process.env.REACT_APP_SEND_EMAIL_CONFIRMATION}`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({email}),
       });

       if(response?.error){
        throw response?.error;
       }else{
        message.success(`A verification mail is sent to ${email}!`);
       }

      } catch (error) {
        message.error(`Can not sent verification email to ${email}!`);
      }
}




    useEffect(()=>{
        if(user){
          navigate('/')
        }
        // eslint-disable-next-line 
    },[])

  return (
    <>
      {!user?<>
        <div className="flex justify-center items-center ">
        <div className="text-center flex flex-col justify-center items-center w-[300px] md:w-[400px] lg:w-[500px]">
            <div className='my-5'>
            <figure>
                <img src='https://colorlib.com/etc/email-template/10/images/email.png' className='h-[100px] md:h-[150px] lg:h-[200px]' alt='mail_img'/>
            </figure>
            </div>
            <div className={` ${enabled?'text-white':'text-black'}`}>
            <h5>Please verify your email</h5>
            <p>We have sent an email to {registerersEmail} to verify your account</p>
            <p>After completion of email verification you can login </p>
            </div>
            <div className='my-5'>
              <button className='px-5 py-3 bg-green-800' onClick={()=>{sendEmailConfirmation(registerersEmail)}}>Resend Link</button>
            </div>
        </div>
      </div>
      </>:''}
    </>
  )
}

export default VerifyEmail
