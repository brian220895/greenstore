import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import Like from './Like'
import { BiCommentDetail } from 'react-icons/bi'
import ModalComment from './ModalComment'
import {excerpt} from '../utility/index'
import ModelSpecialRequest from './ModelSpecialRequest'
import ModalUpdate from './ModalUpdate'
// import { AiOutlineHeart,AiOutlineComment} from "react-icons/ai";
// import { BiCommentDetail} from "react-icons/bi";
// import Like from './Like';
import { TiDeleteOutline} from "react-icons/ti";
import { BsThreeDotsVertical} from "react-icons/bs";
import { Link } from 'react-router-dom'





function Main() {
  const { user, setUser} = useContext(AppContext)
  const {  products, setProducts } = useContext(AppContext)
  const { showUpdateModal, setShowUpdateModal} = useContext(AppContext)
  const {showCommentModal, setShowCommentModal} = useContext(AppContext)
  const { SearchCategoryProduct } = useContext(AppContext)
  const { showSpecialRequestModal, setShowSpecialRequestModal } = useContext(AppContext)
  const { searchResult, setSearchResult } = useContext(AppContext)
  const { typeResult,setTypeResult } = useContext(AppContext)

  const {categoryCount } = useContext(AppContext)
  const {deleteImages} = useContext(AppContext)
  const { addProductCart } = useContext(AppContext)

  const {cart,setCart}=useContext(AppContext)
  
  

  
  // const bien =['22','11']
  // console.log('ddd',...bien)






   
//  console.log('products',products)
const [productUpdate, setProductUpdate] = useState('');
 const [productComment, setProductComment] = useState('');
  return (
    <div className=' max-w-[1680px] mx-auto px-4  flex items-center cursor-pointer bg-orange-300'  onClick={()=>[setSearchResult([]),setTypeResult([])]}>
      <div className='flex flex-col w-full'>
        
    


        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 pb-4 gap-2 '>

          <div className="flex flex-col w-full min-h-[250px] p-4 border-2 bg-[url('https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover ">
          <h1 className='text-center font-bold text-2xl pb-2 text-orange-500 mb-2 select-none'>Catetory:</h1>
          <div className='flex flex-wrap items-center gap-1'>
          <div onClick={()=>SearchCategoryProduct('All')} className='border-orange-600 bg-orange-600 text-white hover:bg-orange-300 hover:text-orange-600 hover:border-orange-300 border-2 p-2.5 rounded-md'>All</div>
           {categoryCount?.map(({categoryProduct,count})=>{
            return(
              <div key={categoryProduct} onClick={()=>SearchCategoryProduct(categoryProduct)} className='border-orange-600 bg-orange-600 text-white hover:bg-orange-300 hover:text-orange-600 hover:border-orange-300 border-2 p-2 rounded-md'>{categoryProduct}(<span className='text-lg font-bold'>{count}</span>)</div>
            )

           })}
            
            
          </div>
          </div>
       

          <div  className="flex flex-col w-full  min-h-[250px] p-4 border-2 bg-[url('https://images.pexels.com/photos/14110513/pexels-photo-14110513.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')] bg-cover">
          <h1 className='text-center font-bold text-2xl pb-2 text-orange-500 mb-2 '>Book a specific Order:</h1>
          <div onClick={()=>setShowSpecialRequestModal(true)} className='flex flex-wrap items-center justify-center gap-1'>
         
          <div className=' bg-lime-600 p-3 border-lime-900/5 rounded-md border-2 font-bold text-lg cursor-pointer shadow-lg hover:text-gray-50  flex gap-1 items-center mx-3'>Book your order and add your special request<span className='text-amber-500 text-2xl italic'> Here</span></div>
            
            
          </div>
          </div>




        </div>



       


        <div className=' bg-orange-300 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2'>

        
       {products.length!==0 ? (
       
        <>
         {/* {console.log('rrrrrrrrr',products)} */}
             {products?.map((product
          
              )=>{



                // console.log('9999999999999999',product)

                const {answerComments,categoryProduct,comments,createdAt,descriptionProduct,
                id,images,likes,nameProduct,priceProduct,userId}= product

                // console.log('9999999999999999',likes)
                // console.log('9999999999999999=id',id)

              return (
                <div key={id} className='relative w-full h-fit  overflow-hidden shadow-lg rounded-lg hover:scale-95 duration-300'>
                 

                 {user && user.uid === product.userId && (
                 <div className='absolute h-fit flex flex-col gap-2 w-full top-0 right-0  p-4 '>
                      <div className='flex flex-col '>
                                <TiDeleteOutline  onClick={()=>deleteImages(id,images)} className='absolute right-2 top-2 text-red-600 font-extrabold hover:text-white text-2xl' />
                          
                                <BsThreeDotsVertical onClick={()=>[setShowUpdateModal(true),setProductUpdate(product)]} className='absolute right-2 top-10 text-amber-400 text-2xl  hover:text-white'/>
                      </div> 

                 </div>
                 )}
                 
                 {/* <Link to={`/detailproduct/${product.id}`}> */}

                 <Link to={`/detail/${id}`} onClick={()=>setSearchResult([])}>
                <img className='object-cover w-full h-[350px] min-h-[350px]' src={images}/>
                 </Link>
                <div className='absolute h-fit flex flex-col gap-2 w-full bottom-0 right-0  px-4 py-2 bg-orange-200/60'>
                    <div className='flex justify-between'>
                  
                    <h1 className='font-bold text-black'>{excerpt(nameProduct,15)}</h1>
                
                    <p className='flex justify-center items-center text-red-700 font-extrabold'>{priceProduct}$</p>
                    </div>
                    
                    
    
                    <div className='flex justify-between items-center'>
                             {/* const indexCart = cart.findIndex(x => x.id === product.id) */}
                            
                             {/* {console.log('ggggggggggggggggggggggggssssssssssssss',cart)}
                             {console.log('INDEX_ID',cart.findIndex(x => x.id === product.id))} */}


                             {cart.findIndex(x => x.id === product.id)!==-1 ? (
                              <div  className='p-3 w-fit rounded-md bg-orange-600 border-spacing-1 border-neutral-950 font-extrabold hover:text-amber-500 hover:bg-orange-600'>Added</div>
                            
                               ):(
                                <div onClick={()=>addProductCart(product)} className='p-3 w-fit rounded-md bg-red-500 border-spacing-1 border-neutral-950 font-extrabold hover:text-white hover:bg-slate-700'>Book now</div>
                              )} 

                    {/* <div onClick={()=>addProductCart(product)} className='p-3 w-fit rounded-md bg-red-500 border-spacing-1 border-neutral-950 font-extrabold hover:text-amber-500 hover:bg-orange-600'>Order now</div> */}
                     <div  className='px-2 h-fit bg-blue-400 flex justify-center items-center rounded-lg '>{categoryProduct}</div>
                    </div>
    
                    <div className='flex justify-evenly items-center'>
           <div className='flex items-center text-lg' >{comments.length}<BiCommentDetail onClick={()=>[setShowCommentModal(true), setProductComment({answerComments,categoryProduct,comments,createdAt,descriptionProduct,
                id,images,likes,nameProduct,priceProduct,userId})]} size={25} className='text-cyan-600'/></div>
                       <Like id={id} likes={likes} /> 
                    
                    </div>
                
                </div>
              
              </div>
    
              )
             } )}
       </>
       ):(<h1 className='text-2xl font-bold text-center col-span-4'>No Product Found</h1>)}
             
   
        </div>




      </div>

    

      {showCommentModal ? (<ModalComment product={productComment} />) : null }

      {showUpdateModal ? (<ModalUpdate product={productUpdate} />) : null }

      {showSpecialRequestModal ? (<ModelSpecialRequest/>) : null }

    </div>
  )
}

export default Main
