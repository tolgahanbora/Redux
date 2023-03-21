import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {removeTodoAsync,selectItems , selectFiltered,getTodosAsync,toggleTodoAsync} from '../redux/todos/todosSlice'



function Todo() {
 
const items = useSelector(selectItems)
console.log(items)
const dispatch = useDispatch()
const isLoading = useSelector((state) => state.todos.isLoading)
const filteredItems = useSelector(selectFiltered)


const handleToggle = async (id,completed) =>{
  await dispatch(toggleTodoAsync({id,data:{completed}}))
}

useEffect(()=> {
dispatch(getTodosAsync())
}, [dispatch])


if(isLoading) {
  return <div>Loading...</div>
}



  return (
    <ul className="todo-list">
        
   {filteredItems.map((item) => (
    <li  key={item.id} className={item.completed ? 'completed' : ''}>
        <div className="view">
            <input className="toggle" checked={item.completed} type="checkbox" onChange={() => handleToggle(item.id, !item.completed)} />
            <label>{item.title}</label>
            <button onClick={() => dispatch(removeTodoAsync(item.id))} className="destroy"></button>
        </div>
    </li>
))}
</ul>
  )
}

export default Todo