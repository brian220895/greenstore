import React from 'react'
import { BsArrowLeftCircle,BsArrowRightCircle} from "react-icons/bs";


function layout() {
 const slideLeft=()=>{
   var slider = document.getElementById('slider')
   slider.scrollLeft=slider.scrollLeft-400
   console.log('slider.scrollLeft',slider.scrollLeft)
 }
 const sliderRight=()=>{
  var slider =document.getElementById('slider')
  slider.scrollLeft=slider.scrollLeft+400
  console.log('slider.scrollRight',slider.scrollLeft)
 }


  return (
    <div className='relative w-screen flex items-center'>
      <BsArrowLeftCircle className=' z-10 left-4 absolute text-white' onClick={slideLeft} size={30}/>
<div id='slider' className='w-full h-[150px] overflow-x-scroll scroll scroll-smooth whitespace-nowrap no-scrollbar '>
 
<div className='select-none w-[45%] md:w-[20%] lg:w-[15%] h-full inline-grid cursor-pointer relative  ml-2'>
  <img className='w-full h-full object-cover  '
   src='https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600'
/>
  <div className='absolute bottom-0 flex flex-col  bg-white/40 w-full'>
  <div className='flex flex-col items-center justify-center  px-2'>
  <h1 className='text-blue-600 md:text-blue-800 text-sm justify-start'>Ten</h1>
  <div className='text-red-600 md:text-red-700 text-sm justify-start'>90</div>
  </div>

  </div>
  
</div>



<div className='select-none w-[45%] md:w-[20%] lg:w-[15%] h-full inline-grid cursor-pointer relative  ml-2'>
  <img className='w-full h-full object-cover  '
   src='https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600'
/>
  <div className='absolute bottom-0 flex flex-col  bg-white/40 w-full'>
  <div className='flex flex-col items-center justify-center  px-2'>
  <h1 className='text-blue-600 md:text-blue-800 text-sm justify-start'>Ten</h1>
  <div className='text-red-600 md:text-red-700 text-sm justify-start'>90</div>
  </div>

  </div>
  
</div>



<div className='select-none w-[45%] md:w-[20%] lg:w-[15%] h-full inline-grid cursor-pointer relative  ml-2'>
  <img className='w-full h-full object-cover  '
   src='https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600'
/>
  <div className='absolute bottom-0 flex flex-col  bg-white/40 w-full'>
  <div className='flex flex-col items-center justify-center  px-2'>
  <h1 className='text-blue-600 md:text-blue-800 text-sm justify-start'>Ten</h1>
  <div className='text-red-600 md:text-red-700 text-sm justify-start'>90</div>
  </div>

  </div>
  
</div>











  

</div> 
<BsArrowRightCircle className=' z-10 right-4 absolute text-white' onClick={sliderRight} size={30}/>
</div>
  )
}

export default layout
