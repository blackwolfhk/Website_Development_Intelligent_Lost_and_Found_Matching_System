import { createAsyncThunk } from "@reduxjs/toolkit";

const getPostThunk: any = createAsyncThunk('posts', async (params: {
    status: number,
    price: number,
    districts: number
}, { fulfillWithValue, rejectWithValue }) => {
    try {
        // console.log("createAsyncThunk");

        let querys: string[] = []
        if (params.status > 0) {
            querys.push(`status=${params.status}`)
        }
        if (params.price > 0) {
            querys.push(`price=${params.price}`)
        }
        if (params.districts > 0) {
            querys.push(`districts=${params.districts}`)
        }
        let query: string = ''
        let index: number = 0
        for (const value of querys) {
            if (index == 0) {
                query += '?' + value
            } else {
                query += '&' + value
            }
            index++
        }
        const url = process.env.REACT_APP_API_HOST + '/posts' + query
        // console.log("url : ", url);

        const res = await fetch(url, {
            method: "GET",
        })
        const data = await res.json()
        // console.log(data)
        return fulfillWithValue(data)
    }
    catch (error) {
        return rejectWithValue(error)
    }
})


export { getPostThunk }
