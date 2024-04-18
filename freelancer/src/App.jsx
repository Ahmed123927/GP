import React from "react";
import ReactDOM from "react-dom";
import Navbar from './Components/navbar/Navbar';
import Footer from "./Components/footer/Footer";
import Home from "./Pages/Home/home";
import Posts from "./Pages/Posts/posts";
import Chat from "./Pages/chat/Chat";
import { ChakraProvider } from '@chakra-ui/react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Post from "./Pages/post/Post";
import Profile from "./Pages/profile/Profile";
import PostDetails from "./Components/postDetails/PostDetails";
import ClientHome from "./Pages/clientHome/ClientHome";
import AddPost from "./Pages/addPost/AddPost";
import RoleRegister from "./Pages/roleRegister/RoleRegister";
import Register from "./Pages/register/Register";
import LoginPage from "./Pages/loginPage/LoginPage";

ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        
        {
          path: "/freelancer",
          element: <Home />,
        },
        {
          path: "/posts",
          element: <Posts />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/chat",
          element: <Chat />,
        },
        {
          path: "/showPost",
          element: <Post />,
        },
        {
          path: "/postDetails",
          element: <PostDetails />,
        },
        {
          path: "/client",
          element: <ClientHome />,
        },
        {
          path: "/addPost",
          element: <AddPost/>,
        },
      ],
    },
    {
      path: "/role", 
      element: <RoleRegister/>,
    },
    {
      path: "/register", 
      element: <Register/>,
    },
    
  ]);
  
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
