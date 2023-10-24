import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import { PiTreePalmBold } from 'react-icons/pi';
import { v4 as uuidv4 } from 'uuid';
import {  db, storage  } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, updateDoc, serverTimestamp, Timestamp, getDoc, arrayRemove, arrayUnion } from 'firebase/firestore';

import { GiOpenedFoodCan} from "react-icons/gi";
import { TiDeleteOutline} from "react-icons/ti";
import { BsThreeDotsVertical} from "react-icons/bs";
import ModalUpdateComment from './ModalUpdateComment';
import ModalReplyComment from './ModalReplyComment';
import ModalUpdateReplyComment from './ModalUpdateReplyComment';


function ModalComment({product}) {
 

  // console.log('xxxxxxxxxx',product)
  const scroll = useRef();
  const { user, setUser} = useContext(AppContext)
  const {showCommentModal, setShowCommentModal} = useContext(AppContext)
  const { showLoginModal, setShowLoginModal } = useContext(AppContext)
  const {  showCommentUpdateModal, setShowCommentUpdateModal } = useContext(AppContext)
  const { showReplyCommentModal, setShowReplyCommentModal} = useContext(AppContext)
  const { showCommentUpdateReplyModal, setShowCommentUpdateReplyModal} = useContext(AppContext)
  

  // console.log('tessttt88888', showReplyCommentModal)

  const [allComments, setAllComments] = useState([]);
  const [answerComments, setAllAnswerComments] = useState([]);
  const [comment, setComment] = useState('')

 console.log('allComments.............',allComments)

  const commentRef = doc(db, "test1", product?.id);
  useEffect(() => {
   
    const docRef = doc(db, "test1", product?.id);
    onSnapshot(docRef, (snapshot) => {
      setAllComments(snapshot.data().comments);
      setAllAnswerComments(snapshot.data().answerComments);
    });
  }, []);

  

  const handleCreateComment = (e) => {
    if(user){
    // alert('dsaasd')
    // console.log('comments',comments)
    // if (e.key === "Enter") {
      updateDoc(commentRef, {
comments: arrayUnion({
          commentId:uuidv4(),
          userId:user?.uid,
          productId:product?.id,
          photoURL:user?.photoURL,
          name: user?.displayName,
          comment: comment,
          createdAt:  Timestamp.fromDate(new Date()),
        // commentId: uuidv4(),
        }),
      }).then(() => {

        setComment("");
        scroll.current.scrollIntoView({behavior: 'smooth'})
      });
    // }
  }else{
    setShowLoginModal(true)
    setShowCommentModal(false)
  }
 
    
  };

  // delete comment function
  const handleDeleteComment = (comment) => {

    if(user){

      if (window.confirm("Are you sure wanted to delete this product ?")) {
          console.log(comment);
          updateDoc(commentRef, {
              comments:arrayRemove(comment),
          })
          .then((e) => {
              
              console.log(e);
          })
          .catch((error) => {
              console.log(error);
          })
        }
    
    }else{
      setShowLoginModal(true)
    }
 

  };



  const handleDeleteAnswerComment = (answerComment) => {

    // console.log('answerComment',answerComment);

      if (window.confirm("Are you sure wanted to delete this product ?")) {
          console.log(answerComment);
          updateDoc(commentRef, {
              answerComments:arrayRemove(answerComment),
          })
          .then((e) => {
              
              console.log(e);
          })
          .catch((error) => {
              console.log(error);
          })
        }
    
   
 

  };
   

  




  const handleShowCommentModal = ()=>{
    setShowCommentModal(true)
}

const handleHideCommentModal = ()=>{
  setShowCommentModal(false)
}

const handleHideCommentModalOutside = (e)=>{
if(e.target.id==='wrapper'){
  setShowCommentModal(false)
}
}

const [updateComment, setUpdateComment] = useState('');

const [allUpdateComment, setAllUpdateComment] = useState('');

const [updateReplyComment, setUpdateReplyComment] = useState('');

const [allUpdateReplyComment, setAllUpdateReplyComment] = useState('');

const [replyComment, setReplyComment] = useState('');

// console.log('oooooooooooooo',allUpdateComment)
// console.log('yyyyyyyyyyyyyyyyy',replyComment)
  return (
    <div>
    
    
    <div onClick={handleHideCommentModalOutside} className='z-10 fixed inset-0 flex justify-center items-center bg-orange-200/20  h-screen w-screen ' id="wrapper">
               <div className='relative bg-blue-400 m-2 p-5 w-[380px] md:w-[550px] lg:w-[750px] flex flex-col gap-2'>
                  <GiOpenedFoodCan onClick={()=>handleHideCommentModal()} className='absolute right-[15px] top-[15px] text-xl cursor-pointer hover:text-gray-50'/>


                  <h1 className=' inline-block break-words justify-center items-center text-2xl  font-semibold'>Comments:({allComments.length})</h1>
                    
                  {allComments.length!=0 ? (
                     <div className='flex  max-h-[400px] flex-col p-1 bg-orange-200 overflow-y-scroll no-scrollbar'>
                     {allComments?.map((commentData)=>{
                      return (
                        <div className='flex relative flex-col  mx-1 rounded-lg'>
                          <div className='flex  flex-col bg-zinc-300 p-4 gap-1'>
                          <div className=' flex items-center'> 
                          <img src={commentData.photoURL} className='h-[30px] w-[30px] rounded-full'/><div className='bg-sky-600 m-1 px-2 rounded-lg'>{commentData.name}:</div>
                          </div>

                          <div className='flex-1 break-words max-w-[300px] md:max-w-[550px] lg:max-w-[650px]'>{commentData.comment}</div>

                          <div className='underline text-cyan-600' onClick={()=>[setShowReplyCommentModal(true),setReplyComment(commentData)]}>Reply</div>
                          </div>
                         {answerComments?.length!=0 ? (
                               <div className=' ml-9 flex flex-col mt-1'>

                                {answerComments.map((answerComment)=>{
                                  return (
                                        <>
                                    {answerComment.commentId==commentData.commentId ? (
                                      <div className='relative bg-zinc-300 p-4 gap-1 mb-1 '>
                                      <div className=' flex  items-center '> 
                                      <img src={answerComment.photoURL} className='h-[30px] w-[30px] rounded-full'/><div className='bg-sky-600 m-1 px-2 rounded-lg'>{answerComment.name}:</div>
                                      </div>
                                      <div className='flex-1 break-words max-w-[300px] md:max-w-[550px] lg:max-w-[650px]'>{answerComment.answerComment}</div>
                                      
                                      <div className='underline text-cyan-600' onClick={()=>[setShowReplyCommentModal(true),setReplyComment(commentData)]}>Reply</div>
                                   
                                      {user && user.uid === answerComment.userId   && (
                                      <div className='flex flex-col'>
                                        <TiDeleteOutline className='absolute right-1 top-1 text-2xl' onClick={()=>handleDeleteAnswerComment(answerComment)}/>

                                        <BsThreeDotsVertical className='absolute right-1 top-8 text-2xl' onClick={()=>[setUpdateReplyComment(answerComment),setAllUpdateReplyComment(answerComments),setShowCommentUpdateReplyModal(true)]} />
                                      </div>
                                       ) }
                                      
                                      </div>
                                      

                                    ): null }
                                    
      
                                    </>
                                  

                                  )
                                })}


                     
                             

                        

                        </div>




                         ):null}
                          
                          {user && user.uid === commentData.userId   && (
                            <div className='flex flex-col'>
                          <TiDeleteOutline className='absolute right-1 top-1 text-2xl' onClick={()=>handleDeleteComment(commentData)}/>
                          <BsThreeDotsVertical className='absolute right-1 top-8 text-2xl' onClick={()=>[setUpdateComment(commentData),setAllUpdateComment(allComments),setShowCommentUpdateModal(true)]}/>
                          </div>
                          ) }
                          
                          
                           
                        </div>
                      )
                     })}

                     <span ref={scroll}></span>
  
                     </div>

                  ):(
                      <div className='bg-slate-300 p-5'>No comments</div>

                  )}

                
                 
                  <div className='flex items-center'>
                       <textarea type='text' rows="5" className='flex-1 focus:outline-none' name='comment'  value={comment} onChange={(e) => { setComment(e.target.value);}} placeholder='Write your comment'> </textarea>
                   </div>
                   
                   
             


                   <div className='flex items-center gap-2 flex-row-reverse '>
                       <div onClick={()=>[handleCreateComment()]} className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-900' >Comment</div>
                       <div  onClick={()=>handleHideCommentModal()}  className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-stone-400'>Cancel</div>
                   </div>
                
                   

               </div>
           </div>


           {showCommentUpdateModal ? (<ModalUpdateComment allCommentData={allUpdateComment} editCommentData={updateComment}  />) : null }
           
           {showCommentUpdateReplyModal ? (<ModalUpdateReplyComment allReplyCommentData={allUpdateReplyComment} editReplyCommentData={updateReplyComment}  />) : null }
           
           {showReplyCommentModal ? (<ModalReplyComment replyComment={replyComment} />) : null }
           {/* {console.log('updateComment',updateComment)} 
           {console.log('allUpdateComment',allUpdateComment)}  */}
    </div>
  )
} 

export default ModalComment
