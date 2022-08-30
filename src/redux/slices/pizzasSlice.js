import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";


export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {currentPage, categoryId, sortType, searchValue} = params
        const res = await axios.get(`https://62e3fd42c6b56b4511801ba8.mockapi.io/pizzas?page=${currentPage}&limit=4&${
            categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType.sortProperty}&order=${sortType.order}&${searchValue ? `search=${searchValue}` : ''}`)
        return res.data
    }
)


const initialState = {
    items: [],
    status: 'loading'
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        },
    },
})


export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer