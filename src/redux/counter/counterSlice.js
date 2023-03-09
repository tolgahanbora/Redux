import {createSlice }from '@reduxjs/toolkit'


export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 2
    },
    reducers: {
         increment : (state) => {
            state.value += 1
         },
         decreament: (state) => {
            state.value -= 1 
         },
         increaseToInput: (state, action) => {
            state.value +=  Number(action.payload)
         }
    }
})


export const {increment,decreament,increaseToInput} = counterSlice.actions
export default counterSlice.reducer