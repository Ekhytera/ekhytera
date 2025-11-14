import axios from 'axios';
import { toast } from 'react-toastify';

// determina o host e a porta do servidor baseado no ambiente (produção ou desenvolvimento)
const isProduction = import.meta.env.MODE === 'production'; // vite configura essa variável automaticamente
const protocol = isProduction ? 'https' : 'http';

const api = axios.create({
    baseURL: `${protocol}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.data.status === 401) {
            if(localStorage.getItem('token')){
                toast.error('Sua sessão expirou. Faça login novamente', {
                    autoClose: 1500,
                    position: "top-center",
                    hideProgressBar: true,
                    theme: 'dark'
                });
            }
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
)

export default api