import {
  NavLink,
  Outlet
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

export default DefaultLayout