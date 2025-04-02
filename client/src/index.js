import React from 'react';
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from "./views/Signup.js"
import Login from "./views/Login.js"
import Home from "./views/Home.js"
import NotFound from './views/NotFound.js';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router=createBrowserRouter([
{
  path:"/",
  element:<Home/>
},
{
  path:"/login",
  element:<Login/>
},
{
  path:"/signup",
  element:<Signup/>
},
{
  path:"/*",
  element:<NotFound/>
}
])
root.render(
  <>
 <RouterProvider router={router}/>
  </>
);


