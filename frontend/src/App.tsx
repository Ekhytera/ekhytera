import { router } from "./routes";
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { PostsProvider } from "./contexts/PostsContext.tsx";
import { ToastContainer } from 'react-toastify';


declare module '*.css';

function App() {

  return (
    <>
      <AuthProvider>
        <PostsProvider>
          <>
            <RouterProvider router={router} />
            <ToastContainer />
          </>
        </PostsProvider>
      </AuthProvider>
    </>
  )
}

export default App
