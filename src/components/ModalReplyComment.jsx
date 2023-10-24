import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import { PiTreePalmBold } from 'react-icons/pi';
import { v4 as uuidv4 } from 'uuid';
import {  db, storage  } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, updateDoc, serverTimestamp, Timestamp, getDoc, arrayRemove, arrayUnion } from 'firebase/firestore';


function ModalReplyComment({replyComment}) {

    console.log('sadsadasd',replyComment)
    const { showReplyCommentModal, setShowReplyCommentModal} = useContext(AppContext)
    const { showLoginModal, setShowLoginModal } = useContext(AppContext)
    
    const { user, setUser} = useContext(AppContext)
    const [answerComment,setAnswerComment]= useState('')

    const commentRef = doc(db, "test1",replyComment.productId);
  
    const handleReplyComment = (e) => {
  
        // alert('dsaasd')
        if(user){
        console.log('replyComment',replyComment)
        // if (e.key === "Enter") {
          updateDoc(commentRef, {
answerComments: arrayUnion({
              answerCommentId:uuidv4(),
              commentId:replyComment?.commentId,
              userId:user?.uid,
              productId:replyComment?.productId,
              photoURL:user?.photoURL,
              name: user?.displayName,
              answerComment: answerComment,
              createdAt:  Timestamp.fromDate(new Date()),
          
            }),
          }).then(() => {
    
        
            // scroll.current.scrollIntoView({behavior: 'smooth'})
          });
        }else{
          setShowLoginModal(true)
       
        }


      
     
     
        
      };


   
    const handleShowReplyModal = ()=>{
        setShowReplyCommentModal(true)
      }
  
      const handleHideReplyModal = ()=>{
        setShowReplyCommentModal(false)
      }
      
      const handleHideReplyModalOutside = (e)=>{
        if(e.target.id==='wrapper'){
            setShowReplyCommentModal(false)
        }
      }

  return (
    <div>

{showReplyCommentModal ? (
               <div onClick={handleHideReplyModalOutside} className='z-10 fixed inset-0 flex justify-center items-center bg-orange-200/20  h-screen w-screen '  id="wrapper">
               <div className='relative bg-blue-400 p-5 w-[550px] mx-2 flex flex-col gap-2 rounded-lg'>
                  <PiTreePalmBold onClick={()=>handleHideReplyModal()} className='absolute right-[15px] top-[15px] text-xl cursor-pointer hover:text-gray-50'/>
                  <h1 className='flex justify-center items-center text-2xl  font-semibold'>Reply comment</h1>

                  

                  <div className='flex items-center'>
                       <textarea type='text' rows="5" className='flex-1 focus:outline-none' name='answerComment'  onChange={(e) => { setAnswerComment(e.target.value);}} placeholder='Write your comment' ></textarea>
                   </div>
                   
                   
             


                   <div className='flex items-center gap-2 flex-row-reverse '>
                       <div onClick={()=>[handleReplyComment(),handleHideReplyModal()]} className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-900' >Reply</div>
                       <div onClick={()=>handleHideReplyModal()} className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-stone-400'>Cancel</div>
                   </div>
                


                
                   

               </div>
           </div>
            ) : null }
      
    </div>
  )
}

export default ModalReplyComment
