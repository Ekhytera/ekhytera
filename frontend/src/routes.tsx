import { createBrowserRouter, ScrollRestoration } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Community from './pages/Community/Community';
import Montagem from './pages/Montagem/Montagem';
import NotFound from './pages/NotFound/NotFound';
import Perfil from './pages/Perfil/Perfil';
import Catalog from './pages/Catalog/Catalog';
import Promotions from './pages/Promotions/Promotions';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions/TermsConditions';

export const router = createBrowserRouter([
    {
        element: (
            <>
                <Layout />
                <ScrollRestoration />
            </>
        ),
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
                element: <Catalog />
            },
            {
                path: '/promocoes',
                element: <Promotions />
            },
            {
                path: '/Sobre',
                element: <NotFound />
            },
            {
                path: '/Perfil/:userName',
                element: <Perfil />
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path: '/terms-conditions',
                element: <TermsConditions />
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