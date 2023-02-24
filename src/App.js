import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import Cart from './components/Cart';
import { Provider } from 'react-redux';
import { store } from './store';
import Sidebar from './components/Sidebar';
import UserContext from './UserContext';
import { useState } from 'react';
import ThemeContext from './components/ThemeContext';


function App() {
  const [theme, setTheme] = useState("light")
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/cart",
      element: <Cart/>,
    },
  ]);

  const cartrouter = createBrowserRouter([
    {
      path: "/cart",
      element: <Cart/>,
    },
  ]);
  
  return (
    <>
    <ThemeContext.Provider value={{
      theme:theme,
      setTheme: setTheme
    }} >
    <Provider store={store}>
    {/* <RouterProvider cartrouter={cartrouter} /> */}
    {/* <Header/> */}
    {/* <div className="grid grid-cols-5">
    <div className=" col-span-1">
    <Sidebar/>
    </div>
    <div className=" col-span-4"> */}
    <RouterProvider router={router} />
   
    {/* </div>
    </div>
     */}
    
    </Provider>
    </ThemeContext.Provider>
    </>
  );
}

export default App;
