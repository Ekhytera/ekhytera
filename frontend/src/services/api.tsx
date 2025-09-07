import axios from 'axios';
// import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.data.status === 401) {
            if(localStorage.getItem('token')){
                // toast.error('Sua seção expirou. Faça login novamente', {
                //     autoClose: 1500,
                //     position: "top-center",
                //     hideProgressBar: true,
                //     theme: 'dark'
                // })
                console.log("Sua seção expirou. Faça login novamente")
            }
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
)

export default api