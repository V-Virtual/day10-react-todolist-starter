import { useReducer } from "react";
import './App.css';
import TodoList from "./components/TodoList";
import { initialState, todoReducer } from "./reducers/todoReducer";
import { TodoContext } from "./contexts/TodoContext";
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider
} from 'react-router';

function DefaultLayout() {
  return <>
    <header>
      <nav>
        <ul>
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li><NavLink to={'/todos'}>Todo List</NavLink></li>
          <li><NavLink to={'/about'}>About</NavLink></li>
        </ul>
      </nav>
    </header>
    <main>
      <Outlet></Outlet>
    </main>
    <footer>footer copyright</footer>
  </>
}

function ErrorPate () {
  return <h1>Error Page</h1>;
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
