import React, { useContext } from 'react'
import {  db, storage  } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, updateDoc, serverTimestamp, Timestamp, getDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { AppContext} from '../context/AppProvider';


import { AiOutlineHeart,AiFillHeart} from "react-icons/ai";

function Like({id,likes }) {

  // console.log('iddddđ',id)
  // console.log('likes',likes)

  const { showLoginModal, setShowLoginModal } = useContext(AppContext)

  const { user, setUser} = useContext(AppContext)
 
 
  

  
  const likesRef = doc(db, "test1", id);

  const handleLike = () => {
    if(user){
          if (likes?.includes(user?.uid)) {
            updateDoc(likesRef, {
              likes: arrayRemove(user.uid),
            }).then(() => {
                console.log("unliked");
            }).catch((e) => {
                  console.log(e);
            });
          }
          else{
              updateDoc(likesRef,{
                  likes:arrayUnion(user?.uid)
              }).then(() => {
                  console.log("liked");
              }).catch((e) => {
                    console.log(e);
              });
          }
        }else{
          setShowLoginModal(true)
        }
  };
  


  
  return (
    <div className='flex items-center gap-1'>
     <div className='flex items-center text-lg'>{likes?.length}</div>

     {user ? (<AiFillHeart size={25} onClick={handleLike} className={likes?.includes(user?.uid) ? "text-red-500" : 'text-orange-500'} />):(
    <AiFillHeart size={25} className='text-orange-500' onClick={handleLike}/>
      )}
      
    </div>
  );
}

export default Like