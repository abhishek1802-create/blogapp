import {createAsyncThunk , createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
//import { thunk } from 'redux-thunk';

let initialState = {
    blogCreate_msg : '',
    blogList_msg : '',
    blogDetail_msg : '',
    blog_Data : '',
    blog_Details : '',
    loading : false,
    error : '',
    count : '',
    comments : '',
}


//Async Function to create Blogs
export const createBlog = createAsyncThunk(
    'blog/create',
     async (body,thunkAPI) =>{
           const response = await axios.post("http://localhost:7000/blog/create",body,{
            headers : {
                "Content-Type" : "multipart/form-data",
            },
           });
           return response;
     }

)

//Async Function to List out the Blogs
export const listBlog = createAsyncThunk(
    'blog/list',
    async (thunkAPI) => {
         const response = await fetch("http://localhost:7000/blog/blogs",{
         method : 'get',
         headers : {
            "Content-Type" : "multipart/form-data",
        },
    });

    let data = await response.json();
    console.log("Blog retrieve from Server :",data);
    if(data.success){
        console.log("get Data Successfully");
        return data;
    }else{
        return thunkAPI.rejectWithValues(data);
    }
    }
)

//Async Function to get Details of Blogs
export const blogDetails = createAsyncThunk(
    'blog/detail',
    async (id,thunkAPI) =>{
        console.log("Id is: ",id);
        const response = await fetch(`http://localhost:7000/blog/details/${id}`,{
        method : 'get',
        headers :{
            "Content-Type" : "multipart/form-data",
        }
    });

    let detail = await response.json();
    console.log("Blog retrieve from Server :",detail);
    if(detail.success){
        console.log("get Data Successfully");
        return detail;
    }else{
        return thunkAPI.rejectWithValue(detail);
    }
    }
)

const blogSlice = createSlice({
    name :'blog',
    initialState,
    reducers : {
        clearState : (state) =>{
            state.blogCreate_msg = '';
            state.error = ''
        }
    },


    extraReducers : (builder) =>{
         
        builder
        .addCase(createBlog.pending, (state,{payload}) =>{
            state.loading = true;
            state.error = "";
            state.blogCreate_msg = ""
        })
        .addCase(createBlog.fulfilled , (state,{payload}) =>{
            state.loading = false;
            state.blogCreate_msg = payload.data.message;
        })
        .addCase(createBlog.rejected,(state,{payload}) =>{
            state.loading = false;
            state.error = payload.error;
        })
        .addCase(listBlog.pending,(state)=>{
            state.loading = true;
        })
        .addCase(listBlog.fulfilled,(state,{payload})=>{
            state.loading = false;
            if(payload.error){
                state.error = payload.error;
            }else{
                state.blogList_msg = payload.message;
                state.blog_Data = payload.blog;
                state.count = payload.count;
            }
        })
        .addCase(listBlog.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload.error;
        })
        .addCase(blogDetails.pending,(state)=>{
            state.loading = true;
        })
        .addCase(blogDetails.fulfilled,(state,{payload})=>{
            state.loading = false;
            if(payload.error){
                state.error = payload.error;
            }else{
                state.blogDetail_msg = payload.message;
                state.blog_Details = payload.blog;
                state.comments = payload.comment;
            }
        })
        .addCase(blogDetails.rejected,(state,{payload})=>{
            state.loading = false;
            //state.error = payload.error;
        })
    }
}
)

export default blogSlice.reducer;
export const {clearState} = blogSlice.actions;
