import React, { useEffect } from 'react'
import '../blog/BlogDetails.css'
import {useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { blogDetails } from '../../Features/blogs/blogSlice';
import Navbar from '../../Navbar/Navbar';
import {Link} from 'react-router-dom'


function BlogDetails() {

  const param = useParams();
  const dispatch = useDispatch();
  const blogDetail = useSelector((state)=>state.blog);
  console.log(blogDetail)
  const {blog_Details , comments} = blogDetail;
  const {id} = param;
  console.log('comment',comments);
  console.log(blog_Details.blogPic);

  useEffect(()=>{
     dispatch(blogDetails(id));
  },[])
  
  return (
    <>
    <Navbar/>
    <div className='blogDetail'>
          <div className="blogCard">
            <img src={`${process.env.REACT_APP_BACKENDURL}${blog_Details.blogPic}`} alt="" id='blogPicture' />
            <h1>{blog_Details.title}</h1>
            <h5>{blog_Details.description}</h5>
            <Link to= {`/comment/${id}`} style={{textDecoration:'none',}}><button id='addComment'>Add Comment</button></Link>
          </div>
          <h2 style={{margin:'auto', color:'red'}}>Added Comments😊</h2>
          <div className="comment">
            {
              comments && comments.map((comment)=>{
                const {profilePic} = comment.userId;
                const imageUrl = profilePic.split('\\uploads\\')[1];
                return(
                  <div className="commentCard">
                  <img src={`http://localhost:7000/uploads/${imageUrl}`} 
                  alt='userImage' id='commentUser'></img>
                  <h4>{comment.comment}</h4>
                  <hr />
                  <p>{comment.userId.userName}</p>
                  <p>{comment.createdAt.slice(0,10)}</p>
                  </div>
                )
              })
            }
          </div>
    </div>
    </>
  )
}

export default BlogDetails
