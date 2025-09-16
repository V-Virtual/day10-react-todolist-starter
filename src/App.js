import { useReducer, useContext } from "react";
import './App.css';
import TodoList from "./components/TodoList";
import { initialState, todoReducer } from "./reducers/todoReducer";
import { TodoContext } from "./contexts/TodoContext";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
  useNavigate
} from 'react-router';
import DefaultLayout from './_layout/Layout';
import DonePage from "./components/DonePage";
import axios from 'axios';
import { Descriptions, Card, Empty, Button } from "antd";

function ErrorPate () {
  return <h1>Error Page</h1>;
}

function TodoDetail () {
  const { key } = useParams();
  const { state } = useContext(TodoContext);
  const navigate = useNavigate();
  const todo = state.find(t => String(t.id) === String(key));

  if (!todo) {
    return <Empty description="未找到该任务" style={{margin: '40px auto', width: 400}} />;
  }

  return (
    <Card title="Todo Details" style={{ maxWidth: 600, margin: '40px auto' }}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="ID">{todo.id}</Descriptions.Item>
        <Descriptions.Item label="Text">{todo.text}</Descriptions.Item>
        <Descriptions.Item label="Status">{todo.done ? '已完成' : '未完成'}</Descriptions.Item>
      </Descriptions>
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Button type="default" onClick={() => navigate('/todos')}>
          返回
        </Button>
      </div>
    </Card>
  );
}

const routes = [
  {
    path: '/',
    element: <DefaultLayout/>,
    errorElement: <ErrorPate/>,
    children: [{
      path: '',
      element: <h1>Home Page</h1>,
    }, {
      path: 'todos',
      element: <TodoList/>,
    }, {
      path: 'todos/:key',
      element: <TodoDetail/>,
    }, {
      path: 'about',
      element: <h1>About Us</h1>,
    }, {
      path: 'done',
      element: <DonePage/>,
    }]
  }
]

const router = createBrowserRouter(routes);

function App () {
  // the Hooks API manage component data state
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const value = {state, dispatch};
  return (
    <div className="App">
      <TodoContext.Provider value={value}>
        <RouterProvider router={router}></RouterProvider>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
