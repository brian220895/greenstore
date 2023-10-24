import React from 'react'

function Information() {
  return (
    <div className=' max-w-[1680px] mx-auto px-4 pb-4  flex items-center cursor-pointer bg-orange-300' >
      <div className='flex flex-col w-full'>
      <h1 className='text-center text-2xl font-extrabold py-4 text-cyan-600'>COMMIT TO STANDARDS</h1>
       
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full '>
                 

              <div className='relative flex-col justify-center items-center w-full  bg-orange-400  mt-[250px]'>
              <img className='w-full absolute h-[300px] object-cover -mt-[250px] px-2 ' src='https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600'></img>
              <h1 className='text-center text-xl font-extrabold pt-[60px] text-red-600'>QUALITY</h1>
              <p className='px-4 pb-4 text-center text-lg text-stone-800 '>Food quality is our brand and it will be much more well-known in comming time
              </p>


              </div>



              <div className='relative flex-col justify-center items-center w-full  bg-orange-400  mt-[250px]'>
              <img className='w-full absolute h-[300px] object-cover -mt-[250px] px-2 ' src='https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600'></img>
              <h1 className='text-center text-xl font-extrabold pt-[60px] text-cyan-600'>HIGIENE</h1>
              <p className='px-4 pb-4 text-center text-lg text-stone-800'>Cleanliness whose aim is to preserve health 
              </p>


              </div>



              <div className='relative flex-col justify-center items-center w-full  bg-orange-400 mt-[250px]'>
              <img className='w-full absolute h-[300px] object-cover -mt-[250px] px-2 ' src='https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600'></img>
              <h1 className='text-center text-xl font-extrabold pt-[60px] text-lime-600'>SAFE</h1>
              <p className='px-4 pb-4 text-center text-stone-800'>Food safety involves storing, handling, and preparing of food carefully
              </p>


              </div>


              <div className='relative flex-col justify-center items-center w-full  bg-orange-400 mt-[250px]'>
              <img className='w-full absolute h-[300px] object-cover -mt-[250px] px-2 ' src='https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600'></img>
              <h1 className='text-center text-xl font-extrabold pt-[60px] text-blue-600'>CHEAPEST</h1>
              <p className='px-4 pb-4 text-center text-stone-800 '>The cost is one of the important elements so that more people reach out to us as they need healthy food
              </p>


              </div>






             
             
              

              



        </div>
       

       
       


      </div>
    </div>
  )
}

export default Information
