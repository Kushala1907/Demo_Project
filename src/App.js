
import './App.css';
//import createBrowserRouter
import { createBrowserRouter,RouterProvider } from "react-router-dom";
//import components
import RootLayout from './components/rootlayout/RootLayout';
import ErrorPage from './components/errorpage/ErrorPage';
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import AddImage from "./components/user/AddImage";

function App() {
  //create BrowserRouter Object
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      // Connecting Error Page
      errorElement: <ErrorPage />,
      // Connecting Children
      children: [
        { path: "/", element: <Home /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "add-image", element: <AddImage /> },
      ],
    },
  ]);

  return (
    <div>
      {/* Provide to app react-route-dom provieds RouterProvider */}
      <RouterProvider router={browserRouterObj} />{" "}
    </div>
  );
}

export default App;
