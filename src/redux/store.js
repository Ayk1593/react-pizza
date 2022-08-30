import {combineReducers, configureStore} from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizzaReducer from "./slices/pizzasSlice"

const rootReducer = combineReducers({
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer
})

export const store = configureStore({
    reducer: rootReducer
})

// export const store = configureStore({
//     reducer: {
//         filter: filterReducer,
//     },
// })