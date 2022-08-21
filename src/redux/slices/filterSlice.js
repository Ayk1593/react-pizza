import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
    categoryId: 0,
    sortType: {
        name: 'популярности ↑',
        sortProperty: 'rating',
        order: 'asc'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setCategoryId: (state, action) => {
             state.categoryId = action.payload
        },
        setSort: (state, action) => {
            state.sortType = action.payload
        }
    },
})


export const {setSearchValue, setCategoryId, setSort} = filterSlice.actions

export default filterSlice.reducer