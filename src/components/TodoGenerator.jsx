import {
  useContext,
  useEffect,
  useState
} from 'react';
import {TodoContext} from '../contexts/TodoContext';
import './TodoList.css';

const TodoGenerator = () => {
  const {state, dispatch} = useContext(TodoContext);
  const [inputText, setInputText] = useState('');

  function addTodo () {
    if (inputText.trim()) {
      const action = {type: 'ADD', text: inputText};
      dispatch(action);
      setInputText('');
    }
  }

  return (
    <>
      {
        state.length === 0 && (
          <div className='todo-empty-info'>
            Add the things you need to do today...
          </div>
        )
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
    </>
  )
}

export default TodoGenerator;