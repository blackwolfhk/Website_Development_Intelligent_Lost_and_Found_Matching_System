import { createReducer } from "@reduxjs/toolkit";
import { IImageState } from "../image/state"  
import { getImageThunk } from "./thunks";
import { MyJwtPayload } from "../auth/state";

const initialImage: IImageState = {
    images: []
}

const imageReducer = createReducer(initialImage, (build) => {
    //success get image handling:
    build.addCase(getImageThunk.fulfilled,(state: IImageState, action) => {
        state.images = action.payload
        console.log(action.payload);
    })
    //fail get image handling:
    build.addCase(getImageThunk.rejected, (state: IImageState, action) => {
        getImage(state,action)
    })
})

const getImage = (state: IImageState, action: any) => {
    // console.log(action.payload)
    // state = action.payload
}
export default imageReducer;

