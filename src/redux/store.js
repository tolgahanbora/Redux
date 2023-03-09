import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'


export const store = configureStore({
    reducer: {
        counter: counterReducer
    },
})
//Tüm verilerimizi barındıran obje, tüm componentlere buradan gönderiyoruz. Bunu index.js üzerinde <App/> ile sarmalıyoruz
//<Provider store={store}> <App /> </> ile provider içerisinde sarmaladım ve store u props geçtim. 