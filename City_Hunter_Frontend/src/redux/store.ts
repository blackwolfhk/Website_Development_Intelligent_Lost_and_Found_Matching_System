import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/reducers";
import postReducer from "./post/reducers";
import logger from "redux-logger";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer,)
const store = configureStore({
    reducer: persistedReducer,
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }
    ).concat(logger)
});

export default store;
