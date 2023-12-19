import React from 'react'
import './BlogList.css'
import Navbar from '../../Navbar/Navbar'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import { listBlog } from '../../Features/blogs/blogSlice'
import {useDispatch ,useSelector} from 'react-redux'

function BlogList() {

  const dispatch = useDispatch();
  const blogData = useSelector((state)=>state.blog);
  //console.log(blogData);
  const {blog_Data} = blogData;
  //console.log(blog_Data);

  useEffect(()=>{
    dispatch(listBlog());
  },[])

  return (
    <>
    <Navbar/>
    <div className='blogs'>
      <div className="headerLinks">
             <h1>All Posts</h1>
            <Link to='/createBlog'><button id='addPost'>Add Blog</button></Link>
      </div>
    <div className="blogMain">
    {
      blog_Data && blog_Data.map(({_id,title,description ,blogPic,createdAt})=>{
        console.log('blogPic :',blogPic)
        return(
          <Link to= {`/blogDetails/${_id}`}>
          <div className="blogCard">
          <img src={`http://localhost:7000${blogPic}`} alt="blogPic" id='blogPic' />
          <h1>{title}</h1>
          <p>{createdAt.slice(0,10)}</p>
          <p>{description}</p>
          </div>
          </Link>
        )
      })
    }
    </div>
    </div>
    </>
  )
}

export default BlogList