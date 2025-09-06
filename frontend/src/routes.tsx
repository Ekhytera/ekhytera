import { createBrowserRouter } from 'react-router-dom'

import Layout from './components/Layout/Layout';

import Home from './pages/Home/Home';
import Community from './pages/Community/Community';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

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
    }
])