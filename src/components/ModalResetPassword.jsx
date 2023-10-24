import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import {auth,firebase,storage} from '../config/firebase'
import { AppContext } from '../context/AppProvider';

import { GiOpenedFoodCan} from "react-icons/gi";

function ModalResetPassword() {
  const { showResetPasswordModal,setShowResetPasswordModal } = useContext(AppContext)
  const { showLoginModal, setShowLoginModal } = useContext(AppContext)

  const [email, setEmail] = useState('')
  const [sentEmail, setSentEmail] = useState('')
  // const auth = getAuth();

  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    // console.log("Password reset email sent")
    setEmail('')
    setSentEmail("Password reset email sent to you")
  }


  const handleShowResetPasswordModal = ()=>{
    setShowResetPasswordModal(true)
  }

  const handleHideResetPasswordModal = ()=>{
    setShowResetPasswordModal(false)
  }

  const handleHideResetPasswordModalOutside = (e)=>{
    if(e.target.id==='wrapper'){
      setShowResetPasswordModal(false)
    }
  }   




 
  return (
    // <div className="resetPassword-main">
    //   <input type='text' name='email' onChange={(e)=>setEmail(e.target.value)}/>
    //   <button className="resetBtn" type="button" onClick={triggerResetEmail}>Reset password</button>

    // </div>

    <div>
    {showResetPasswordModal ? (
       <div  onClick={handleHideResetPasswordModalOutside} className='z-50 fixed inset-0 flex justify-center items-center bg-orange-300/20  h-screen w-screen  '  id="wrapper">
       <div className='relative border-lime-400 shadow-lg bg-lime-400 p-5 w-[380px] flex flex-col gap-2 rounded-xl'>
          <GiOpenedFoodCan onClick={()=>handleHideResetPasswordModal()} className='absolute right-[15px] top-[15px] text-xl cursor-pointer hover:text-gray-50'/>
          <h1 className='flex justify-center items-center text-2xl  font-semibold'>Reset your account</h1>
           <div className='flex items-center'>
               <label className='min-w-[50px]'>Email:</label>
               <input type="email"
           className='flex-1 focus:outline-none rounded-lg p-2'
          placeholder="Enter your email"
          name='email' onChange={(e)=>setEmail(e.target.value)}
           />
           </div>


           <div className='flex items-center gap-2 flex-row-reverse '>
               <div onClick={()=>[setShowLoginModal(false),triggerResetEmail()]} className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-700' >Reset</div>
               <div  onClick={()=>handleHideResetPasswordModal()}  className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-stone-400'>Cancel</div>
           </div>
           
           {sentEmail!='' ? ( <div className='flex items-center justify-center'>
               <h1 className='text-xl'>{sentEmail}</h1>
           </div>) : ('')}
          
           

       </div>
   </div>
    ) : null }


</div>
  )
}

export default ModalResetPassword
