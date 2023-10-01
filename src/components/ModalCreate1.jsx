import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import { PiTreePalmBold } from 'react-icons/pi';
import {  db, storage  } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, serverTimestamp } from 'firebase/firestore';

function ModalCreate() {
    const { showCreateModal, setShowCreateModal } = useContext(AppContext)
    const { user, setUser} = useContext(AppContext)
    // console.log('user',user)
    const [multi_image, setMulti_image] = useState([])
    //  console.log('multi_image',multi_image)


    const [product, setProduct] = useState({
        nameProduct: '',
        priceProduct:'',
        categoryProduct:'',
        descriptionProduct: '',
        comments: [],
         likes: []
        
    
      })
      
       console.log('product',product)

      const handleOnChangeCreateProduct = (e) => {
        setProduct({
          ...product,
          [e.target.name]: e.target.value
    
        })
      }
   



      const multi_image_upload = async () => {
        // console.log('sadas')
        try {
          const imageUrl = []
          if (multi_image.length > 0) {
            for (let i = 0; i < multi_image.length; i++) {
              const name = multi_image[i].name + Date.now()
              const storageRef = ref(storage, `/image1/${name}`)
              const uploadTask = await uploadBytesResumable(storageRef, multi_image[i])
              const url = await getDownloadURL(uploadTask.ref)
    
              imageUrl.push(url)
    
            }
            await addDoc(collection(db, 'test1'), {
              images: imageUrl,
              userId:user?.uid,
              createdAt: serverTimestamp(),
              ...product
    
            })
            setProduct('')
            return { 'success': 'Multi image upload success' }
    
          } else {
            return { error: 'Please provide your image ' }
          }
    
        } catch (error) {
          return { error: 'Multi image upload and store link ' }
        }
      }

    const handleShowCreateModal = ()=>{
      setShowCreateModal(true)
    }

    const handleHideCreateModal = ()=>{
      setShowCreateModal(false)
    }
    
    const handleHideUpdateModalOutside = (e)=>{
      if(e.target.id==='wrapper'){
        setShowCreateModal(false)
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
            {showCreateModal ? (
               <div onClick={handleHideUpdateModalOutside} className=' fixed inset-0 flex justify-center items-center bg-lime-400/20  h-screen w-screen '  id="wrapper">
               <div className='relative bg-lime-600 p-5 w-[380px] flex flex-col gap-2'>
                  <PiTreePalmBold onClick={()=>handleHideCreateModal()} className='absolute right-[15px] top-[15px] text-xl cursor-pointer hover:text-gray-50'/>
                  <h1 className='flex justify-center items-center text-2xl text-stone-50 font-semibold'>Thêm Sản Phẩm</h1>

                   <div className='flex items-center'>
                       <label className='min-w-[140px]'>Tên sản phẩm:</label>
                       <input type='text' className='flex-1' name='nameProduct' value={product?.nameProduct} onChange={handleOnChangeCreateProduct} />
                   </div>
                    
                   <div className='flex items-center'>
                       <label className='min-w-[140px]' >Loại sản phẩm:</label>
                            <select className='flex-1'
                             name='categoryProduct'
                        value={product?.categoryProduct}
                        onChange={handleOnChangeCreateProduct}
                       
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
                       <label className='min-w-[140px]' >Giá:</label>
                       <input type='number' className='flex-1' name='priceProduct' value={product?.priceProduct} onChange={handleOnChangeCreateProduct} />
                   </div>

                   <div className='flex items-center'>
                       <label  className='min-w-[140px]'>Mô tả sản phẩm:</label>
                       <textarea type='text' rows="5" className='flex-1' name='descriptionProduct' value={product?.descriptionProduct} onChange={handleOnChangeCreateProduct} ></textarea>
                   </div>
                   
                   <div className='flex items-center'>
                       <label  className='min-w-[140px]'>Hình ảnh sản phẩm:</label>
                       <input type='file' multiple onChange={(e) => setMulti_image(e.target.files)} className='flex-1' name='images' />
                   </div>


                   <div className='flex items-center gap-2 flex-row-reverse '>
                       <div onClick={()=>[handleHideCreateModal(),multi_image_upload()]} className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-900' >Thêm</div>
                       <div  onClick={()=>handleHideCreateModal()}  className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-lime-900'>Hủy</div>
                   </div>
                
                   

               </div>
           </div>
            ) : null }
           





        </div>
    )
}

export default ModalCreate
