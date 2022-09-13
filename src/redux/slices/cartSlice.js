import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            // const findItem2 = state.items.find(obj => obj.size !== action.payload.size)
            //
            // if (findItem && findItem2) {
            //     console.log('1')
            //     state.items.push({
            //         ...action.payload,
            //         count: 1
            //     })
            //     findItem.count++
            // } else if (findItem) {
            //     console.log('2')
            //     findItem.count++
            // }
            // else {
            //     console.log('3')
            //     state.items.push({
            //         ...action.payload,
            //         count: 1
            //     })

                if (findItem) {
                    findItem.count++
                }
                else {

                    state.items.push({
                        ...action.payload,
                        count: 1
                    })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        minusItem: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem && findItem.count > 1) {
                findItem.count--
                state.totalPrice -= findItem.price
            } else {
                state.items = state.items.filter(obj => obj.id !== action.payload)
                state.totalPrice -= findItem.price
            }
        },
        removeItem: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload)
            state.totalPrice -= findItem.price * findItem.count
            state.items = state.items.filter(obj => obj.id !== action.payload)

        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0;
        },
    }
})

export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => state => state.cart.items.find((obj) => obj.id === id)



export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions

export default cartSlice.reducer