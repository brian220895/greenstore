import React, { useContext, useEffect, useState } from 'react'
// import UpdateImage from './UpdateImage';
import { PiTreePalmBold } from 'react-icons/pi';
import { db, storage } from '../config/firebase'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, orderBy, limit, startAfter } from 'firebase/firestore';
import { toast } from "react-toastify";
import { AppContext } from '../context/AppProvider';
// import Update from './Update';
import ModalCreate from '../components/ModalCreate1';
import ModalUpdate from '../components/ModalUpdate';
import { Link, useNavigate } from 'react-router-dom';






function Home() {
  const { showCreateModal, setShowCreateModal } = useContext(AppContext)
  const {showUpdateModal, setShowUpdateModal} = useContext(AppContext)
  const navigate = useNavigate()

  const {products, setProducts} = useContext(AppContext)
  const {deleteImages} = useContext(AppContext)
  const {Searcher} = useContext(AppContext)
  const {categoryCount} = useContext(AppContext)
  const {SearchCategoryProduct} = useContext(AppContext)
  const {signInWithGoogle,logout} = useContext(AppContext)
  const { user, setUser} = useContext(AppContext)
  // const { DetailProduct,detailProduct, setDetailProduct} = useContext(AppContext)


  const userId = user?.uid;
 
const [productUpdate, setProductUpdate] = useState('');


const NavDetailProduct =()=>{
  navigate('/detailproduct')
}


  return (
   <div>
    <div className='grid grid-cols-3'>
          <div>
          <div className='bg-lime-700 p-' onClick={()=>setShowCreateModal(true)}>Thêm</div>
          <input type="text" onChange={Searcher} />
          </div>

          <div>
              
          {products.map((product) => {
          return (
            <div   key={product.id}>
           
          <Link to={`/detailproduct/${product.id}`}>
              {/* {console.log(product.createdAt.toDate().toDateString())}  */}
              <h1>Tên sản phẩm: {product.nameProduct}</h1>
              <h1>Mô tả sản phẩm: {product.descriptionProduct}</h1>
              <h1>Giá: {product.priceProduct}</h1>
              <h1>Ngày: {product.createdAt?.toDate().toDateString()}</h1>
              {product.images.map((image) => {
                return <img key={image} src={image} alt={image} />
              })}
             </Link>

{user && user.uid === userId && (  
  <>
              <button
                onClick={() => {
                  deleteImages(product.id, product.images);
                }}
              >

                Delete User
              </button>
              
              

              <button
                onClick={() => [setProductUpdate(product),setShowUpdateModal(true) ]
                  
                }
              >

                Update User
              </button>
              </>  
)}

             
 
            </div>
           

          );
        })}

          </div>

          <div>
            
          <ul>
          {categoryCount?.map((item, index) => (
            <li  onClick={()=>SearchCategoryProduct(item.categoryProduct)} key={index}>
                
                {item.categoryProduct}
                <span>({item.count})</span>
            
            </li>
          ))}
        </ul>


          

       
      


{userId ? (<div><h1>{user.displayName}</h1><button onClick={logout}>Logout</button></div>):( <button onClick={signInWithGoogle}>Login with Google</button>)}




        

          </div>
    </div>
  
  

          

{showCreateModal ? ( <ModalCreate/>   ) : null }

{showUpdateModal ? (<ModalUpdate product={productUpdate}/>) : null }

  
   </div>

  )
}

export default Home
