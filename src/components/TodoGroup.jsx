import {
  useContext,
  useEffect,
  useState
} from 'react';
import {TodoContext} from '../contexts/TodoContext';
import './TodoList.css';
import {
  deleteTodos,
  getTodos,
  updateTodos
} from '../apis/api';
import TodoGenerator from './TodoGenerator';

const TodoGroup = () => {
  const {state, dispatch} = useContext(TodoContext);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    getTodos().then(response => {
      dispatch({type: 'LOAD', todos: response.data});
    })
  }, []);

  function toggleDone (id) {
    const oldTodo = state.find(todo => todo.id === id);
    const newTodo = {...oldTodo, done: !oldTodo.done};
    updateTodos(id, newTodo).then(r => console.log(r.data));
    const action = {type: 'DONE', id: id};
    dispatch(action);
  }

  function deleteTodo (id, e) {
    deleteTodos(id).then(r => console.log(r.data));
    e.stopPropagation();
    const action = {type: 'DELETE', id: id};
    dispatch(action);
  }

  return (
    <div className={'todo-group'}>
      <div className='todo-title'>Todo List</div>
      {
        state.map(({
                     id,
                     text,
                     done
                   }) => {
          return (
            <div key={id} className='todo-row'>
              <div className={`todo-item ${done ? 'done' : ''}`}
                   onClick={() => toggleDone(id)}>
                {text}
              </div>
              <button
                className='delete-button'
                onClick={(e) => deleteTodo(id, e)}
              >
                X
              </button>
            </div>
          )
        })
      }
      <TodoGenerator/>
    </div>
  );
}

export default TodoGroup;