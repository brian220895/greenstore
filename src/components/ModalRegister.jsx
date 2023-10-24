import React, { useContext, useState } from 'react'
import { PiTreePalmBold } from 'react-icons/pi';
import { AppContext } from '../context/AppProvider';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage  } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, serverTimestamp } from 'firebase/firestore';

import { GiOpenedFoodCan} from "react-icons/gi";

function ModalRegister() {
  const { showRegisterModal, setShowRegisterModal } = useContext(AppContext)


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  let navigate = useNavigate();

  const handleSignup = async () => {
    // console.log('email',email)
    // console.log('password',password)
    // console.log('name',name)
    const photoURL='https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=600'
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name,photoURL });
      navigate("/");
    } catch (error) {
    //   toast(error.code, { type: "error" });
    }
  };


  const handleShowRegisterModal = ()=>{
    setShowRegisterModal(true)
  }

  const handleHideRegisterModal = ()=>{
    setShowRegisterModal(false)
  }

  const handleHideUpdateModalOutside = (e)=>{
    if(e.target.id==='wrapper'){
      setShowRegisterModal(false)
    }
  }   

  return (
    <div>
    {showRegisterModal ? (
       <div onClick={handleHideUpdateModalOutside} className='z-50 fixed inset-0 flex justify-center items-center bg-orange-300/20  h-screen w-screen  '  id="wrapper">
       <div className='relative border-2 border-lime-400 shadow-lg bg-lime-400 p-5 w-[380px] flex flex-col gap-2 rounded-xl'>
          <GiOpenedFoodCan onClick={()=>handleHideRegisterModal()} className='absolute right-[15px] top-[15px] text-xl cursor-pointer hover:text-gray-50'/>
          <h1 className='flex justify-center items-center text-2xl  font-semibold'>Register an account</h1>

           <div className='flex items-center'>
               <label className='min-w-[100px]'>Name:</label>
               <input   type="text"
           className='flex-1 focus:outline-none rounded-lg p-2'
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }} />
           </div>

           <div className='flex items-center'>
               <label className='min-w-[100px]'>Email:</label>
               <input type="email"
           className='flex-1 focus:outline-none rounded-lg p-2'
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }} />
           </div>


           <div className='flex items-center'>
               <label className='min-w-[100px]'>Password:</label>
               <input type="password"
           className='flex-1 focus:outline-none rounded-lg p-2'
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}/>
           </div>
            
        

           <div className='flex items-center gap-2 flex-row-reverse '>
               <div onClick={()=>[handleHideRegisterModal(),handleSignup()]} className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-700' >Register</div>
               <div  onClick={()=>handleHideRegisterModal()}  className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-stone-400'>Cancel</div>
           </div>
        
           

       </div>
   </div>
    ) : null }


</div>
  )
}

export default ModalRegister
