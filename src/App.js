import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Signup from './Blogapp/Components/auth/Signup'
import Login from './Blogapp/Components/auth/Login';
import BlogList from '../src/Blogapp/Components/blog/BlogList'
import CreateBlog from './Blogapp/Components/blog/CreateBlog'
import BlogDetails from './Blogapp/Components/blog/BlogDetails';
import Comment from './Blogapp/Components/comments/Comment';


function App() {
  console.log(process.env.REACT_APP_BACKENDURL)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/blogList' element={<BlogList/>}></Route>
          <Route path='/createBlog' element={<CreateBlog/>}></Route>
          <Route path='/blogDetails/:id' element={<BlogDetails/>}></Route>
          <Route path='/comment/:id' element={<Comment/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
