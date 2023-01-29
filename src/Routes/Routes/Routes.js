import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Data from "../../Pages/Data/Data";
import Login from "../../Pages/Login/Login";
import Registration from "../../Pages/Registration/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Data></Data>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
