import React, { useState ,useEffect } from 'react'
import './CreateBlog.css'
import {Formik , Field , Form , ErrorMessage} from "formik";
import * as yup from 'yup'
import {useDispatch , useSelector} from 'react-redux'
import { createBlog } from '../../Features/blogs/blogSlice';
import { ToastContainer,toast } from "react-toastify";

function CreateBlog() {

  const [pic , setPic] = useState('');
  const dispatch = useDispatch();
  const blogData = useSelector((state)=>state.blog);
  let {error , blogCreate_msg} = blogData;

  useEffect(() => {
    if(blogCreate_msg) {
      toast.success(blogCreate_msg, { position: toast.POSITION.TOP_CENTER });
    }
    if(error) {
      toast.error(error, {position: toast.POSITION.TOP_CENTER});
    }
    
  }, [blogCreate_msg, error]);

  const initialState = {
     title : '',
     description : ''
  }

  const validationSchema = yup.object().shape({
    title : yup.string().required('enter the Title'),
    description : yup.string().required('enter the description')
  })

  const handleSubmit = (values)=>{
    const obj = {
        ...values,
        blogPic : pic
    }
    dispatch(createBlog(obj));
  }

  const addBlogPic = (e)=>{
    setPic(e.target.files[0]);
 }


  return (
  <>
  <ToastContainer/>
    <div className='createContainer'>
    <div className="addBox">
           <h1>Add Blog</h1>
           <Formik 
           initialValues={initialState}
           validationSchema={validationSchema}
           onSubmit={handleSubmit}>
           <Form>
            <label htmlFor="">Title</label>
            <Field type='text' name='title' placeholder='Title'/>
            <ErrorMessage name='title'></ErrorMessage>
            <label htmlFor="">Description</label>
            <Field type='text' name='description' placeholder='Description' as='textarea' rows='5'/>
            <ErrorMessage name='description'></ErrorMessage>
            <input type="file" name="blogPic" onChange={addBlogPic}  />
            <button id='loginButton' type='submit'>Add Blog</button>
           </Form>
           </Formik>
       </div>    
    </div>
    </>
  )
}

export default CreateBlog