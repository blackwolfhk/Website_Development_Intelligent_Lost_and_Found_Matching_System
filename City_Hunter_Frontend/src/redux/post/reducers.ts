import { createReducer } from "@reduxjs/toolkit";
import { IPostState } from "../post/state"  
import { getPostThunk } from "./thunks";
import { MyJwtPayload } from "../auth/state";

const initialPost: IPostState = {
    posts: []
}

const postReducer = createReducer(initialPost, (build) => {
    //success get post handling:
    build.addCase(getPostThunk.fulfilled,(state: IPostState, action) => {
        state.posts = action.payload
        // console.log(action.payload);
        
        // getPost(state,action)
    })
    //fail get post handling:
    build.addCase(getPostThunk.rejected, (state: IPostState, action) => {
        getPost(state,action)
    })
})

const getPost = (state: IPostState, action: any) => {
    // console.log(action.payload)
    // state = action.payload
}
export default postReducer;

