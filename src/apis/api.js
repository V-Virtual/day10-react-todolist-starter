import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://68c78d275d8d9f514732276b.mockapi.io',
})

export const getTodos = async () => {
  const response = await instance.get('/todos')
  return response
}

export const addTodo = async (todo) => {
  const response = await instance.post('/todos', todo)
  return response
}