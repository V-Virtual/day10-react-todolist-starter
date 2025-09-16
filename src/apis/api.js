import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers:{
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config) => {
    // request configuration
    console.log("request success", config)
    config.metadata = {
      startTime: Date.now()
    }
    return config;
  },
  (error) => {
    // handle request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // handle response
    console.log("response success", response)
    console.log('Api duration is' + (Date.now() - response.config.metadata.startTime) +'ms')
    return response;
  },
  (error) => {
    // handle response error
    if (error.response) {
      const {status, data} = error.response;
      if (status === 401) {
        alert(`response Error ${status} ${data}`)
        console.log(error.response)
        // do something
      }
    } else {
      alert('Network error or no response from server');
      console.log(error);
    }
    return Promise.reject(error);
  }
);

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