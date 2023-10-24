import React, { createContext,  useEffect,  useState } from 'react'
import { db, storage } from '../config/firebase'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, orderBy, limit, startAfter } from 'firebase/firestore';

import {auth} from '../config/firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export const AppContext=createContext()

function AppProvider({children}) {

    const [showCreateModal, setShowCreateModal]=useState(false)
    const [showUpdateModal, setShowUpdateModal]=useState(false)

    const [showRegisterModal, setShowRegisterModal]=useState(false)
    const [showLoginModal, setShowLoginModal]=useState(false)
    const [showResetPasswordModal, setShowResetPasswordModal]=useState(false)
  
    const [showCommentModal, setShowCommentModal]=useState(false)
    const [showSpecialRequestModal, setShowSpecialRequestModal]=useState(false)
    const [showShoppingCartModal, setShowShoppingCartModal]=useState(false)

    const [showCommentUpdateModal, setShowCommentUpdateModal]=useState(false)

    const [showReplyCommentModal, setShowReplyCommentModal]=useState(false)
  

    const [showCommentUpdateReplyModal, setShowCommentUpdateReplyModal]=useState(false)

    

    
    

    const [typeResult,setTypeResult]=useState([])





    const [searchProducts,setSearchProducts]=useState([])
    const [products, setProducts] = useState([]);
   
    const [searchResult,setSearchResult] =useState(products)

    const [lovedProducts, setLovedProducts] = useState([]);

    const [totalProducts, setTotalProducts] = useState([]);

    const [totalDetailProducts, setTotalDetailProducts] = useState([]);
    const [detailProduct, setDetailProduct] = useState([]);

    const [totalCategoryProduct, setTotalCategoryProduct] = useState([]);
   

    const [user, setUser] = useState(null);

    

    const productsCollectionRef = collection(db, "test1");


    useEffect(() => {
     
      const queryProducts = query(
        productsCollectionRef
      ,
        orderBy("likes","desc"),
     
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
        setLovedProducts(products);
        // setTotalProducts(products)
        // setTotalDetailProducts(products)
        // setSearchProducts(products)
        // setTotalCategoryProduct(products)
      
      });
      return () => unsuscribe();
    }, []);

   
    
    useEffect(() => {
     
      const queryProducts = query(
        productsCollectionRef
        // ,
        // orderBy("createdAt")
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
      // setProducts(searchProducts.filter(f=>f.nameProduct.toLowerCase().includes((event.target.value).toLowerCase())))
      if(event.target.value!=''){
        setSearchResult(searchProducts.filter(f=>f.nameProduct.toLowerCase().includes((event.target.value).toLowerCase())))
      }else{
        setSearchResult([])
      }
      
    
      // setRecords(event.target.value)
     }

     const SearchCategoryProduct =(categoryProduct)=>{
      // console.log('eeeeeee',categoryProduct)
      if(categoryProduct!=="All"){
        setProducts(totalCategoryProduct.filter(f=>f.categoryProduct.toLowerCase().includes(categoryProduct.toLowerCase())))
      }else{
        setProducts(totalCategoryProduct)
      }

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
          // console.log('authUser',authUser)
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
   localStorage.clear()
   setCart([])
 };

  const localCartData = localStorage.getItem("ShoppingCart") ? JSON.parse(localStorage.getItem("ShoppingCart")):[]
  const [cart,setCart]=useState(localCartData)
  
 
  // const [cart,setCart]=useState([])

 const addProductCart=(product)=>{
  if(user){
    // if(cart.indexOf(product)!==-1) return null
    
    // if(cart.indexOf(product)) 
    const indexCart = cart.findIndex(x => x.id === product.id)
    if(indexCart!==-1) return null
    product.amount = 1
    product.id = product.id
    cart.push(product)
    setCart([...cart])
    console.log('reeeeeeeeeeeeeee',cart)
    localStorage.setItem('ShoppingCart', JSON.stringify(cart))
  }else{
    setShowLoginModal(true)
  }
 } 

 const removeProductCart=(product)=>{
  if(user){
   const arr = cart.filter(itemCart=> itemCart.id !==product.id)
   setCart([...arr])
   
  }else{
    setShowLoginModal(true)
  }
  
} 

 const [totalAmount,setTotalAmount]=useState(0)
const calculation=()=>{
  let previousAmount=0;
  cart.map(cartItem=>{
    previousAmount+=cartItem.priceProduct * cartItem.amount
  })
  setTotalAmount(previousAmount)
  // return totalAmount
 }

 const changeIncreaseQuality=(product,currentQuality)=>{
  if(user){
     const index=cart.indexOf(product)
     const arr =[...cart]
     arr[index].amount+=1  
      setCart([...cart])
    }else{
      setShowLoginModal(true)
    }
   
 }

 const changeDecreaseQuality=(product,currentQuality)=>{
  if(user){
  if(currentQuality<=1){
    return
  }else{
   
    const index=cart.indexOf(product)
  const arr =[...cart]
  arr[index].amount+=-1
   setCart([...cart])

  }
  }else{
    setShowLoginModal(true)
  }
 
  
}



 useEffect(()=>{
  calculation()
  // const [cart,setCart]=useState([])
  // setCart(cart)
  localStorage.setItem('ShoppingCart', JSON.stringify(cart))
 },[cart])



   
  return (
    <AppContext.Provider value={{
        showCreateModal, setShowCreateModal,
        showUpdateModal, setShowUpdateModal,
        showRegisterModal, setShowRegisterModal,
        showLoginModal, setShowLoginModal,
        showResetPasswordModal, setShowResetPasswordModal,    
        showCommentModal, setShowCommentModal,
        showSpecialRequestModal, setShowSpecialRequestModal,
        showShoppingCartModal, setShowShoppingCartModal,
        showCommentUpdateModal, setShowCommentUpdateModal,
        showReplyCommentModal, setShowReplyCommentModal,
        showCommentUpdateReplyModal, setShowCommentUpdateReplyModal,
        totalAmount,setTotalAmount,
        products, setProducts,
        lovedProducts, setLovedProducts,
        deleteImages,
        Searcher,
        searchResult,setSearchResult,
        typeResult,setTypeResult,
        categoryCount,
        SearchCategoryProduct,
        signInWithGoogle,
        logout,
        user, setUser,
        DetailProduct,detailProduct, setDetailProduct,
        addProductCart,
        cart,setCart,
        calculation,
        changeIncreaseQuality,changeDecreaseQuality,
        removeProductCart
       
        
        
        }}>
          {children}
    </AppContext.Provider>
  )
}

export default AppProvider
