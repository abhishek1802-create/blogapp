import React from 'react'
import './BlogList.css'
import Navbar from '../../Navbar/Navbar'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import { listBlog } from '../../Features/blogs/blogSlice'
import { FaBuilding } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import {useDispatch ,useSelector} from 'react-redux'

function BlogList() {
  
  const dispatch = useDispatch();
  const blogData = useSelector((state)=>state.blog);

  const {blog_Data} = blogData;
  
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
          console.log(`${process.env.REACT_APP_BACKENDURL}${blogPic}`)
        return(
          <Link to= {`/blogDetails/${_id}`}>
          <div className="blogCard">
          <img src={`${process.env.REACT_APP_BACKENDURL}${blogPic}`} alt="blogPic" id='blogPic' />
          <h2><FaBuilding />{title}</h2>
          <p><IoTimeSharp />{createdAt.slice(0,10)}</p>
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