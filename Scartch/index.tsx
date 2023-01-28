import { Suspense } from "react"
import * as ReactDOM from "react-dom/client"
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom"

import App from "./App"
import CardDetails from "./src/components/CardDetails"
import Footer from "./src/components/Footer"
import Header from "./src/components/Header"

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/", // parentPath/{path} => localhost:1244/about
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <App />
          </Suspense>
        ),
        // children: [
        //   {
        //     path: "profile", // parentPath/{path} => localhost:1244/about/profile
        //     element: <Profile />,
        //   },
        // ],
      },
      {
        path: "/restaurent/:id", // parentPath/{path} => localhost:1244/about
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <CardDetails />
          </Suspense>
        ),
        // children: [
        //   {
        //     path: "profile", // parentPath/{path} => localhost:1244/about/profile
        //     element: <Profile />,
        //   },
        // ],
      },
    ],
  },
])
const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(<RouterProvider router={appRouter} />)
