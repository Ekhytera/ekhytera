import { router } from "./routes"
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx'

declare module '*.css';

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
