import React, { useContext, useState } from 'react'
import { CgSearchFound } from "react-icons/cg";
import { AppContext } from '../context/AppProvider';
import { Link } from 'react-router-dom';
import {excerpt} from '../utility/index'




function Banner() {
  const { Searcher } = useContext(AppContext)
  const { searchResult, setSearchResult } = useContext(AppContext)
  const { typeResult,setTypeResult } = useContext(AppContext)
  
  // console.log('ddddddddd33',typeResult) 
  // console.log('searchResult',searchResult)

  const lastSearchResult = []
  // lastSearchResult.push(undefined)
  for (let i = 0; i <= 1; i++) {
    if(searchResult[i]!==undefined){

      lastSearchResult.push(searchResult[i])
      
      
    }

    // lastSearchResult.length=1
    // else{
    //   lastSearchResult.noFound='noFound'
    // }
    

    // more statements
  }

  // console.log('iiiiiiiiiiiiiiiiiiii', lastSearchResult)

 const handleFind =(e)=>{
  setTypeResult(e.target.value)
 }

//  const handleCloseOutside = (e)=>{
//   if(e.target.id==='wrapper'){
//     setSearchResult([])
//     setTypeResult([])
  
//   }
// } 


  return (
   
    <div   className='mt-[45px] h-[300px] lg:h-[350px] px-4 max-w-[1680px] mx-auto bg-orange-300 flex items-center' onClick={()=>[setSearchResult([]),setTypeResult([])]}>


      <div className='w-full h-full flex flex-col justify-center items-center'>
        <img   className='w-full h-full object-cover' src='https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
        <h1 className='flex top-20 md:top-20 lg:top-20 absolute text-blue-500 text-center sm:text-5xl text-4xl md:text-5xl  lg:text-7xl font-semibold py-5'>Food At Penang</h1>

        <div className='flex items-center absolute rounded-lg overflow-hidden '>
          <CgSearchFound size={40} className='absolute p-1 text-amber-700 ' />
          <input onChange={Searcher} onKeyUp={handleFind} type='text' className='px-10 w-full focus:outline-none shadow-2xl  bg-white/90 border-2 rounded-lg md:w-[300px] lg:w-[400px] h-12 placeholder-sky-600' placeholder='You will eat...' />

        </div>
        <div className='flex flex-col top-56 lg:top-64 h-fit w-[260px] lg:w-[350px] z-[5]  absolute bg'>
       
        {/* {searchResult.length!==0 && lastSearchResult.length===0 ? (  <h1>t tai</h1> ):(  <h1>K tai</h1> )} */}
   

        { typeResult.length!==0 && lastSearchResult.length===0 ? (
            <div className='flex justify-center items-center gap-2 cursor-pointer bg-white hover:bg-slate-200 p-2 '>
         
         <div>
           <div className='text-red-600'>No Product Found</div>
         </div>

         </div>

        ) : null}

   <>
          {lastSearchResult.map((product,index) => {
            return (
              
                  <Link to={`/detail/${product.id}`} onClick={()=>setSearchResult([])}>
                  <div className='flex justify-between items-center gap-2 cursor-pointer bg-white hover:bg-slate-200 p-2 '>
                    {/* {console.log('wwwwwwwwwwwwwww',product)} */}
                   <div>
                   <img className='h-[80px] w-[80px] object-cover' src={product?.images} />
                 </div>
                 <div>
                   <div className='text-cyan-500'> {excerpt(product?.nameProduct,11)}</div>
                 </div>
                 <div>
                   <div className='text-red-600'> {product?.priceProduct}$</div>
                 </div>

                 </div>
                 </Link>
                
            

            )
          })}
          </>

         

      
        </div>

      </div>




    </div>

  )
}

export default Banner
