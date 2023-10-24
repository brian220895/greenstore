import React, { useContext, useState } from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { CgSearchFound } from "react-icons/cg";
import { AiOutlineLogin,AiOutlineLogout } from "react-icons/ai";
import { FaHamburger,FaRegistered} from "react-icons/fa";
import { FaCirclePlus} from "react-icons/fa6";
import { SiGnuprivacyguard,SiGnome} from "react-icons/si";
import { BiDish} from "react-icons/bi";
import { GiOpenedFoodCan} from "react-icons/gi";

import { SlClose} from "react-icons/sl";
import { FaKitchenSet} from "react-icons/fa6";
import { MdOutlineSoupKitchen,MdContactPhone} from "react-icons/md";
import { RiShoppingBagFill} from "react-icons/ri";
import ModalCreate from './ModalCreate';
import { AppContext } from '../context/AppProvider';
import ModalRegister from './ModalRegister';
import ModalLogin from './ModalLogin';
import ModalResetPassword from './ModalResetPassword';
import ModalShoppingCart from './ModalShoppingCart';
import { Link } from 'react-router-dom';



function Navbar() {
  const { showCreateModal, setShowCreateModal } = useContext(AppContext)
   const { showRegisterModal, setShowRegisterModal } = useContext(AppContext)
   const { showLoginModal, setShowLoginModal } = useContext(AppContext)

   const { showResetPasswordModal, setShowResetPasswordModal } = useContext(AppContext)
 
   
   const { logout } = useContext(AppContext)
   const { user, setUser} = useContext(AppContext)


   const { cart,setCart} = useContext(AppContext)
   const {showShoppingCartModal, setShowShoppingCartModal}=useContext(AppContext)
   
// console.log('sdsdsadasdfasfaf',showShoppingCartModal)

   const [openMenuNavbar,setOpenMenuNavbar]=useState(false)
   const handleCloseMenuNavbar =(e)=>{
     if(e.target.id=="wrapper")
    {setOpenMenuNavbar(false)

    } 
     
   }


    // const handleClick=()=>{
    //   console.log('asdsad')
    // }
  //  const handleCloseMenuShoppingNavbar =(e)=>{
//   //   if(e.target.id=="wrapper")setOpenMenuShoppingNavbar(!openMenuShoppingNavbar)
//   // }
//  console.log(openMenuNavbar)
  return (

    <div className='fixed  z-10 inset-0 top-0 h-[45px] max-w-[1680px] mx-auto px-4 bg-orange-500 shadow-md shadow-orange-700 flex items-center'> 
   

       <div  className='relative flex items-center justify-between w-full'>

         <div  className='z-10 flex items-center gap-3'>
          {openMenuNavbar ? ( <GiOpenedFoodCan onClick={()=>setOpenMenuNavbar(!openMenuNavbar)} size={30} className='cursor-pointer text-yellow-300 hover:text-white'/>): ( <FaHamburger onClick={()=>setOpenMenuNavbar(!openMenuNavbar)} size={30} className='cursor-pointer text-yellow-300 hover:text-white'/>)}
          {/* <FaHamburger onClick={()=>setOpenMenuNavbar(!openMenuNavbar)} size={30} className='cursor-pointer text-yellow-300 hover:text-white'/> */}
          <Link to={`/`}>
          <h1 className='text-lg font-bold cursor-pointer'>Eat <span className='text-xl text-red-700'>Heathy</span><span className='text-amber-800'> & </span><span className='text-lg'>Stay</span> <span className='text-xl text-green-800'> Good</span></h1>
          </Link>
         </div>
         <div className='z-10 lg:flex items-center hidden cursor-pointer'>
         <ul className='flex items-center font-semibold gap-2'>
         <Link to={`/`}>
           <li className='hover:bg-orange-200 hover:text-red-800  px-4 py-1  rounded-lg  flex items-center cursor-pointer gap-2'><BiDish size={30}/><span className='text-lg'>Home</span></li>
           </Link>
           <li className='hover:bg-orange-200 hover:text-red-800   px-4 py-1  rounded-lg flex items-center cursor-pointer gap-2'><MdOutlineSoupKitchen size={30}/><span className='text-lg'>Blog</span></li>
           <li className='hover:bg-orange-200 hover:text-red-800  px-4 py-1  rounded-lg flex items-center cursor-pointer gap-2'><MdContactPhone size={30}/><span className='text-lg'>Contact</span></li>
         </ul>
         </div>

         <div className='z-10  hidden md:flex lg:flex items-center gap-4 cursor-pointer'>
          <div onClick={()=>setShowShoppingCartModal(true)} className='relative hidden md:flex lg:flex'>
         <RiShoppingBagFill   className='hover:text-white cursor-pointer ' size={30}/>{cart?.length!=0 && (<span className='absolute -top-1 -right-2 px-2  rounded-full bg-green-600 '>{cart?.length}</span>)}    
         </div>

         {user ? (
         <div className='z-10  hidden md:flex lg:flex items-center gap-2' >
            <span className='cursor-pointer flex items-center  gap-1'><img className='h-[30px] w-[30px]' src={user.photoURL}/>{user.displayName}</span>
           <FaCirclePlus size={30}  onClick={()=>setShowCreateModal(true)}  className='hover:text-white cursor-pointer'/> <span onClick={()=>setShowCreateModal(true)} className='cursor-pointer' >Dashboard</span>
            <SiGnome  onClick={()=>logout()} className='hover:text-white cursor-pointer' size={30}/><span className='cursor-pointer' onClick={()=>logout()}>Logout</span>
           
         </div>
         ):(
         <div className='z-10  hidden md:flex lg:flex items-center gap-2'>
            <span className='cursor-pointer' onClick={()=>[setShowLoginModal(true),setShowRegisterModal(false)]}>Login</span><SiGnuprivacyguard onClick={()=>setShowLoginModal(true)} className='hover:text-white cursor-pointer' size={30}/>
            {/* <span className='cursor-pointer'  onClick={()=>[setShowRegisterModal(true),setShowLoginModal(false)]} >Register</span><FaRegistered onClick={()=>setShowRegisterModal(true)} className='hover:text-white cursor-pointer' size={30}/> */}
         </div>
         )}



   
        
         </div>


         <div onClick={()=>setShowShoppingCartModal(true)} className='relative flex md:hidden lg:hidden  items-center cursor-pointer '>
        <RiShoppingBagFill    className=' hover:text-white cursor-pointer ' size={30}/>{cart?.length!=0 && (<span className='absolute -top-1 -right-2 px-2  rounded-full bg-green-600'>{cart?.length}</span>)} 
         </div>

        
        
     
         <div id='wrapper' onClick={handleCloseMenuNavbar} className={`lg:hidden fixed  ${openMenuNavbar ? 'flex' : 'hidden'}  w-screen h-screen bg-orange-300/5  ease-in duration-500 flex-col -ml-4   top-[44px] rounded-tr-lg rounded-br-lg`}>
         <div className='relative w-fit bg-orange-400 h-fit rounded-tr-lg rounded-br-lg pt-4'>
         <SlClose onClick={()=>setOpenMenuNavbar(!openMenuNavbar)} size={20} className='absolute right-2 top-2 text-orange-700 hover:text-white cursor-pointer'/>
          <h1 className='p-4 text-lg'>Information:</h1>
         <ul className='flex flex-col p-2 font-semibold gap-2 w-fit'>
         <Link to={`/`}>
           <li className='hover:bg-orange-200 hover:text-red-800  px-4 py-1  rounded-lg  flex items-center cursor-pointer gap-2'><BiDish size={30}/><span>Home</span></li>
           </Link>
           <li className='hover:bg-orange-200 hover:text-red-800   px-4 py-1  rounded-lg flex items-center cursor-pointer gap-2'><MdOutlineSoupKitchen size={30}/><span>Blog</span></li>
           <li className='hover:bg-orange-200 hover:text-red-800  px-4 py-1  rounded-lg flex items-center cursor-pointer gap-2'><MdContactPhone size={30}/><span>Contact</span></li>
         </ul>
          
         <div className='flex flex-col items-center gap-2 px-4'>


         {user ? (
         <div className='flex flex-col items-center gap-2 p-4'> 
         <span className='flex items-center gap-1'><img className=' h-[30px] w-[30px]' src={user.photoURL}/>{user.displayName}</span><SiGnuprivacyguard size={30}  className='hover:text-white cursor-pointer'/>
         <span onClick={()=>logout()}  className='cursor-pointer' >Logout</span><SiGnome size={30}  onClick={()=>logout()}  className='hover:text-white cursor-pointer'/>
         <span onClick={()=>setShowCreateModal(true)} className='cursor-pointer' >Dashboard</span><FaCirclePlus size={30}  onClick={()=>setShowCreateModal(true)}  className='hover:text-white cursor-pointer'/>
         </div>
         ):( 
         
         <div className='flex flex-col items-center gap-2 p-4'> 
         <span className='cursor-pointer'onClick={()=>[setShowLoginModal(true),setShowRegisterModal(false)]} >Login</span><SiGnuprivacyguard size={30} onClick={()=>setShowLoginModal(true)}  className='hover:text-white cursor-pointer'/>
         </div>
         )}
          
         {/* <span>Login</span><SiGnuprivacyguard size={30} onClick={()=>setShowLoginModal(true)}  className='hover:text-white cursor-pointer'/>
         <span>Register</span><FaRegistered size={30} onClick={()=>setShowRegisterModal(true)} className='hover:text-white cursor-pointer'/> */}
         {/* <span>Logout</span><SiGnome size={30} onClick={()=>logout()}  className='hover:text-white cursor-pointer'/> */}
         </div>
         </div>
       </div>


        



       </div>


       {/* {user ? (<div><h1>{user.displayName}</h1><button onClick={logout}>Logout</button></div>):( <button >Login with Google</button>)}  */}


       {showCreateModal ? ( <ModalCreate/>   ) : null }  
       {showRegisterModal ? ( <ModalRegister/>   ) : null }  
       {showLoginModal ? ( <ModalLogin/>   ) : null } 

       {showResetPasswordModal ? ( <ModalResetPassword/>   ) : null } 

       {showShoppingCartModal ? ( <ModalShoppingCart/>   ) : null } 

     
   
        
  
    </div>
  )
}

export default Navbar
