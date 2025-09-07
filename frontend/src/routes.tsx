import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Community from './pages/Community/Community';
import Montagem from './pages/Montagem/Montagem';
import NotFound from './pages/NotFound/NotFound';

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
                element: <Montagem />
            },
            {
                path: '/community',
                element: <Community />
            },
            {
                path: '/catalogo',
                element: <NotFound />
            },
            {
                path: '/Promoções',
                element: <NotFound />
            },
            {
                path: '/Sobre',
                element: <NotFound />
            },
            {
                path: '*',
                element: <NotFound />,
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
])