import React, { useState } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import {Form , Field , ErrorMessage , Formik} from 'formik'
import * as yup from 'yup'
import {useDispatch , useSelector} from 'react-redux'
import { clearState, signUpUser } from '../../Features/auth/authSlice'
import { useEffect } from 'react'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Signup() {

  const[pic , setPic] = useState('');
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  let {error , message , loading} = data;

  useEffect(()=>{
    if(error){
      toast.error(error,{position:toast.POSITION.TOP_CENTER})
      dispatch(clearState());
    }
    if(message){
      toast.success(message,{position:toast.POSITION.TOP_CENTER})
      dispatch(clearState());
    }
    
  })
  

  const initialState = {
    userName : '',
    userEmail : '',
    userPassword : '',
    userPhone : '',
    userCity : '',
    userState : ''
  }

  const validationSchema = yup.object().shape({
    userName :yup.string().required("Please Enter the Name"),
    userEmail : yup.string().required().email("Please enter the Email"),
    userPassword : yup.string().required("Please Enter your Password").
    min(8,"password must be of 8 Characters"),
    userPhone : yup.string().required("Please enter your Phone Number"),
    userCity : yup.string().required("Please enter your city"),
    userState : yup.string().required("Please enter your state")
  });

  const handleSubmit = (values)=>{
    const obj = {
      profilePic : pic,
      ...values
    }
    dispatch(signUpUser(obj));
  }

  const picSelect = (e)=>{
    setPic(e.target.files[0]);
  }


  return (
    <>
    <ToastContainer/>
    <div className='containers'>
        <div className="boxes">
               <h1>Signup</h1>
               <Formik
               initialValues={initialState}
               validationSchema={validationSchema}
               onSubmit={handleSubmit}>
               <Form>
                <label htmlFor="">Full Name</label>
                <Field className='formField' type='text' name='userName' placeholder='Name' />
                <ErrorMessage name='userName'></ErrorMessage>
                <label htmlFor="">Email</label>
                <Field className='formField' type='text' name='userEmail' placeholder='email'/>
                <ErrorMessage name='userEmail'></ErrorMessage>
                <label htmlFor="">Phone Number</label>
                <Field className='formField' type='text' name='userPhone' placeholder='Phone Number' />
                <ErrorMessage name='userPhone'></ErrorMessage>
                <label htmlFor="">City</label>
                <Field className='formField' type='text' name='userCity' placeholder='City'/>
                <ErrorMessage name='userCity'></ErrorMessage>
                <label htmlFor="">State</label>
                <Field className='formField' type='text' name='userState' placeholder='State'/>
                <ErrorMessage name='userState'></ErrorMessage>
                <label htmlFor="">Password</label>
                <Field className='formField' type='text' name='userPassword' placeholder='Password'/>
                <ErrorMessage name='userPassword'></ErrorMessage>
                <input type="file" name="profilePic" id="" onChange={picSelect}/>
                <ErrorMessage name='profilePic'></ErrorMessage>
                <input id='submitButton' type='submit'/>
               </Form>
               </Formik>
               <p>Already Have an Account ? <Link to='/'>Login</Link></p>
        </div>
    </div>
    </>
  )
}

export default Signup