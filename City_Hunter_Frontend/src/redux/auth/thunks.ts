import { createAsyncThunk } from "@reduxjs/toolkit";


const fbThunk: any = createAsyncThunk("fbThunk", async (params: any, thunkApi) => {
    const fbToken = params
    console.log(fbToken)
    const res = await fetch('http://localhost:8080/user/login/fb', {
        method: "POST",
        body: JSON.stringify({ fbToken: fbToken }),
        headers: {
            "Content-type": "application/json"
        }
    })
    const data = await res.json()
    if (res.ok) {
        const token = data.token
        console.log("token : ", token)
        return thunkApi.fulfillWithValue(token)
    }
    return thunkApi.rejectWithValue("Login Fail Using FB")
})


const googleThunk: any = createAsyncThunk("googleThunk", async (params: any, thunkApi) => {
    const googleToken = params
    console.log(googleToken)
    const res = await fetch('http://localhost:8080/user/login/google', {
        method: "POST",
        body: JSON.stringify({ accessToken: googleToken }),
        headers: {
            "Content-type": "application/json"
        }
    })
    const data = await res.json()
    if (res.ok) {
        const token = data.token
        return thunkApi.fulfillWithValue(token)
    }
    return thunkApi.rejectWithValue("Login Fail Using Google")
})

const loginThunk: any = createAsyncThunk("loginThunk", async (params: {
    username: string,
    password: string
}, thunkApi) => {
    const res = await fetch('http://localhost:8080/user/login', {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json"
        }
    })
    const data = await res.json()

    if (res.ok) {
        const token = data.token
        return thunkApi.fulfillWithValue(token)
    }

    return thunkApi.rejectWithValue("Login Fail")

})

const getPost: any = createAsyncThunk('posts', async (params, { fulfillWithValue, rejectWithValue }) => {
    try {
        const res = await fetch('http://localhost:8080/posts', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        const data = await res.json()
        return fulfillWithValue(data)
    }
    catch {
        return rejectWithValue("fail(thunk get Post)")
    }
})


export { loginThunk, fbThunk, googleThunk, getPost }
