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





function Home() {
  const { showCreateModal, setShowCreateModal } = useContext(AppContext)
  const {showUpdateModal, setShowUpdateModal} = useContext(AppContext)


  const [lastVisible, setLastVisible] = useState(null);
  const [noOfPages, setNoOfPages] = useState(null);
  const [count, setCount] = useState(null);
  const [hide, setHide] = useState(false);
  const [products, setProducts] = useState([]);
  const imagesCollectionRef = collection(db, "test1");
  // console.log('products',products)

  const PAGE_SIZE = 2;
  useEffect(() => {
   
    const queryImages = query(
      imagesCollectionRef,
      orderBy("nameProduct"),
      limit(PAGE_SIZE)
    );
    // const queryUsers = query(
    //   usersRef,
    //   where("room", "==", room),
    //   orderBy("createdAt")
    // );
    const unsuscribe = onSnapshot(queryImages, (snapshot) => {
      let products = [];
      snapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      setProducts(products);
      setCount(snapshot.size)
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    });
    return () => unsuscribe();
  }, []);


  const deleteImages = async (id, imageUrls) => {
    if (window.confirm("Are you sure wanted to delete this product ?")) {
    try {
      // console.log(ids)
      // console.log(imageUrls)
      await deleteDoc(doc(db, "test1", id));

      for (let i = 0; i < imageUrls.length; i++) {
        const storageRef = ref(storage, imageUrls[i]);
        await deleteObject(storageRef);

      }


    } catch (error) {
      // toast("Error deleting article", { type: "error" });
      console.log(error);
    }
   }
  }


  const updateState = (docSnapshot) => {
    const isCollectionEmpty = docSnapshot.size === 0;
    if (!isCollectionEmpty) {
      const blogsData = docSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts((blogs) => [...blogs, ...blogsData]);
      setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    } else {
      // toast("No more blog to display");
      // alert("No more blog to display")
      // setHide(true);
      setHide(true)
    }
  };

  const fetchMore = async () => {
  
    const blogRef = collection(db, "test1");
    const nextFour = query(
      blogRef,
      orderBy("nameProduct"),
      limit(PAGE_SIZE),
      startAfter(lastVisible)
    );

 
    

    const docSnapshot = await getDocs(nextFour);
    updateState(docSnapshot);
  
  };

    
  
  


const [productUpdate, setProductUpdate] = useState('');


  return (
   <div>
  <div className='bg-lime-700 p-' onClick={()=>setShowCreateModal(true)}>Thêm</div>

    {products.map((product) => {
          return (
            <div key={product.id}>
           

              
              <h1>Tên sản phẩm: {product.nameProduct}</h1>
              <h1>Mô tả sản phẩm: {product.descriptionProduct}</h1>
              {product.images.map((image) => {
                return <img key={image} src={image} alt={image} />
              })}

                    
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
             
            



            
               
 
            </div>
          );
        })}

           {!hide && (
              <button className="btn btn-primary" onClick={fetchMore}>
                Load More
              </button>
            )}

{showCreateModal ? ( <ModalCreate/>   ) : null }

{showUpdateModal ? (<ModalUpdate product={productUpdate}/>) : null }

  
   </div>

  )
}

export default Home
