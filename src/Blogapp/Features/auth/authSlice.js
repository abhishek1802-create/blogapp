import axios from 'axios'
import { createAsyncThunk , createSlice} from '@reduxjs/toolkit'


let initialState = {
    message : "",
    token : "",
    error : "",
    user : "",
    loading : "",
    forget_message : ""
}

// For Signup User

export const signUpUser = createAsyncThunk(
    'signUpUser',
    async(data,{rejectWithValue}) =>{
        console.log(data);

       const response = await axios.post(
        "http://localhost:7000/user/signup",
        data,
        {
            headers : {
                "Content-Type": "multipart/form-data",
            }
        }
       );
       console.log(response);
       return response;
    }
);

export const signInUser = createAsyncThunk(
    "user/signInUser",
    async (body, thunkAPI) => {
      const reResult = await fetch("http://localhost:7000/user/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let data = await reResult.json();
      console.log(data)
      if (data.success) {
        console.log("res result is", reResult);
        console.log("data is", data);
        // for error message
        console.log("*", data.success, data);
        return data;
      } else {
        console.log("wrong data", data);
        return thunkAPI.rejectWithValue(data);
      }
    }
  );
  

const authSlice = createSlice({
    name :'user',
    initialState,
    reducers : {
        clearState : (state) =>{
               state.message = "";
               state.error = "";
        }
    },

    extraReducers : (builder)=>{

      builder
      .addCase(signUpUser.pending, (state, { payload }) => {
        console.log("pending...");
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        console.log("Done", payload);
        state.loading = false;
        state.message = payload.data.message;
      })
      .addCase(signUpUser.rejected, (state, payload) => {
        state.error = payload.error.message;
        state.loading = false;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
    
        state.loading = false;
        console.log("payload fulfilled:", payload);
       
        if (payload.success) {
          console.log("inside payload success");
          console.log(payload);
          state.message = payload.message;
          state.token = payload.token;
          state.user = payload.userData;
          localStorage.setItem("message", payload.message);
          localStorage.setItem("user", JSON.stringify(payload.userData));
          localStorage.setItem("token", payload.accessToken);
          console.log("successful");
        } else {
          state.error = payload.error;
        }
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        console.log("this is rejected", payload);
        state.loading = false;
        state.error = payload.message;
        state.message = "";
      });



          
    },
});

export default authSlice.reducer;
export const { clearState } = authSlice.actions;