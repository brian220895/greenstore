import React from 'react'
import { AiFillFacebook,AiOutlineMail } from "react-icons/ai";
import { FaLeaf } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { SiZalo } from "react-icons/si";
import { GiThreeLeaves,GiGardeningShears} from "react-icons/gi";
import { IoIosContacts} from "react-icons/io";
// AiOutlineClose, AiOutlineMenu,GiFallingLeaf
// import { Link } from 'react-router-dom';

function Nav() {

  // const [nav,setNav]=useState(false)
  // const handleClick=()=>setNav(!nav)

   
    return (
      
  <div className='fixed group w-full h-[60px] flex justify-between items-center px-4 bg-lime-600 text-gray-300'>
    <div className='flex gap-1 z-10 group-hover:text-lime-300'>
      <FaLeaf size={30} className='cursor-pointer' /><span className='text-stone-50 font-bold  text-xl cursor-pointer hover:text-green-800 hover:font-bold'>Thế giới màu xanh</span>
    </div>
     <div>
      <input type='text' className='text-lime-500 font-bold outline-none px-3 py-2 rounded-lg  md:w-[250px]  text-lg' placeholder='Nhập tên sản phẩm...'/>
     </div>

    <ul className='group hidden md:flex'>
      <li className='hover:bg-lime-50 hover:rounded-lg hover:cursor-pointer px-3 py-1  text-green-800 font-bold  text-lg flex justify-center items-center gap-1'><SiHomeassistantcommunitystore size={23} className='text-stone-50 group-hover:text-lime-400'/>Cửa hàng</li>
      <li className='hover:bg-lime-50 hover:rounded-lg hover:cursor-pointer px-3 py-1 text-green-800 font-bold  text-lg flex justify-center items-center gap-1'><GiThreeLeaves size={25}  className='text-stone-50 group-hover:text-lime-400'/>Sản phẩm</li>
      <li className='hover:bg-lime-50 hover:rounded-lg hover:cursor-pointer px-3 py-1 text-green-800 font-bold  text-lg flex justify-center items-center gap-1'><GiGardeningShears size={27} className='text-stone-50 group-hover:text-lime-400'/>Giới thiệu</li>
      <li className='hover:bg-lime-50 hover:rounded-lg hover:cursor-pointer px-3 py-1 text-green-800 font-bold  text-lg flex justify-center items-center gap-1'><IoIosContacts size={27} className='text-stone-50 group-hover:text-lime-400'/>Liên hệ</li>
    </ul>

    {/* <div onClick={handleClick} className='md:hidden z-10'>
      {!nav ? <GiFallingLeaf  size={30} className='font-bold text-lime-800 hover:text-neutral-50 cursor-pointer'/> :<AiOutlineClose size={30} className='font-bold text-lime-800 hover:text-neutral-50 cursor-pointer'/>}
       {/* <AiOutlineMenu/> */}
    {/* </div>  */}

    
    {/* // <ul className={!nav ? 'hidden':'absolute top-0 left-0 w-full h-screen bg-lime-600 flex flex-col justify-center items-center '} >
    //   <li className='py-6 border-b-2 font-bold cursor-pointer hover:text-lime-400  '>Cửa hàng</li>
    //   <li className='py-6 border-b-2 font-bold cursor-pointer hover:text-lime-400'>Sản phẩm</li>
    //   <li className='py-6 border-b-2 font-bold cursor-pointer hover:text-lime-400'>Giới thiệu</li>
    //   <li className='py-6 border-b-2 font-bold cursor-pointer hover:text-lime-400'>Liên hệ</li>
  
    // </ul> */}

    <div className='fixed flex  flex-col top-[35%] left-0'>
     <ul>
      <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-500'>
        <a className='flex justify-between items-center w-full text-gray-300' href='/'>
          Linkedin <AiFillFacebook size={30}/>
        </a>
        </li>
        
        <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-red-500'>
        <a className='flex justify-between items-center w-full text-gray-300' href='/'>
          Linkedin <AiOutlineMail size={30}/>
        </a>
        </li>

        <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-sky-400'>
        <a className='flex justify-between items-center w-full text-gray-300' href='/'>
          Linkedin <SiZalo size={30}/>
        </a>
        </li>
     </ul>
    </div>




  </div>

    )
}

export default Nav
