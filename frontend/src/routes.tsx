import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Montagem } from './pages/Montagem';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/montagem',
                // element: componente
            },
            {
                path: '/community',
                element: <Community />
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
    },
    {
        path: '/montagem',
        element: <Montagem />
    }
])