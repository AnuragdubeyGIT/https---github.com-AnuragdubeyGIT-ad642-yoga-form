import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from 'react-router-dom';

// pages
import Register from './Pages/Register/Register';
import UserRegister from './Pages/UserRegister/UserRegister';
import Login from './Pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Success from './Pages/Success/Success';



const App = () => 
{
  const {user} = useSelector((state) => state.user);

  const Layout = () => {
    return (
      <Outlet />
    )
  };

  const ProtectRouter = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return user ? children : <p>Loading</p>
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRouter>
          <Layout />
        </ProtectRouter>
      ),
      children: [
        {
          path: "/",
          element: <Register />,
        },
        {
          path:"/success/:id",
          element:<Success />
        }
      ]
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: '/register',
      element: <UserRegister />
    }
  ])
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
