import {
  useContext,
  useState
} from 'react';
import {TodoContext} from '../contexts/TodoContext';
import './TodoList.css';
import {addTodos} from '../apis/api';
import { Button } from 'antd';

const TodoGenerator = () => {
  const {state, dispatch} = useContext(TodoContext);
  const [inputText, setInputText] = useState('');

  function addTodo () {
    if (inputText.trim()) {
      const todo = {text: inputText, done: false};
      addTodos(todo).then(r => console.log(r.data));
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
      <Button
        type="primary"
        onClick={addTodo}
        className={'todo-add-button'}
        disabled={!inputText.trim()}
        style={{ marginLeft: 10 }}
      >
        add
      </Button>
    </>
  )
}

export default TodoGenerator;