import { router } from "./routes";
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ToastContainer } from 'react-toastify';


declare module '*.css';

function App() {

  return (
    <>
      <AuthProvider>
        <>
          <RouterProvider router={router} />

          <ToastContainer />
        </>
      </AuthProvider>
    </>
  )
}

export default App
