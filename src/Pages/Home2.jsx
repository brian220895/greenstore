import React, { useEffect, useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  endAt,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
// import Pagination from "../components/Pagination";
import { db, storage } from '../config/firebase'
import Pagination from '../components/Pagination';
import { deleteObject, ref } from 'firebase/storage';


function Home2() {
  // const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [noOfPages, setNoOfPages] = useState(null);
  const [count, setCount] = useState(null);


  useEffect(() => {
    getBlogsData();
    getTotalBlogs();
  
  }, []);

  // if (loading) {
  //   return <Spinner />;
  // }
   

  const PAGE_SIZE = 1;

  const blogRef = collection(db, "test1")
  const getBlogsData = async () => {
    // setLoading(true);
    const q = query(
      blogRef,
      orderBy("nameProduct"),
        limit(PAGE_SIZE)
    );
    onSnapshot(q, (snapshot) => {
        const tempPosts = [];
        snapshot.forEach((doc) => {
            tempPosts.push({
              ...doc.data(), id: doc.id 
            });
        });

        setProducts(tempPosts);
        setCount(snapshot.size)
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
          // setLoading(false);

          console.log('snapshot.size:',snapshot.size)


      
    });



  };


  // const getBlogsData = async () => {
  //   setLoading(true);
  //   const blogRef = collection(db, "blogs");
  //   const first = query(blogRef, orderBy("title"), limit(PAGE_SIZE));
  //   const docSnapshot = await getDocs(first);
  //   setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  //   setCount(docSnapshot.size);
  //   setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
  //   setLoading(false);
  // };



  const getTotalBlogs = async () => {
    const blogRef = collection(db, "test1");
    const docSnapshot = await getDocs(blogRef);
    const totalBlogs = docSnapshot.size;
    const totalPage = Math.ceil(totalBlogs / PAGE_SIZE);
    setNoOfPages(totalPage);

  };

  const fetchMore = async () => {
    // setLoading(true);
    const blogRef = collection(db, "test1");
    const nextBlogsQuery = query(
      blogRef,
      orderBy("nameProduct"),
      startAfter(lastVisible),
      limit(PAGE_SIZE)
    );
    const nextBlogsSnaphot = await getDocs(nextBlogsQuery);
    setProducts(
      nextBlogsSnaphot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setCount(nextBlogsSnaphot.size);
    setLastVisible(nextBlogsSnaphot.docs[nextBlogsSnaphot.docs.length - 1]);
    // setLoading(false);
  };


  
  const fetchPrev = async () => {
    // setLoading(true);
    const blogRef = collection(db, "test1");
    const end =
      noOfPages !== currentPage ? endAt(lastVisible) : endBefore(lastVisible);
    const limitData =
      noOfPages !== currentPage
        ? limit(PAGE_SIZE)
        : count <= PAGE_SIZE && noOfPages % 2 === 0
        ? limit(PAGE_SIZE)
        : limitToLast(PAGE_SIZE);
    const prevBlogsQuery = query(blogRef, orderBy("nameProduct"), end, limitData);
    const prevBlogsSnaphot = await getDocs(prevBlogsQuery);
    setProducts(
      prevBlogsSnaphot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setCount(prevBlogsSnaphot.size);
    setLastVisible(prevBlogsSnaphot.docs[prevBlogsSnaphot.docs.length - 1]);
    // setLoading(false);
  };

  const handlePageChange = (value) => {
    if (value === "Next") {
      setCurrentPage((page) => page + 1);
      fetchMore();
    } else if (value === "Prev") {
      setCurrentPage((page) => page - 1);
      fetchPrev();
    }
  };


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



  return (
    <div>
    
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
              
              

              {/* <button
                onClick={() => [setProductUpdate(product),setShowUpdateModal(true) ]
                  
                }
              >

                Update User
              </button>  */}
             
            



            
               
 
            </div>
          );
        })}

        <Pagination
          currentPage={currentPage}
          noOfPages={noOfPages}
          handlePageChange={handlePageChange}
        />


    </div>
  )
}

export default Home2
