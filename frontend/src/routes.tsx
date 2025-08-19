import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        element: <Layout />,
        children: [
            {
                path: '/montagem',
                // element: componente
            },
            {
                path: '/educação',
                // element: componente
            },
            {
                path: '/forum',
                // element: componente
            },
            {
                path: '/catalogo',
                // element: componente
            },
            {
                path: '/Promoções',
                // element: componente
            },
            {
                path: '/Sobre',
                // element: componente
            },
            /*
                Caso tenha mais paginas, rederizar acima da not found.
            */
            {
                path: '*',
                // element: Pagina não encontrada
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
])