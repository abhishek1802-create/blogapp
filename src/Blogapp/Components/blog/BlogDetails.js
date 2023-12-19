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

  useEffect(()=>{
     dispatch(blogDetails(id));
  },[])
  
  return (
    <>
    <Navbar/>
    <div className='blogDetail'>
          <div className="blogCard">
            <img src={`http://localhost:7000${blog_Details.blogPic}`} alt="" id='blogPicture' />
            <h1>{blog_Details.title}</h1>
            <h5>{blog_Details.description}</h5>
            <Link to= {`/comment/${id}`} style={{textDecoration:'none',}}>🗨️</Link>
          </div>
          <div className="comment">
            {
              comments && comments.map((comment)=>{
                const {profilePic} = comment.userId;
                const imageUrl = profilePic.split('\\uploads\\')[1];
                return(
                  <div className="commentCard">
                  <img src={`http://localhost:7000/uploads/${imageUrl}`} 
                  alt='userImage'></img>
                  <p>{comment.comment}</p>
                  <h4>{comment.userId.userName}</h4>
                  <h5>{comment.createdAt.slice(0,10)}</h5>
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