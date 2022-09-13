import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
    categoryId: 0,
    sortType: {
        name: 'популярности ↑',
        sortProperty: 'rating',
        order: 'asc'
    },
    currentPage: 1
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
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action) => {
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
            state.sortType = action.payload.sortType

        }
    },
})

export const selectFilter = (state) => state.filter
export const selectSort = (state) => state.filter.sortType

export const {setSearchValue, setCategoryId, setSort, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer