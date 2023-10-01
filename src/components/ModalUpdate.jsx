import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import { PiTreePalmBold } from 'react-icons/pi';
import {  db, storage  } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';

function ModalUpdate({product}) {
    
    const {showUpdateModal, setShowUpdateModal} = useContext(AppContext)
    const [multi_image_update, setMulti_image_update] = useState("")

    const [productUpdate, setProductUpdate]=useState({
    
        nameProduct:product.nameProduct,
        priceProduct:product.priceProduct,
        categoryProduct:product.categoryProduct,
        descriptionProduct:product.descriptionProduct,
        images:product.images,
        userId:product.userId,
        createdAt: product.createdAt
    })
  
    // console.log('product2',product )
    console.log('productUpdate',productUpdate )
    // console.log('productUpdate',productUpdate)
    const deleteImagesUpdate = async (id, imageUrls) => {
        try {
          // console.log(ids)
          // console.log(imageUrls)
       
    
          for (let i = 0; i < imageUrls.length; i++) {
            const storageRef = ref(storage, imageUrls[i]);
            await deleteObject(storageRef);
    
          }
    
    
        } catch (error) {
          // toast("Error deleting article", { type: "error" });
          console.log(error);
        }
      }



    const multi_image_upload_update = async () => {
        try {
          const imageUrl = []
          if (multi_image_update.length > 0) {
            for (let i = 0; i < multi_image_update.length; i++) {
              const name = multi_image_update[i].name + Date.now()
              const storageRef = ref(storage, `/image1/${name}`)
              const uploadTask = await uploadBytesResumable(storageRef, multi_image_update[i])
              const url = await getDownloadURL(uploadTask.ref)
    
              imageUrl.push(url)
    
            }
            // await addDoc(collection(db, 'test1'), {
            //   image: imageUrl,
            //   ...data
    
            // })
            deleteImagesUpdate(product.id,product.images)
    
            const userDoc = doc(db, "test1", product.id);
            const newFields = {
                nameProduct:productUpdate.nameProduct,
                priceProduct:productUpdate.priceProduct,
                categoryProduct:productUpdate.categoryProduct,
                descriptionProduct:productUpdate.descriptionProduct,
                images:imageUrl,
                userId:productUpdate.userId,
                createdAt: serverTimestamp(),
                
                
             };
            await updateDoc(userDoc, newFields);
    
    
            return { 'success': 'Multi image upload success' }
    
          } else {
    
            const userDoc = doc(db, "test1", product.id);
            const newFields = {
                nameProduct:productUpdate.nameProduct,
                priceProduct:productUpdate.priceProduct,
                categoryProduct:productUpdate.categoryProduct,
                descriptionProduct:productUpdate.descriptionProduct,
                userId:productUpdate.userId,
                createdAt: serverTimestamp()
             };
            await updateDoc(userDoc, newFields);
            console.log('up:',newFields )
            // return { error: 'Please provide your image ' }
          }
    
        } catch (error) {
          return { error: 'Multi image upload and store link ' }
        }
      }


      const handleShowUpdateModal = ()=>{
        setShowUpdateModal(true)
}

const handleHideUpdateModal = ()=>{
    setShowUpdateModal(false)
}

const handleHideUpdateModalOutside = (e)=>{
  if(e.target.id==='wrapper'){
    setShowUpdateModal(false)
  }
}

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];


  return (
    <div>
     
     <div onClick={handleHideUpdateModalOutside} className='fixed inset-0 flex justify-center items-center bg-lime-400/20  h-screen w-screen ' id="wrapper">
               <div className='relative bg-lime-600 p-5 w-[380px] flex flex-col gap-2'>
                  <PiTreePalmBold onClick={()=>handleHideUpdateModal()} className='absolute right-[15px] top-[15px] text-xl cursor-pointer hover:text-gray-50'/>
                  <h1 className='flex justify-center items-center text-2xl text-stone-50 font-semibold'>Cap nhat Sản Phẩm</h1>

                   <div className='flex items-center'>
                       <label className='min-w-[140px]'>Tên sản phẩm:</label>
                       <input type='text' className='flex-1' name='nameProduct' defaultValue={product?.nameProduct}  onChange={(e)=>setProductUpdate({...productUpdate,nameProduct:e.target.value})} />
                   </div>
                    
                   <div className='flex items-center'>
                       <label className='min-w-[140px]' >Giá:</label>
                       <input type='number' className='flex-1' name='priceProduct' defaultValue={product?.priceProduct}  onChange={(e)=>setProductUpdate({...productUpdate,priceProduct:e.target.value})} />
                   </div>

                   <div className='flex items-center'>
                       <label className='min-w-[140px]' >Loại sản phẩm:</label>
                            <select className='flex-1'
                            name='categoryProduct'
                        defaultValue={product?.categoryProduct}
                        onChange={(e)=>setProductUpdate({...productUpdate,categoryProduct:e.target.value})}
                       
                      >
                        <option>Please select category</option>
                        {categoryOption.map((option, index) => (
                          <option value={option || ""} key={index}>
                            {option}
                          </option>
                        ))}
                      </select>
                   </div>


                   <div className='flex items-center'>
                       <label  className='min-w-[140px]'>Mô tả sản phẩm:</label>
                       <textarea type='text' rows="5" className='flex-1' name='descriptionProduct' defaultValue={product?.descriptionProduct}  onChange={(e)=>setProductUpdate({...productUpdate,descriptionProduct:e.target.value})} ></textarea>
                   </div>
                   
                   <div className='flex items-center'>
                       <label  className='min-w-[140px]'>Hình ảnh sản phẩm:</label>
                       <input type='file'  multiple onChange={(e) => setMulti_image_update(e.target.files)} className='flex-1' name='images' />
                   </div>


                   <div className='flex items-center gap-2 flex-row-reverse '>
                       <div onClick={()=>[handleHideUpdateModal(),multi_image_upload_update()]} className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-900' >Thêm</div>
                       <div  onClick={()=>handleHideUpdateModal()}  className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-lime-900'>Hủy</div>
                   </div>
                
                   

               </div>
           </div>





</div>
  )
}

export default ModalUpdate
