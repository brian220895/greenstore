import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import { GiOpenedFoodCan} from "react-icons/gi";
import {  db, storage  } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, updateDoc, serverTimestamp, Timestamp, getDoc, arrayRemove, arrayUnion } from 'firebase/firestore';


function ModalUpdateComment({allCommentData,editCommentData}) {
    console.log('allCommentData=1',allCommentData)
    console.log('editCommentData=1',editCommentData)
    // console.log('allUpdateComment',allUpdateComment)

    const {  showCommentUpdateModal, setShowCommentUpdateModal } = useContext(AppContext)
    const [updateComment, setUpdateComment] = useState(
        {    
            commentId:editCommentData.commentId,
            comment:editCommentData.comment,
            createdAt:editCommentData.createdAt,
            name:editCommentData.name,
            photoURL:editCommentData.photoURL,
            userId:editCommentData.userId,
            productId:editCommentData.productId
        }
    )



//    console.log('updateComment=2',updateComment)
//    console.log('allCommentData=2',allCommentData)
//    console.log('editCommentData=2',editCommentData)
   
//   const changeComment=1;
//    const indexComment=allCommentData.findIndex((x)=>{
//         x.id===editCommentData.id 
//     } 
//   )

const indexComment = allCommentData.findIndex(x => x.commentId === updateComment.commentId)

 console.log('index',indexComment)
 console.log('allCommentData[index]',allCommentData[indexComment])

    allCommentData[indexComment] = updateComment;

    console.log('allCommentDataxxxxxxxxx',allCommentData)

  
  

//    const completedUpdate=  changeComment.push(updateComment)
  

//    console.log('updateComment=3',updateComment)
//    console.log('allCommentData=3',allCommentData)
//    console.log('editCommentData=3',editCommentData)
//    console.log('changeComment=3',changeComment)

   



const commentRef = doc(db, "test1", updateComment?.productId);
    const handleUpdateComment = (e) => {
     
        updateDoc(commentRef, {
           
            comments:allCommentData
           

          }).then(() => {
          
            // updateDoc(commentRef, {
            //     comments: arrayRemove(commentData),
                
            //   })
            // setUpdateComment("");
            // scroll.current.scrollIntoView({behavior: 'smooth'})
          });
        
      };






    const handleShowUpdateCommentModal = ()=>{
        setShowCommentUpdateModal(true)
    }
    
    const handleHideUpdateCommentModal = ()=>{
        setShowCommentUpdateModal(false)
    }
    
    const handleHideUpdateCommentModalOutside = (e)=>{
    if(e.target.id==='wrapper'){
        setShowCommentUpdateModal(false)
    }
    }

  return (
    <div>
    
    
    <div onClick={handleHideUpdateCommentModalOutside} className='z-10 fixed inset-0 flex justify-center items-center bg-orange-200/20  h-screen w-screen ' id="wrapper">
               <div className='relative bg-blue-400 m-2 p-5 w-[380px] md:w-[450px] lg:w-[550px] flex flex-col gap-2'>
                  <GiOpenedFoodCan onClick={()=>handleHideUpdateCommentModal()} className='absolute right-[15px] top-[15px] text-xl cursor-pointer hover:text-gray-50'/>


                  <h1 className='flex justify-center items-center text-2xl  font-semibold'>Update Comments:</h1>
                    
                 
                
                 
                  <div className='flex items-center'>
                       <textarea type='text' rows="5" className='flex-1 focus:outline-none' name='comment'  value={updateComment?.comment} onChange={(e)=>setUpdateComment({...updateComment,comment:e.target.value})}> </textarea>
                   </div>
                   
                   
             


                   <div className='flex items-center gap-2 flex-row-reverse '>
                       <div onClick={()=>[handleUpdateComment(),handleHideUpdateCommentModal()]} className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-900' >Update</div>
                       <div  onClick={()=>handleHideUpdateCommentModal()}  className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-stone-400'>Cancel</div>
                   </div>
                
                   

               </div>
           </div>



    </div>
  )
}

export default ModalUpdateComment
