import { router } from "./routes"
import { RouterProvider } from 'react-router-dom';

declare module '*.css';

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
