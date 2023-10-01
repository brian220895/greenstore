import React, { createContext,  useEffect,  useState } from 'react'
import { db, storage } from '../config/firebase'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, orderBy, limit, startAfter } from 'firebase/firestore';

import {auth} from '../config/firebase'
import {signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export const AppContext=createContext()

function AppProvider({children}) {
    const [showCreateModal, setShowCreateModal]=useState(false)
    const [showUpdateModal, setShowUpdateModal]=useState(false)

    const [searchProducts,setSearchProducts]=useState([])
    const [products, setProducts] = useState([]);

    const [totalProducts, setTotalProducts] = useState([]);

    const [totalDetailProducts, setTotalDetailProducts] = useState([]);
    const [detailProduct, setDetailProduct] = useState([]);

    const [totalCategoryProduct, setTotalCategoryProduct] = useState([]);

    const [user, setUser] = useState(null);

    

    const productsCollectionRef = collection(db, "test1");
    // console.log('products',products)
  
    useEffect(() => {
     
      const queryProducts = query(
        productsCollectionRef,
        orderBy("createdAt")
      );
      // const queryUsers = query(
      //   usersRef,
      //   where("room", "==", room),
      //   orderBy("createdAt")
      // );
      const unsuscribe = onSnapshot(queryProducts, (snapshot) => {
        let products = [];
        snapshot.forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id });
        });
        setProducts(products);
        setTotalProducts(products)
        setTotalDetailProducts(products)
        setSearchProducts(products)
        setTotalCategoryProduct(products)
      });
      return () => unsuscribe();
    }, []);
  
    const Searcher =(event)=>{
      setProducts(searchProducts.filter(f=>f.nameProduct.toLowerCase().includes((event.target.value).toLowerCase())))
    
      // setRecords(event.target.value)
     }

     const SearchCategoryProduct =(categoryProduct)=>{
      setProducts(totalCategoryProduct.filter(f=>f.categoryProduct.toLowerCase().includes(categoryProduct.toLowerCase())))
    
      // setRecords(event.target.value)
     }


     const DetailProduct =(productId)=>{
      setDetailProduct(totalDetailProducts.filter(f=>f.id===productId))
    
      // setRecords(event.target.value)
     }




  
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
  
  

        // console.log('totalProducts',totalProducts)
    const counts = totalProducts.reduce((prevValue, currentValue) => {
      let name = currentValue.categoryProduct;
      if (!prevValue.hasOwnProperty(name)) {
        prevValue[name] = 0;
      }
      prevValue[name]++;
      // delete prevValue["undefined"];
      return prevValue;
    }, {});
  
    const categoryCount = Object.keys(counts).map((k) => {
      // console.log('sdasdasddddddddddddddddddddddddddddddddd',counts)
      // console.log('sdasdasddddddddddddddddddddddddddddddddd',k)
      // console.log('sdasdasddddddddddddddddddddddddddddddddd',counts)
      // console.log('sdasdasddddddddddddddddddddddddddddddddd',counts[k])
      return {
        categoryProduct: k,
        count: counts[k],
      };
     
    });


    useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          setUser(authUser);
          console.log('authUser',authUser)
        } else {
          setUser(null);
        }
      });
    }, []);
   
const provider = new GoogleAuthProvider();
 const signInWithGoogle = () => {
   signInWithPopup(auth, provider)
     .then((result) => {
      
       // const name = auth.currentUser;
       // const email = result.user.email;
       // const profilePic = result.user.photoURL;
       // console.log(result)
       // localStorage.setItem("name", name);
       // localStorage.setItem("email", email);
       // localStorage.setItem("profilePic", profilePic);
     })
     .catch((error) => {
       console.log(error);
     });
 };

 const logout = () => {
   signOut(auth)
     
 };



   
  return (
    <AppContext.Provider value={{
        showCreateModal, setShowCreateModal,
        showUpdateModal, setShowUpdateModal,
        products, setProducts,
        deleteImages,
        Searcher,
        categoryCount,
        SearchCategoryProduct,
        signInWithGoogle,
        logout,
        user, setUser,
        DetailProduct,detailProduct, setDetailProduct
        
        }}>
          {children}
    </AppContext.Provider>
  )
}

export default AppProvider
