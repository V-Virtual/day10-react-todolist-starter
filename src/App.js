import { useReducer } from "react";
import './App.css';
import TodoList from "./components/TodoList";
import { initialState, todoReducer } from "./reducers/todoReducer";
import { TodoContext } from "./contexts/TodoContext";
import {
  createBrowserRouter,
  RouterProvider,
  useParams
} from 'react-router';
import DefaultLayout from './_layout/Layout';

function ErrorPate () {
  return <h1>Error Page</h1>;
}

function TodoDetail () {
  const {key} = useParams();
  console.log(key);
  return <h1>This is : {key} Detail</h1>;
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
