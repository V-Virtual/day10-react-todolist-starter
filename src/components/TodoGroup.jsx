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
import TodoEdit from './TodoEdit';
import {
  DeleteOutlined,
  EditOutlined,
  FolderViewOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { Button, Tooltip } from 'antd';

const TodoGroup = () => {
  const {state, dispatch} = useContext(TodoContext);
  const [inputText, setInputText] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const navigate = useNavigate();


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

  function editTodo (id, e) {
    e.stopPropagation();
    const todoToEdit = state.find(todo => todo.id === id);
    setEditingTodo(todoToEdit);
    setEditModalVisible(true);
  }

  function viewTodo(id, e) {
    e.stopPropagation();
    navigate(`/todos/${id}`);
  }

  function handleEditFinish (values) {
    if (editingTodo) {
      const action = {
        type: 'EDIT',
        id: editingTodo.id,
        text: values.text,
        done: values.done
      };
      dispatch(action);

      const updatedTodo = {
        ...editingTodo,
        text: values.text,
        done: values.done
      };
      updateTodos(editingTodo.id, updatedTodo).then(r => console.log(r.data));
    }
    setEditModalVisible(false);
    setEditingTodo(null);
  }

  function handleEditCancel () {
    setEditModalVisible(false);
    setEditingTodo(null);
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
              <Tooltip title="查看详情">
                <Button
                  type="default"
                  icon={<FolderViewOutlined />}
                  onClick={(e) => viewTodo(id, e)}
                  style={{ marginLeft: 10 }}
                />
              </Tooltip>
              <Tooltip title="编辑">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={(e) => editTodo(id, e)}
                  style={{ marginLeft: 10 }}
                />
              </Tooltip>
              <Tooltip title="删除">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => deleteTodo(id, e)}
                  style={{ marginLeft: 10 }}
                />
              </Tooltip>
            </div>
          )
        })
      }
      <TodoGenerator/>

      <TodoEdit
        visible={editModalVisible}
        onCancel={handleEditCancel}
        onFinish={handleEditFinish}
        initialValues={editingTodo}
      />
    </div>
  );
}

export default TodoGroup;