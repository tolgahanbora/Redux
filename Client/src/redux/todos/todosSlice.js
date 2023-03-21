import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
const res = await axios (`${process.env.REACT_APP_API_BASE_ENDPOINT}`)
return res.data
})
export const postTodosAsync = createAsyncThunk('todos/postTodosAsync', async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}`, data)
    return res.data
})

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({id,data}) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/${id}`, data)
    return res.data
})
export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync', async (id) => {
      await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/${id}`)
    return id
})

export const todosSlice = createSlice ({
    name: 'todos',
    initialState: {
       items:[],
       isLoading: false,
       error: null,
       addNewTodoIsLoading: false,
       activeFilter: 'all'
    },
    reducers:{
        toggle: (state,action) => {
            const {id} = action.payload
            const item = state.items.find(item => item.id === id)
            item.completed = !item.completed
        },
        destroy: (state,action) => {
            const id = action.payload
            const filtered = state.items.filter(item => item.id !== id)
            state.items = filtered
        },
        changeActive: (state,action) => {
            state.changeActive = action.payload
        }
       },
       extraReducers(builder) {
        builder
        // GET METHOD
        .addCase(getTodosAsync.pending, (state) => {
            state.isLoading = true
        }) 
        .addCase(getTodosAsync.fulfilled, (state,action) => {
            state.items = action.payload
            state.isLoading = false
        })
        .addCase(getTodosAsync.rejected, (state,action) => {
            state.isLoading = false
            state.error = action.error.message
        })
        // POST METHOD
        .addCase(postTodosAsync.fulfilled, (state,action) => {
        state.items.push(action.payload)
        state.addNewTodoIsLoading = false
        })
        .addCase(postTodosAsync.pending, (state,action) => {
            state.addNewTodoIsLoading = true
          })
          .addCase(postTodosAsync.rejected, (state,action) => {
            state.addNewTodoIsLoading = false
            state.error = action.error.message
        })
        //Toggle 
        .addCase(toggleTodoAsync.fulfilled, (state,action) => {
            const {id,completed } = action.payload
            const index = state.items.findIndex(item => item.id === id)
            state.items[index].completed = completed
        })
        //REMOVE TODOS
        .addCase(removeTodoAsync.fulfilled, (state, action) => {
          const id = action.payload
          const filter = state.items.filter(item => item.id !== id)
          state.items = filter
            
        })
       }
     
})
export  const selectItems = (state) => state.todos.items

export const selectFiltered = (state) => {
    if (state.todos.activeFilter === 'all') {
        return state.todos.items
    }

    return state.todos.items.filter((todo) => state.todos.activeFilter !== 'active' ? todo.completed === false : todo.completed !== true )
}

export const {destroy,changeActive} = todosSlice.actions
export default todosSlice.reducer