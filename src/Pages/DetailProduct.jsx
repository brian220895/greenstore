import React, { useContext, useState } from 'react'
// import { AppContext } from '../context/AppProvider'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { db, storage } from '../config/firebase'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, orderBy, limit, startAfter, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AppContext } from '../context/AppProvider';
import Like from '../components/Like';
import UserComments from '../components/UserComments';
import CommentBox from '../components/CommentBox';


function DetailProduct() {
   
  const { user, setUser} = useContext(AppContext)
  const userId = user?.uid;
  const { id } = useParams();
 console.log('id',id)
  const [product, setproduct] = useState(null);
  // const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  let [likes, setLikes] = useState([]);
  const [userComment, setUserComment] = useState("");

  console.log('product',product)

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
  
    // const blogRef = collection(db, "test1");
    const docRef = doc(db, "test1", id);
    const blogDetail = await getDoc(docRef);
    console.log('blogDetail',blogDetail)
    // const blogs = await getDocs(blogRef);
    // let tags = [];
    // blogs.docs.map((doc) => tags.push(...doc.get("tags")));
    // let uniqueTags = [...new Set(tags)];
    // console.log('uniqueTags',uniqueTags)
    // setTags(uniqueTags);
    setproduct(blogDetail?.data());
    // const relatedBlogsQuery = query(
    //   blogRef,
    //   where("tags", "array-contains-any", blogDetail.data().tags, limit(3))
    // );



    setComments(blogDetail.data().comments ? blogDetail.data().comments : []);
    setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);
    
    
    // const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
    // const relatedBlogs = [];
    // relatedBlogSnapshot.forEach((doc) => {
    //   relatedBlogs.push({ id: doc.id, ...doc.data() });
    // });
    // setRelatedBlogs(relatedBlogs);
    // setActive(null);
    // setLoading(false);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    comments.push({
      userId,
      name: user?.displayName,
      body: userComment,
    });
    // toast.success("Comment posted successfully");
    await updateDoc(doc(db, "test1", id), {
      ...product,
      comments,
      createdAt: serverTimestamp(),
    });
    setComments(comments);
    setUserComment("");
  };

  const handleLike = async () => {
    if (userId) {
      if (product?.likes) {
        const index = likes.findIndex((id) => id === userId);
        if (index === -1) {
          likes.push(userId);
          setLikes([...new Set(likes)]);
        } else {
          likes = likes.filter((id) => id !== userId);
          setLikes(likes);
        }
      }
      await updateDoc(doc(db, "test1", id), {
        ...product,
        likes,
        createdAt: serverTimestamp(),
      });
    }
  };

    
  return (
    <div className="bg-slate-500">
    <div
      className="blog-title-box"
      style={{ backgroundImage: `url('${product?.images}')` }}
    >
      <div className="overlay"></div>
      <div className="blog-title">
        {/* <span>{product?.createAt.toDate().toDateString()}</span>
         {console.log('product',)} */}
        <span>{product?.createdAt?.toDate().toDateString()}</span>
        <h2>{product?.nameProduct}</h2>
      </div>
    </div>
    <div className="container-fluid pb-4 pt-4 padding blog-single-content">
      <div className="container padding">
        <div className="row mx-0">
          <div className="col-md-8">
            <span className="meta-info text-start">
              By <p className="author">{product?.userId}</p> -&nbsp;
              {product?.createdAt?.toDate().toDateString()}
              <Like handleLike={handleLike} likes={likes} userId={userId} />
            </span>
            <p className="text-start">{product?.description}</p>
            {/* <div className="text-start">
              <Tags tags={blog?.tags} />
            </div> */}
            <br />
            <div className="custombox">
              <div className="scroll">
                <h4 className="small-title">{comments?.length} Comment</h4>
                {(comments===null) ? (
                  <UserComments
                    msg={
                      "No Comment yet posted on this blog. Be the first to comment"
                    }
                  />
                ) : (
                  <>
                    {comments?.map((comment) => (
                      <UserComments {...comment} />
                    ))}
                  </>
                )}
              </div>
            </div>
            <CommentBox
              userId={userId}
              userComment={userComment}
              setUserComment={setUserComment}
              handleComment={handleComment}
            />
          </div>
          <div className="col-md-3">
           
          
          </div>
        </div>
      
      </div>
    </div>
  </div>
  )
}

export default DetailProduct
