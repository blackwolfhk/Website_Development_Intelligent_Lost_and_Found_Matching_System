import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./test/reducers";
import authReducer from "./auth/reducers";
import logger from "redux-logger";

const store = configureStore({
    reducer: {
        test: rootReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
