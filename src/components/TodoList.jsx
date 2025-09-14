import {useContext, useState} from 'react';
import {TodoContext} from '../contexts/TodoContext';
import './TodoList.css';

const TodoList = () => {
  const {state, dispatch} = useContext(TodoContext);
  const [inputText, setInputText] = useState('');

  function toggleDone (id) {
    const action = {type: 'DONE', id: id};
    dispatch(action);
  }

  function addTodo () {
    if (inputText.trim()) {
      const action = {type: 'ADD', text: inputText};
      dispatch(action);
      setInputText('');
    }
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
            <div className='todo-row'>
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
      <input type='text'
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             className={'todo-input'}
      />
      <button
        onClick={addTodo}
        className={'todo-add-button'}
        disabled={!inputText.trim()}
      >
        add
      </button>
    </div>
  );
}

export default TodoList