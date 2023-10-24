import React, { useContext } from 'react'
import { AppContext } from '../context/AppProvider'
import { GiOpenedFoodCan} from "react-icons/gi";

function ModalShoppingCart() {
    const {showShoppingCartModal, setShowShoppingCartModal}=useContext(AppContext)

    const {cart,setCart}=useContext(AppContext)
    const {calculation}=useContext(AppContext)
    const {totalAmount,setTotalAmount}=useContext(AppContext)
    const {changeIncreaseQuality,changeDecreaseQuality}=useContext(AppContext)
    const {removeProductCart}=useContext(AppContext)


    

  // console.log('showShoppingCartModal',showShoppingCartModal)
  
    const handleShowShoppingCartModal = ()=>{
        setShowShoppingCartModal(true)
    }
    
    const handleHideShoppingCartModal = ()=>{
        setShowShoppingCartModal(false)
    }
    
    const handleHideShoppingCartModalOutside = (e)=>{
    if(e.target.id==='wrapper'){
        setShowShoppingCartModal(false)
    }
    }

  return (
    <div>
    {showShoppingCartModal ? (
    
    <div onClick={handleHideShoppingCartModalOutside} className='fixed inset-0 flex justify-center items-center bg-orange-200/20  h-screen w-screen ' id="wrapper">
               <div className='relative bg-blue-400 m-2 p-5 w-[380px] md:w-[450px] lg:w-[550px] flex flex-col gap-2'>
                  <GiOpenedFoodCan onClick={()=>handleHideShoppingCartModal()} className='absolute right-[15px] top-[15px] text-xl cursor-pointer hover:text-gray-50'/>


                  <h1 className='flex justify-center items-center text-2xl  font-semibold'>Current shopping cart:({cart.length})</h1>
                  {/* max-h-[350px] */}
                  {cart.length!=0 ? (
                     <div className='flex  max-h-[350px]  flex-col p-1 bg-orange-200 overflow-y-scroll no-scrollbar'>
                     {cart.map((cartData)=>{
                      // console.log('iiii',commentData.comment)
                      return (
                        <div key={cartData.id} className='flex flex-col relative justify-between gap-2 p-4  bg-zinc-300 m-1 rounded-lg'>
                          
                          <div className=' flex gap-2 items-center justify-center '> 
                           <div className='text-lg font-semibold' >{cartData.nameProduct}</div>
                          </div>
                          
                          <div className=' flex gap-2 items-center'> 
                          <img src={cartData.images} className='h-[120px] w-[120px] object-cover'/>
                          <div>{cartData.amount}</div>x<div>{cartData.priceProduct}</div>=<div>{cartData.amount * cartData.priceProduct } $</div>

                          </div>

                          <div className=' flex items-center gap-2'> 

                          <div className='p-2  bg-cyan-800 cursor-pointer hover:text-white' onClick={()=>changeIncreaseQuality(cartData,cartData.amount)}>+</div>
                      
                          <div className='p-2 bg-cyan-800  cursor-pointer hover:text-white' onClick={()=>changeDecreaseQuality(cartData,cartData.amount)}>-</div>
                           
                           <div className='p-2 bg-red-600 cursor-pointer hover:text-white' onClick={()=>removeProductCart(cartData)}>Remove</div>
                          

                          {/* {user && user.uid === commentData.userId && (
                          <TiDeleteOutline className='absolute right-1 top-1' onClick={()=>handleDeleteComment(commentData)}/>
                          ) } */}
                           </div>
                          
                           
                        </div>
                      )
                     })}
                    
  
                
                     </div>
                     

                  ):(
                      <div className='bg-slate-300 p-5'>No products</div>

                  )}

                
                 
                 
                   
                   
                <div className='flex items-center gap-2 '>
                   {cart.length!=0 && ( <div className='flex-1 px-2  bg-red-500 text-lg'><span className='font-extrabold'>Total: </span><span className='text-yellow-300'>{totalAmount}</span> $</div>)}
                      
                      
                   </div>


                   <div className='flex items-center gap-2 flex-row-reverse '>
                   {cart.length!=0 && ( <div onClick={()=>[handleHideShoppingCartModal()]} className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-900' >Pay Now</div>)}
                      
                       <div  onClick={()=>handleHideShoppingCartModal()}  className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-stone-400'>Close</div>
                   </div>
                
                   

               </div>
           </div>
       ) : null }


    </div>
  )
}

export default ModalShoppingCart
