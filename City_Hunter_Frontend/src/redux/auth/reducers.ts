import { createReducer } from "@reduxjs/toolkit";
import { IAuthState, MyJwtPayload } from "./state";
import { fbThunk, loginThunk, googleThunk } from "./thunks";
import jwtDecode from "jwt-decode";


const initialState = (): IAuthState => {
    let data = {
        isLoggedIn: false,
        role: "",
        username: "",
        displayName: "",
        email: "",
        mobile_no: ""
    }

    let token = localStorage.getItem("token");
    if (token) {
        const jwtPayload: MyJwtPayload = jwtDecode(token);
        data.username = jwtPayload.username
        data.displayName = jwtPayload.username
        data.email = jwtPayload.email
        data.mobile_no = jwtPayload.mobile_no
        data.isLoggedIn = true
    }

    return data
}

const authReducer = createReducer(initialState(), (build) => {
    // success login handling
    build.addCase(loginThunk.fulfilled, (state, action) => {
        handleToken(state, action)
    });
    // fail login handling
    build.addCase(loginThunk.rejected, (state, action) => {
        handleToken(state, action)
    });
    //success fb login handling:
    build.addCase(fbThunk.fulfilled, (state, action) => {
        handleToken(state, action)
    });
    //fail fb login handling:
    build.addCase(fbThunk.rejected, (state, action) => {
        handleToken(state, action)
    })

    build.addCase(googleThunk.fulfilled, (state, action) => {
        handleToken(state, action)
    });
    //fail fb login handling:
    build.addCase(googleThunk.rejected, (state, action) => {
        handleToken(state, action)
    })
})

const handleToken = (state: any, action: any) => {
    const token = action.payload;
    localStorage.setItem("token", token);
    const jwtPayload: MyJwtPayload = jwtDecode(token);
    state.isLoggedIn = true;
    state.role = jwtPayload.role;
    state.username = jwtPayload.username;
    state.mobile_no = jwtPayload.mobile_no;
    state.email = jwtPayload.email;
}


export default authReducer;
