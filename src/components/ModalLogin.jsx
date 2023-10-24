import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import { GiOpenedFoodCan} from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, db, storage  } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, serverTimestamp } from 'firebase/firestore';




import { ImFacebook2} from "react-icons/im";
import { FcGoogle} from "react-icons/fc";
import ModalResetPassword from './ModalResetPassword';

const ModalLogin = () => {
  const { showLoginModal, setShowLoginModal } = useContext(AppContext)
  const { showRegisterModal, setShowRegisterModal } = useContext(AppContext)
  const { showResetPasswordModal, setShowResetPasswordModal } = useContext(AppContext)

  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const providerFb = new FacebookAuthProvider();
  const signInWithFacebook = () => {
    signInWithPopup(auth, providerFb)
       .then((result) => {
        setShowLoginModal(false)
         // const name = auth.currentUser;
         // const email = result.user.email;
         // const profilePic = result.user.photoURL;
         // console.log(result)
         // localStorage.setItem("name", name);
         // localStorage.setItem("email", email);
         // localStorage.setItem("profilePic", profilePic);
       })
       .catch((error) => {
         console.log(error);
       });
   };




  const providerGg = new GoogleAuthProvider();
  const signInWithGoogle = () => {
     signInWithPopup(auth, providerGg)
       .then((result) => {
        setShowLoginModal(false)
         // const name = auth.currentUser;
         // const email = result.user.email;
         // const profilePic = result.user.photoURL;
         // console.log(result)
         // localStorage.setItem("name", name);
         // localStorage.setItem("email", email);
         // localStorage.setItem("profilePic", profilePic);
       })
       .catch((error) => {
         console.log(error);
       });
   };
   



  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      // toast(error.code, { type: "error" });
    }
  };

  
  const handleShowLoginModal = ()=>{
    setShowLoginModal(true)
  }

  const handleHideLoginModal = ()=>{
    setShowLoginModal(false)
  }

  const handleHideUpdateModalOutside = (e)=>{
    if(e.target.id==='wrapper'){
      setShowLoginModal(false)
    }
  }  
  return (
    <div>
    {showLoginModal ? (
       <div onClick={handleHideUpdateModalOutside} className=' z-50 fixed inset-0 flex justify-center items-center bg-orange-300/20  h-screen w-screen  '  id="wrapper">
       <div className='relative border-2 border-lime-400 shadow-lg bg-lime-400 p-5 w-[380px] flex flex-col gap-2 rounded-xl'>
          <GiOpenedFoodCan onClick={()=>handleHideLoginModal()} className='absolute right-[15px] top-[15px] text-xl cursor-pointer hover:text-gray-50'/>
          <h1 className='flex justify-center items-center text-2xl  font-semibold'>Login your account</h1>

          <div className='flex items-center justify-center gap-4'>
            <div className='cursor-pointer hover:text-white'>Login with </div>
            <div className='text-3xl'><ImFacebook2 onClick={()=>signInWithFacebook()} className='text-sky-900 cursor-pointer'/></div>
            <div className='text-3xl'><FcGoogle onClick={()=>signInWithGoogle()} className='text-indigo-500 cursor-pointer'/></div>
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
               <div onClick={()=>[handleHideLoginModal(),handleLogin()]} className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-700' >Login</div>
               <div  onClick={()=>handleHideLoginModal()}  className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-stone-400'>Cancel</div>
           </div>


           <div className='flex flex-col items-center justify-center py-4 gap-2 '>
             <div onClick={()=>[setShowRegisterModal(true),handleHideLoginModal()]} className=' underline cursor-pointer hover:text-white'>Register now</div>
             <div onClick={()=>[setShowResetPasswordModal(true),handleHideLoginModal()]} className=' underline cursor-pointer hover:text-white'>Forgot password ?</div>
           </div>
        
           

       </div>
   </div>
    ) : null }

  




</div>
  )
}

export default ModalLogin
