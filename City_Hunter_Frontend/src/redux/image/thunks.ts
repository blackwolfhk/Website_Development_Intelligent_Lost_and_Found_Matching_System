import { createAsyncThunk } from "@reduxjs/toolkit";

const getImageThunk: any = createAsyncThunk('images', async (params: any, { fulfillWithValue, rejectWithValue }) => {
    try {
        const res = await fetch(process.env.REACT_APP_API_HOST + '/images', {
        })
        const data = await res.json()
        console.log(data)
        return fulfillWithValue(data)

        
    }
    catch {
        return rejectWithValue("fail(thunk get Image)")
    }
})

export { getImageThunk }
