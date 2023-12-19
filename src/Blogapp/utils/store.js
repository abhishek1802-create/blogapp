import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import authSlice from "../Features/auth/authSlice";
import blogSlice from "../Features/blogs/blogSlice";
import commentSlice from "../Features/Comment/commentSlice";

const store = configureStore(
    {
        reducer:{
           user : authSlice,
           blog : blogSlice,
           comment : commentSlice
        }
    },
    applyMiddleware(thunk)
)

export default store;