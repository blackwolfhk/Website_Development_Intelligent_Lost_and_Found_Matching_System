import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/reducers";
import postReducer from "./post/reducers";
import logger from "redux-logger";

const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
