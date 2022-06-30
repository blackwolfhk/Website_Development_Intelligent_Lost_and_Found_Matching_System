import { createAsyncThunk } from "@reduxjs/toolkit";

const login: any = createAsyncThunk('login', async (params: { username: string, password: string }, { fulfillWithValue, rejectWithValue }) => {
    const res = await fetch('http://localhost:8080/login', {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    const data = await res.json()
    console.log(data)
    if (res.ok) {
        // success case:
        return fulfillWithValue(data.displayName)
    }
    // fail case:
    return rejectWithValue(data.msg)
})

export { login }