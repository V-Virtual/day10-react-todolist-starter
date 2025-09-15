import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://68c78d275d8d9f514732276b.mockapi.io',
})

export const getTodos = async () => {
  return await instance.get('/todos')
}

export const addTodos = async (todo) => {
  return await instance.post('/todos', todo)
}

export const updateTodos = async (id, todo) => {
  return await instance.put(`/todos/${id}`, todo)
}

export const deleteTodos = async (id) => {
  return await instance.delete(`/todos/${id}`)
}