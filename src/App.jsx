import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import LogIn from "./components/Login/Login";
import ErrorPage from "./ErrorPage";
import Signin from "./components/Signin/Signin";
import Main from "./components/Main/Main";
import Events from "./components/Events/Events";
import { GetAllEventsLoader } from "./components/Events/GetAllEventsLoader";
import AddEvent from "./components/AddEvent/AddEvent";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LogIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Signin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/events",
    element: <Events />,
    loader: GetAllEventsLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/addevent",
    element: <AddEvent />,
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
