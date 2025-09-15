import {
  useContext,
  useEffect,
  useState
} from 'react';
import {TodoContext} from '../contexts/TodoContext';
import './TodoList.css';
import {getTodos} from '../apis/api';
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
    const action = {type: 'DONE', id: id};
    dispatch(action);
  }

  function deleteTodo (id, e) {
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