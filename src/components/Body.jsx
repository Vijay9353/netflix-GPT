import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage'

export const Body = () => {


  
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />
    },
    { 
      path: "/browse",
      element: <Browse />,
      // errorElement: <ErrorPage />
    }
  ]);

return (
  <div>
    <RouterProvider router={appRouter} />
  </div>
)
}
