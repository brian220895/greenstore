import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import { GiOpenedFoodCan } from "react-icons/gi";
import moment from 'moment'
import { addDoc, collection, serverTimestamp,arrayUnion } from 'firebase/firestore';
import {  db, storage  } from '../config/firebase';

function ModelSpecialRequest() {
    const [dateData, setDateData]=useState(moment().format('YYYY-DD-MMThh:mm'))
    const { showSpecialRequestModal, setShowSpecialRequestModal } = useContext(AppContext)
    const { showLoginModal, setShowLoginModal } = useContext(AppContext)
    const {categoryCount } = useContext(AppContext)
    const { user, setUser} = useContext(AppContext)


    const [request, setRequest] = useState({
        nameRequest: '',
        phoneRequest:'',
        categoryProduct:'',
        dateRequest:moment().format('YYYY-DD-MMThh:mm'),
        descriptionRequest: '',
        statusRequest:'Requesting',
        
      
        
    
      })
      

      const handleOnChangeRequestProduct = (e) => {
        setRequest({
          ...request,
          [e.target.name]: e.target.value
    
        })
      }

      console.log('request',request)
    
      const handleRequest=()=>{
        if(user){
       
        addDoc(collection(db, 'request'), {
          
            userId:user?.uid,
            createdAt: serverTimestamp(),
            ...request
  
          })
        }else{
            setShowLoginModal(true)
        }
           

      }

    
    const handleShowSpecialRequestModal = () => {
        setShowSpecialRequestModal(true)
    }

    const handleHideSpecialRequestModal = () => {
        setShowSpecialRequestModal(false)
    }

    const handleHideSpecialRequestModalOutside = (e) => {
        if (e.target.id === 'wrapper') {
            setShowSpecialRequestModal(false)
        }
    }

    const categoryOption = [
        "Rice",
        "Soup",
        "Porridge",
        "Steaming dishes",
        "Stired-dried dishes",
        "Boilded dishes",
        "Fruit",
        "Vegetable",
        "Others"
      ];
   

    return (

        <div>
    
    
        <div onClick={handleHideSpecialRequestModalOutside} className='fixed inset-0 flex justify-center items-center bg-orange-200/20  h-screen w-screen ' id="wrapper">
                   <div className='relative bg-blue-400 m-2 p-5 w-[380px] md:w-[450px] lg:w-[550px] flex flex-col gap-2'>
                      <GiOpenedFoodCan onClick={()=>handleHideSpecialRequestModal()} className='absolute right-[15px] top-[15px] text-xl cursor-pointer hover:text-gray-50'/>
    
    
                      <h1 className='flex justify-center items-center text-2xl font-semibold'>Add your request for us:</h1>
                     
                      
                      <div className='flex items-center'>
                            <label className='min-w-[120px]'>Your Name:</label>
                            <input type='text' className='flex-1 focus:outline-none' name='nameRequest' value={request?.nameRequest} onChange={handleOnChangeRequestProduct} />
                        </div>

                        <div className='flex items-center'>
                            <label className='min-w-[120px]'>Phone Number:</label>
                            <input type='text' className='flex-1 focus:outline-none' name='phoneRequest' value={request?.phoneRequest} onChange={handleOnChangeRequestProduct} />
                        </div>

                        <div className='flex items-center'>
                            <label className='min-w-[120px]'>Date:</label>
                            <input
                             className='flex flex-1'
                                type="datetime-local"
                                id="meeting-time"
                                // name="dateRequest"
                                // value={dateData}
                                min="2023-06-07T00:00"
                                max="2025-06-14T00:00"
                                name='dateRequest' value={request?.dateRequest} onChange={handleOnChangeRequestProduct}
                            />
                        </div>

                        <div className='flex items-center'>
                       <label className='min-w-[120px]' >Catetory:</label>
                            <select className='flex-1'
                             name='categoryProduct' value={request?.categoryProduct} onChange={handleOnChangeRequestProduct} 
                       
                      >
                
                        <option>Please select category</option>
                        {categoryCount.map((option, index) => (
                          <option value={option.categoryProduct || ""} key={index}>
                            {option.categoryProduct}
                          </option>
                        ))}
                      </select>
                   </div>



                        <div className='flex items-center'>
                       <label  className='min-w-[120px]'>Detail:</label>
                       <textarea type='text' rows="5" placeholder='Write  detail of your request' className='flex-1 focus:outline-none' name='descriptionRequest' value={request?.descriptionRequest} onChange={handleOnChangeRequestProduct}  ></textarea>
                         </div>
                  
                       
                       
                 
    
    
                       <div className='flex items-center gap-2 flex-row-reverse '>
                           <div onClick={()=>[handleRequest()]} className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-900' >Send</div>
                           <div  onClick={()=>handleHideSpecialRequestModal()}  className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-stone-400'>Cancel</div>
                       </div>
                    
                       
    
                   </div>
               </div>
    
    
    
        </div>



        // <div>
        //      <div onClick={handleHideSpecialRequestModalOutside} className='fixed inset-0 flex justify-center items-center bg-orange-200/20  h-screen w-screen ' id="wrapper">
        //        <div className='relative bg-blue-400 m-2 p-5 w-[380px] md:w-[450px] lg:w-[550px] flex flex-col gap-2'>
        //           <GiOpenedFoodCan onClick={()=>handleHideSpecialRequestModal()} className='absolute right-[15px] top-[15px] text-xl cursor-pointer hover:text-gray-50'/>
        //                 <h1 className='flex justify-center items-center text-2xl text-stone-50 font-semibold'>Add your request for us</h1>




                //         <div className='flex items-center'>
                //             <label className='min-w-[140px]'>Your Name:</label>
                //             <input type='text' className='flex-1 focus:outline-none' name='nameProduct' />
                //         </div>

                //         <div className='flex items-center'>
                //             <label className='min-w-[140px]'>Phone Number:</label>
                //             <input type='text' className='flex-1 focus:outline-none' name='nameProduct' />
                //         </div>


                //         <div className='flex items-center'>
                //             <label className='min-w-[140px]'>Date:</label>
                //             <input
                //              className='flex flex-1'
                //                 type="datetime-local"
                //                 id="meeting-time"
                //                 name="meeting-time"
                //                 value={dateData}
                //                 min="2023-06-07T00:00"
                //                 max="2025-06-14T00:00"
                //                 onChange={(e) => setDateData(e.target.value)}
                //             />
                //         </div>

                //         <div className='flex items-center'>
                //        <label className='min-w-[140px]' >Catetory:</label>
                //             <select className='flex-1'
                //              name='categoryProduct'
                //         // value={product?.categoryProduct}
                //         // onChange={handleOnChangeCreateProduct}
                       
                //       >
                //         {/* {console.log('saddsa',categoryCount)} */}
                //         <option>Please select category</option>
                //         {categoryCount.map((option, index) => (
                //           <option value={option.categoryProduct || ""} key={index}>
                //             {option.categoryProduct}
                //           </option>
                //         ))}
                //       </select>
                //    </div>



                //         <div className='flex items-center'>
                //        <label  className='min-w-[140px]'>Detail:</label>
                //        <textarea type='text' rows="5" className='flex-1 focus:outline-none' name='descriptionProduct'  ></textarea>
                //          </div>



        //                  <div className='flex items-center gap-2 flex-row-reverse '>
        //        <div className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-700' >Send</div>
        //        <div   className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-stone-400'>Cancel</div>
        //    </div>











        //             </div>
        //         </div>
        //     ) : null}






        // </div>
    )
}

export default ModelSpecialRequest
