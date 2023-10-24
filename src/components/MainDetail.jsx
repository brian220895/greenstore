import React, { useContext, useEffect, useRef, useState } from 'react'
import { db, storage } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, updateDoc, serverTimestamp, Timestamp, getDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';
import { v4 as uuidv4 } from 'uuid';
import { TiDeleteOutline } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalUpdateComment from './ModalUpdateComment';
import ModalUpdateReplyComment from './ModalUpdateReplyComment';
import ModalReplyComment from './ModalReplyComment';
import Like from './Like';
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ModalUpdate from './ModalUpdate';

function MainDetail() {
  const { id } = useParams();
  const [productData, setProductData] = useState([])
  const [comment, setComment] = useState('')
  productData.id = id
  

  // Add id to product



  const scroll = useRef();
  const { user, setUser } = useContext(AppContext)
  const { showCommentModal, setShowCommentModal } = useContext(AppContext)
  const { showLoginModal, setShowLoginModal } = useContext(AppContext)
  const { showUpdateModal, setShowUpdateModal} = useContext(AppContext)
  const {deleteImages} = useContext(AppContext)
  const { showCommentUpdateModal, setShowCommentUpdateModal } = useContext(AppContext)
  const { showReplyCommentModal, setShowReplyCommentModal } = useContext(AppContext)
  const { showCommentUpdateReplyModal, setShowCommentUpdateReplyModal } = useContext(AppContext)

  const { searchResult, setSearchResult } = useContext(AppContext)
  const { typeResult,setTypeResult } = useContext(AppContext)
 


  const { addProductCart } = useContext(AppContext)

  const { cart, setCart } = useContext(AppContext)
  // console.log('qqqqqqqqqqqqqqqqqq', cart)

  // const commentRef = doc(db, "test1", id);

  const getBlogDetail = () => {

    const docRef = doc(db, "test1", id);
    onSnapshot(docRef, (snapshot) => {
      setProductData(snapshot.data());
      // setAllAnswerComments(snapshot.data().answerComments);
    });
  }



  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);




  // console.log('ppppppppppppppppp',productData)
  const commentRef = doc(db, "test1", id);
  const handleCreateComment = (e) => {
    if (user) {
      // alert('dsaasd')
      // console.log('comments',comments)
      // if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          commentId: uuidv4(),
          userId: user?.uid,
          productId: id,
          photoURL: user?.photoURL,
          name: user?.displayName,
          comment: comment,
          createdAt: Timestamp.fromDate(new Date()),
          // commentId: uuidv4(),
        }),
      }).then(() => {

        setComment("");
        scroll.current.scrollIntoView({ behavior: 'smooth' })
      });
      // }
    } else {
      setShowLoginModal(true)
      // setShowCommentModal(false)
    }


  };




  const handleDeleteComment = (comment) => {

    if (user) {

      if (window.confirm("Are you sure wanted to delete this product ?")) {
        console.log(comment);
        updateDoc(commentRef, {
          comments: arrayRemove(comment),
        })
          .then((e) => {

            console.log(e);
          })
          .catch((error) => {
            console.log(error);
          })
      }

    } else {
      setShowLoginModal(true)
    }


  };


  const handleDeleteAnswerComment = (answerComment) => {

    // console.log('answerComment',answerComment);

    if (window.confirm("Are you sure wanted to delete this comment ?")) {
      console.log(answerComment);
      updateDoc(commentRef, {
        answerComments: arrayRemove(answerComment),
      })
        .then((e) => {

          console.log(e);
        })
        .catch((error) => {
          console.log(error);
        })
    }




  };



  const [updateComment, setUpdateComment] = useState('');

  const [allUpdateComment, setAllUpdateComment] = useState('');

  const [updateReplyComment, setUpdateReplyComment] = useState('');

  const [allUpdateReplyComment, setAllUpdateReplyComment] = useState('');

  const [replyComment, setReplyComment] = useState('');

  const slideLeft2 = () => {
    var slider2 = document.getElementById('slider2')
    var element = document.getElementById("content");
    let y = element.scrollHeight;
    let x = element.scrollWidth;
    slider2.scrollLeft = slider2.scrollLeft - x
    console.log('slider2.scrollLeft', slider2.scrollLeft)
    // console.log('YLEFT', y)
    // console.log('XLEFT', x)
  }
  const sliderRight2 = () => {
    var slider2 = document.getElementById('slider2')
    var element = document.getElementById("content");
    let y = element.scrollHeight;
    let x = element.scrollWidth;
    slider2.scrollLeft = slider2.scrollLeft + x
    console.log('slider2.scrollRight', slider2.scrollLeft)
    console.log('YRIGHT', y)
    console.log('XRIGHT', x)
  }




  const [productUpdate, setProductUpdate] = useState('');

  return (
    <div className=' max-w-[1680px] mx-auto px-4  flex items-center cursor-pointer bg-orange-300' onClick={()=>[setSearchResult([]),setTypeResult([])]} >
      <div className='flex flex-col w-full '>
        <h1 className='text-center text-red-600 font-extrabold pb-2 text-lg md:text-2xl lg:text-3xl'>{productData.nameProduct}</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 pb-4 gap-2 '>


          <div className='flex flex-col '>
            <div className='bg-gray-200 grid md:grid-cols-1 lg:grid-cols-1 '>


              <div className='relative flex items-center '>
              {productData?.images?.length > 1 && ( <AiOutlineLeft className=' z-[1] left-4 absolute text-white' onClick={slideLeft2} size={30} />)}
                <div id='slider2' className='w-full h-full overflow-x-scroll scroll scroll-smooth whitespace-nowrap no-scrollbar  '>



                  {productData?.images?.length !== 0 ? (

                    <>
                      {productData?.images?.map((image, index

                      ) => {

                        return (



                          <div key={index} className='select-none h-full w-full  inline-grid cursor-pointer relative shadow-lg shadow-black  '>

                            <img id="content" className='w-full h-[570px] object-cover  '
                              src={image} />

                          </div>

                        )

                      })}




                    </>
                  ) : null}










                </div>
                {productData?.images?.length > 1 && (<AiOutlineRight className=' z-[1] right-4 absolute text-white' onClick={sliderRight2} size={30} />)}


            


               {showUpdateModal ? (<ModalUpdate product={productUpdate} />) : null }


              </div>











            </div>


            <div className='flex flex-col gap-3 justify-center bg-gray-200 px-4 pb-4 '>

              {/* const indexCart = cart.findIndex(x => x.id === product.id) */}


              {cart.findIndex(x => x.id === id) !== -1 ? (
                <div className='flex  items-center  justify-evenly gap-2 py-4'>
                  <div className='p-3 w-fit rounded-md bg-orange-600 border-spacing-1 border-neutral-950 font-extrabold hover:text-amber-500 hover:bg-orange-600'>Added</div>
                  <Like id={id} likes={productData?.likes} />
                </div>
              ) : (
                <div className='flex  items-center  justify-evenly gap-2 py-4'>
                  <div onClick={() => addProductCart(productData)} className='p-3 w-fit rounded-md bg-red-500 border-spacing-1 border-neutral-950 font-extrabold hover:text-white hover:bg-slate-700'>Book now</div>

                  <Like id={id} likes={productData?.likes} />
                </div>
              )}



              <div><span className='text-sky-700 font-bold'>Price:</span> <span className='text-red-600'>{productData?.priceProduct}</span> $</div>
              <div className='flex items-center gap-1'><span className='text-sky-700 font-bold'>Category:</span> <span className='px-2 h-fit bg-blue-400 flex justify-center items-center rounded-lg '>{productData?.categoryProduct}</span></div>
              <div className='text-justify'><span className='text-sky-700 font-bold'>Detail:</span>{productData.descriptionProduct}</div>
            </div>

            

          </div>



          <div >
            {/* <h1 className='text-center'>Comments({productData?.comments?.length})</h1> */}
            <div className='bg-orange-500 py-2'>

              <div className=' justify-center w-full flex flex-col gap-2'>



                <h1 className=' inline-block break-words justify-center items-center text-center text-xl  font-semibold'>Comments:({productData?.comments?.length})</h1>

                {productData?.comments?.length != 0 ? (
                  <div className='flex  max-h-[400px] flex-col p-1 bg-orange-400 overflow-y-scroll no-scrollbar'>
                    {productData?.comments?.map((commentData) => {
                      console.log('yyyyyyyyyyyyyyyyyyyyyyyyy', commentData)
                      return (
                        <div className='flex relative flex-col  mx-1 rounded-lg'>
                          <div className='flex  flex-col bg-zinc-300 p-4 '>
                            <div className=' flex items-center'>
                              <img src={commentData.photoURL} className='h-[30px] w-[30px] rounded-full' /><div className='bg-sky-600 m-1 px-2 rounded-lg'>{commentData.name}:</div>
                            </div>

                            <div className='flex-1 break-words max-w-[300px] md:max-w-[550px] lg:max-w-[650px]'>{commentData.comment}</div>
                            {/* {console.log('XXXXXXXXXXX666666666666',commentData)} */}
                            <div className='underline text-cyan-600' onClick={() => [setShowReplyCommentModal(true), setReplyComment(commentData)]}>Reply</div>
                          </div>
                          {/* {console.log('oootttttttttttttttt',answerComments)} */}

                          {productData?.answerComments?.length != 0 ? (
                            <div className=' ml-9 flex flex-col  mt-1'>

                              {productData?.answerComments.map((answerComment) => {
                                return (
                                  <>

                                    {answerComment?.commentId == commentData.commentId ? (
                                      <div className='relative bg-zinc-300 p-4 mb-1 '>
                                        <div className=' flex  items-center '>
                                          <img src={answerComment.photoURL} className='h-[30px] w-[30px] rounded-full' /><div className='bg-sky-600 m-1 px-2 rounded-lg'>{answerComment.name}:</div>
                                        </div>

                                        <div className='flex-1 break-words max-w-[300px] md:max-w-[550px] lg:max-w-[650px]'>{answerComment.answerComment}</div>

                                        <div className='underline text-cyan-600' onClick={() => [setShowReplyCommentModal(true), setReplyComment(commentData)]}>Reply</div>

                                        {user && user.uid === answerComment.userId && (
                                          <div className='flex flex-col'>
                                            <TiDeleteOutline className='absolute right-1 top-1 text-2xl' onClick={() => handleDeleteAnswerComment(answerComment)} />

                                            <BsThreeDotsVertical className='absolute right-1 top-8 text-2xl' onClick={() => [setUpdateReplyComment(answerComment), setAllUpdateReplyComment(productData?.answerComments), setShowCommentUpdateReplyModal(true)]} />
                                          </div>
                                        )}

                                      </div>


                                    ) : null}


                                  </>


                                )
                              })}







                            </div>




                          ) : null}

                          {user && user.uid === commentData.userId && (
                            <div className='flex flex-col'>
                              <TiDeleteOutline className='absolute right-1 top-1 text-2xl' onClick={() => handleDeleteComment(commentData)} />

                              <BsThreeDotsVertical className='absolute right-1 top-8 text-2xl' onClick={() => [setUpdateComment(commentData), setAllUpdateComment(productData?.comments), setShowCommentUpdateModal(true)]} />
                            </div>
                          )}



                        </div>
                      )
                    })}

                    <span ref={scroll}></span>

                  </div>

                ) : (
                  <div className='bg-slate-300 p-5 mx-2'>No comments</div>

                )}



                <div className='flex items-center px-2 '>
                  <textarea type='text' rows="5" className='flex-1 focus:outline-none px-2' name='comment' value={comment} onChange={(e) => { setComment(e.target.value); }} placeholder='Write your comment'> </textarea>
                </div>





                <div className='flex items-center gap-2 flex-row-reverse px-2 '>
                  {/* <div onClick={()=>[handleCreateComment()]} className='py-3 px-5 bg-orange-500 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-900' >Comment</div>
                       <div  onClick={()=>handleHideCommentModal()}  className='py-3 px-5 bg-slate-500  text-neutral-50 rounded-lg cursor-pointer hover:bg-stone-400'>Cancel</div> */}
                  <div onClick={() => [handleCreateComment()]} className='py-3 px-5 bg-sky-600 text-neutral-50   rounded-lg cursor-pointer hover:bg-lime-900' >Comment</div>

                </div>



              </div>




              {/* 111 */}









            </div>

          </div>




        </div>
      </div>

      {showCommentUpdateModal ? (<ModalUpdateComment allCommentData={allUpdateComment} editCommentData={updateComment} />) : null}

      {showCommentUpdateReplyModal ? (<ModalUpdateReplyComment allReplyCommentData={allUpdateReplyComment} editReplyCommentData={updateReplyComment} />) : null}

      {showReplyCommentModal ? (<ModalReplyComment replyComment={replyComment} />) : null}

    </div>

  )
}

export default MainDetail
