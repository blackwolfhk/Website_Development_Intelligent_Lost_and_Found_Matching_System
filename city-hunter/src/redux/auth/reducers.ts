import { createReducer } from "@reduxjs/toolkit";
import { IAuthState } from "./state";
import { loginAction } from "./actions";
import { login } from "./thunks";

const initialState: IAuthState = {
    displayName: "",
    isLoggedIn: false
}


const authReducer = createReducer(initialState, (builder) => {
    builder.addCase(loginAction, (state, action) => {
        state.isLoggedIn = action.payload
    })
    builder.addCase(login.fulfilled, (state, action) => {
        state.displayName = action.payload
    })
    builder.addCase(login.rejected, (state, action) => {
        state.displayName = action.payload
    })
    // builder.addCase(fetchUsername.pending, (state, action) => {
    //     console.log("pending")
    // })
    // builder.addCase(fetchUsername.fulfilled, (state, action) => {
    //     state.displayName = action.payload
    // })
    // builder.addCase(fetchUsername.rejected, (state, action) => {
    //     state.displayName = action.payload
    // })
})

export default authReducer