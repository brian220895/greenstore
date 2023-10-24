import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import { GiOpenedFoodCan} from "react-icons/gi";
import {  db, storage  } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, updateDoc, serverTimestamp, Timestamp, getDoc, arrayRemove, arrayUnion } from 'firebase/firestore';



function ModalUpdateReplyComment({allReplyCommentData,editReplyCommentData}) {
    console.log('allReplyCommentData=1',allReplyCommentData)
    console.log('editReplyCommentData=1',editReplyCommentData)
    const { showCommentUpdateReplyModal, setShowCommentUpdateReplyModal} = useContext(AppContext)
    const [updateReplyComment, setUpdateReplyComment] = useState(
        {    
            answerComment:editReplyCommentData.answerComment,
            answerCommentId:editReplyCommentData.answerCommentId,
            commentId:editReplyCommentData.commentId,
            createdAt:editReplyCommentData.createdAt,
            name:editReplyCommentData.name,
            photoURL:editReplyCommentData.photoURL,
            productId:editReplyCommentData.productId,
            userId:editReplyCommentData.userId

        }
    )

    const indexReplyComment = allReplyCommentData.findIndex(x => x.answerCommentId === updateReplyComment.answerCommentId)

//  console.log('index',indexComment)
//  console.log('allCommentData[index]',allCommentData[indexComment])

allReplyCommentData[indexReplyComment] = updateReplyComment;


    const commentRef = doc(db, "test1", updateReplyComment?.productId);
    const handleUpdateReplyComment = (e) => {

        updateDoc(commentRef, {
           
            answerComments:allReplyCommentData
           

          }).then(() => {
          
            // updateDoc(commentRef, {
            //     comments: arrayRemove(commentData),
                
            //   })
            // setUpdateComment("");
            // scroll.current.scrollIntoView({behavior: 'smooth'})
          });
        
      };

   

    const handleShowUpdateReplyCommentModal = ()=>{
        setShowCommentUpdateReplyModal(true)
    }
    
    const handleHideUpdateReplyCommentModal = ()=>{
        setShowCommentUpdateReplyModal(false)
    }
    
    const handleHideUpdateReplyCommentModalOutside = (e)=>{
    if(e.target.id==='wrapper'){
        setShowCommentUpdateReplyModal(false)
    }
    }

  return (
    <div>
  

  <div onClick={handleHideUpdateReplyCommentModalOutside} className='z-10 fixed inset-0 flex justify-center items-center bg-orange-200/20  h-screen w-screen ' id="wrapper">
               <div className='relative bg-blue-400 m-2 p-5 w-[380px] md:w-[450px] lg:w-[550px] flex flex-col gap-2'>
                  <GiOpenedFoodCan onClick={()=>handleHideUpdateReplyCommentModal()} className='absolute right-[15px] top-[15px] text-xl cursor-pointer hover:text-gray-50'/>


                  <h1 className='flex justify-center items-center text-2xl  font-semibold'>Update Reply Comments:</h1>
                    
                 
                
                 
                  <div className='flex items-center'>
                       <textarea type='text' rows="5" className='flex-1 focus:outline-none' name='comment'  value={updateReplyComment?.answerComment} onChange={(e)=>setUpdateReplyComment({...updateReplyComment,answerComment:e.target.value})}> </textarea>
                   </div>
                   
                   
             


                   <div className='flex items-center gap-2 flex-row-reverse '>
                       <div onClick={()=>[handleUpdateReplyComment(),handleHideUpdateReplyCommentModal()]} className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-900' >Update</div>
                       <div  onClick={()=>handleHideUpdateReplyCommentModal()}  className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-stone-400'>Cancel</div>
                   </div>
                
                   

               </div>
           </div>



    </div>
  )
}

export default ModalUpdateReplyComment
