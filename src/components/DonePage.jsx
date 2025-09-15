import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import '../components/TodoList.css';

const DonePage = () => {
  const { state } = useContext(TodoContext);
  const doneTodos = state.filter(todo => todo.done);

  return (
    <div className="todo-group">
      <div className="todo-title">Done List</div>
      {doneTodos.length === 0 ? (
        <div className="todo-empty-info">No Done List</div>
      ) : (
        doneTodos.map(({ id, text }) => (
          <div key={id} className="todo-row">
            <div className="todo-item done">{text}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default DonePage;

