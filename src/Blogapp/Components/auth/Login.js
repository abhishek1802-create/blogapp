import React from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import {Formik , Field , ErrorMessage , Form } from 'formik'
import {useDispatch , useSelector} from 'react-redux'
import { clearState, signInUser } from '../../Features/auth/authSlice'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from 'react'

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.user);
  let { error, message, loading } = data;


  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
      setTimeout(()=>{
        navigate('/')
        dispatch(clearState());
    },1000)
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER }); 
      setTimeout(()=>{
          navigate('/blogList')
          dispatch(clearState());
      },1000)
    }
  }, [error, message]);

  const initialState = {
    userEmail : '',
    userPassword : ''
  }

  const validationSchema = yup.object().shape({
    userEmail : yup.string().required().email("Please Enter the Email"),
    userPassword : yup.string().required('Please Enter the Email').
    min(8,'password must be of 8 characters')
  })

  const handleSubmit = (values) =>{
    console.log("Auth values:",values)
    dispatch(signInUser(values));
  }
  return (
    <>
    <ToastContainer/>
    <div className='container'>
        <div className="box">
               <h1>Login</h1>
               <Formik 
               initialValues={initialState}
               validationSchema={validationSchema}
               onSubmit={handleSubmit}>
               <Form>
                <label htmlFor="">Email</label>
                <Field type='text' name='userEmail' placeholder='email'/>
                <ErrorMessage name='userEmail'></ErrorMessage>
                <label htmlFor="">Password</label>
                <Field type='text' name='userPassword' placeholder='Password'/>
                <ErrorMessage name='userPassword'></ErrorMessage>
                <p id='forgotPass'>Forgot password ?</p>
                <button id='loginButton' type='submit'>Login</button>
               </Form>
               </Formik>
               <p>Don't have an Account ! Create an account First <Link to='/signup'>Register Now</Link></p>
               
        </div>
    </div>
    </>
  )
}

export default Login