import { createAsyncThunk } from "@reduxjs/toolkit";

const getPostThunk: any = createAsyncThunk('posts', async (params: any, { fulfillWithValue, rejectWithValue }) => {
    try {
        const res = await fetch(process.env.REACT_APP_API_HOST + '/posts', {
        })
        const data = await res.json()
        console.log(data)
        return fulfillWithValue(data)
    }
    catch {
        return rejectWithValue("fail(thunk get Post)")
    }
})

export { getPostThunk }
