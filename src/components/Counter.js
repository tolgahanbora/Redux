import React, { useState } from 'react'

import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import { increment,decreament,increaseToInput } from '../redux/counter/counterSlice'



function Counter() {

const [number, setNumber] = useState()

const countValue = useSelector( (state) => state.counter.value)
const dispatch = useDispatch()
console.log(countValue)
  return (
    <div>
        <h1>{countValue}</h1>
        <button onClick={() => dispatch(increment())}>increase</button>
        <button onClick={() => dispatch(decreament())}>decrease</button>
        <br/>
        <br/>
        <input value={number} type='number' onChange={(e) => setNumber(e.target.value)}/>
        <button onClick={() => dispatch(increaseToInput(number))}>increase</button>
    </div>
  )
}

export default Counter