import React, { useContext } from 'react'
import { BsArrowLeftCircle,BsArrowRightCircle} from "react-icons/bs";
import { AppContext } from '../context/AppProvider';
import {excerpt} from '../utility/index'
import { Link } from 'react-router-dom';


function Slider() {
 
  const {  lovedProducts, setLovedProducts } = useContext(AppContext)
  const { searchResult, setSearchResult } = useContext(AppContext)
  const { typeResult,setTypeResult } = useContext(AppContext)


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
    <div className=' max-w-[1680px]  h-full mx-auto px-4 pt-2.5 pb-1 items-center cursor-pointer bg-orange-300 ' onClick={()=>[setSearchResult([]),setTypeResult([])]} >
    <div className='relative flex items-center'>
    {lovedProducts.length>=1 && ( <BsArrowLeftCircle className=' z-[1] left-4 absolute text-white' onClick={slideLeft} size={30}/>)}
<div id='slider' className='w-full h-full overflow-x-scroll scroll scroll-smooth whitespace-nowrap no-scrollbar  '>
 


{lovedProducts.length!==0 ? (

<>
{lovedProducts?.map((product
          
          )=>{
          //  console.log('GGGGGGGG',product)
    return (


        
            <div key={product.id} className='select-none h-full w-[45%] md:w-[20%] lg:w-[15%] inline-grid cursor-pointer relative mr-2 last:mr-0  hover:scale-105 duration-300'>
         <Link to={`/detail/${product.id}`} >
        <img className='w-full h-[200px] object-cover  '
        src={product.images}
      />
        <div className='absolute bottom-[-1px] flex flex-col  bg-black/40 w-full pb-1'>
        <div className='flex flex-col items-center justify-center px-2 ml-2'>
        <div className='text-red-600 md:text-red-600 text-sm md:text-lg font-bold'>{product.priceProduct} $</div>
        <h1 className='text-cyan-500 md:text-cyan-500 text-sm md:text-lg font-bold'>{excerpt(product.nameProduct,15)}</h1>
      
        </div>

        </div>
        </Link>
      </div>
     
    )

          })}




</>
):null}








  

</div> 
{lovedProducts.length>=1 && (<BsArrowRightCircle className=' z-[1] right-4 absolute text-white' onClick={sliderRight} size={30}/>)}
</div>
</div>
  )
}

export default Slider



