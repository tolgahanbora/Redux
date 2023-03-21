import React, { useState } from 'react'
import { postTodosAsync } from '../redux/todos/todosSlice'

import {useDispatch, useSelector} from 'react-redux'
function Header() {


  const [title, setTitle] = useState("") 
  const isLoading = useSelector((state) => state.todos.addNewTodoIsLoading)
  const dispatch = useDispatch()

  const handleSumbit = async (e) => {
    if (!title) return;

    e.preventDefault()
  await dispatch(postTodosAsync({title}))
    setTitle('')
    console.log(title)
  }




  return (
    <header className='header'>
        <h1>To Do</h1>
    <form onSubmit={handleSumbit}>
        <input disabled={isLoading} value={title} onChange={(e) => setTitle(e.target.value)} className='new-todo' placeholder='what needs to be done ?' autoFocus />
    </form>
    </header>
  )
}

export default Header