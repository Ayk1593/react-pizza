import {combineReducers, configureStore} from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
    filter: filterReducer,
    cart: cartReducer
})

export const store = configureStore({
    reducer: rootReducer
})

// export const store = configureStore({
//     reducer: {
//         filter: filterReducer,
//     },
// })