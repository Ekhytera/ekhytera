import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import background from '../../assets/ekhytera_background_pattern1.png';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AxiosError } from "axios";


const schema = z.object({
    email: z.string().email('Insira um email valido').nonempty('O campo email é obrigatório'),
    nome_usuario: z.string()
        .trim()
        .nonempty('O campo nome é obrigatótio')
        .regex(/^\S+$/, "Não pode conter espaços"),
    senha: z.string()
        .nonempty('O campo senha é obrigatótio')
        .min(6, "A senha deve conter no mínimo 6 caracteres")
        .refine((val) => !/123456|234567|345678|012345/.test(val), {
            message: "Evite sequências numéricas simples"
        })
        .refine((val) => /[a-z]/.test(val), {
            message: "A senha deve conter pelo menos uma letra minúscula"
        })
        .refine((val) => /[A-Z]/.test(val), {
            message: "A senha deve conter pelo menos uma letra maiúscula"
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "A senha deve conter pelo menos um número"
        })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
            message: "A senha deve conter pelo menos um caractere especial"
        })
        .refine((val) => !/^(.)\1+$/.test(val), {
            message: "A senha não pode ter todos os caracteres iguais (ex: 11111111)"
        })
});

type FormData = z.infer<typeof schema>

function Register() {

    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });
    const [viewPassword, setViewPassword] = useState(false);
    const [msgErro, setMsgErro] = useState('');
    const [errorInputName, setErrorInputName] = useState('');
    const navigate = useNavigate();

    const watchedUsername = watch('nome_usuario');

    async function handleVerifyName(username: string) {
        if (!username || username.trim() === '') {
            setErrorInputName('');
            return;
        }

        try {
            const req = await api.get(`/usuarios/userName/${username}`);

            if (req.data.error) {
                setErrorInputName(req.data.message);
            } else {
                setErrorInputName('');
            }
        } catch (error) {
            setErrorInputName('');
        }
    }

    useEffect(() => {
        // TODO: caso o usuario entre na pagina, efetuar o logout
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (watchedUsername) {
                handleVerifyName(watchedUsername);
            } else {
                setErrorInputName('');
            }
        }, 700);

        return () => clearTimeout(delay);
    }, [watchedUsername])

    async function onSubmit(data: FormData) {
        try {
            await api.post('/cadastrar', data);

            navigate('/login', { replace: true });
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                setMsgErro(error.response.data.message || 'Erro no servidor');
            } else {
                setMsgErro('Erro de conexão. Tente novamente.');
            }
        }
    }

    return (
        <>
            <div className="flex">
                <section className="flex flex-col items-center justify-center bg-zinc-900 w-full lg:w-1/2 h-screen">
                    <svg width="160" height="140" viewBox="0 0 202 110" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto"
                    >
                        <path d="M133.769 29.1158L116.015 45.5173C115.951 30.7051 115.908 15.8929 115.844 1.05957C121.769 1.05957 127.695 1.05957 133.62 1.08076C133.663 10.4258 133.727 19.7708 133.769 29.0946V29.1158Z" fill="white" stroke="white" stroke-miterlimit="10" />
                        <path d="M109.556 1.05957V22.6315H22.7638V87.3474H73.4495C65.7763 94.4462 58.0818 101.545 50.4086 108.665C33.9538 108.75 17.5204 108.835 1.06567 108.919V1.05957H109.556ZM94.9984 65.7754H35.318V41.5123H94.9984V65.7754Z" fill="white" stroke="white" stroke-miterlimit="10" />
                        <path d="M169.748 1.52578C148.434 22.3984 127.098 43.2923 105.784 64.165C90.6504 78.9983 75.4958 93.8105 60.3625 108.644C69.9754 108.601 79.5882 108.559 89.201 108.517C125.691 72.7895 162.203 37.0835 198.714 1.37744C189.059 1.41982 179.404 1.48339 169.748 1.52578Z" fill="white" stroke="white" stroke-miterlimit="10" />
                        <path d="M142.231 68.6361C146.835 63.7834 151.418 58.9308 156.022 54.0994C167.723 72.2808 179.446 90.4623 191.148 108.623C183.155 108.58 175.162 108.517 167.148 108.474C158.835 95.1878 150.523 81.9225 142.231 68.6361Z" fill="white" stroke="white" stroke-miterlimit="10" />
                    </svg>

                    <div className="mt-10 w-full sm:mx-auto sm:max-w-md">
                        <form className="space-y-6 mx-5" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="block font-medium text-gray-100 text-xl">
                                    Endereço de Email
                                </label>
                                <div className="mt-2">
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="exemplo@gmail.com"
                                        error={errors.email?.message}
                                        register={register}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="nome_usuario" className="block font-medium text-gray-100 text-xl">
                                    Nome de usuario
                                </label>
                                <div className="mt-2">
                                    <Input
                                        name="nome_usuario"
                                        type="text"
                                        placeholder="exemplo123"
                                        error={errors.nome_usuario?.message || errorInputName}
                                        register={register}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block font-medium text-gray-100 text-xl">
                                        Senha
                                    </label>
                                </div>
                                <div className="mt-2 relative">
                                    <Input
                                        name="senha"
                                        type={viewPassword ? 'text' : 'password'}
                                        placeholder="********"
                                        error={errors.senha?.message}
                                        register={register}
                                    />
                                    <button
                                        type="button"
                                        className="cursor-pointer absolute right-2 top-2 text-gray-400"
                                        onClick={() => setViewPassword(!viewPassword)}
                                    >
                                        {
                                            !viewPassword ?
                                                <FaEye size={25} />
                                                :
                                                <FaEyeSlash size={25} />
                                        }
                                    </button>
                                </div>
                            </div>

                            {msgErro && <p className="text-red-600">* {msgErro}</p>}

                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 
                                    bg-gradient-to-r from-blue-600 via-blue-400 to-blue-900
                                    rounded-md font-semibold text-white cursor-pointer gradient-animate"
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-center text-gray-400">
                            Já tem conta?{' '}
                            <Link to={'/login'} className="font-semibold text-blue-600 hover:text-blue-800">
                                Login
                            </Link>
                        </p>
                    </div>
                </section>

                <section className="bg-gray-900 w-1/2 h-screen hidden lg:block relative">
                    <img src={background} alt="background" className="absolute inset-0 w-full h-full" />

                    <div className="relative z-10 w-full flex flex-col h-full justify-center bg-gray-900/70 backdrop-blur-md gap-2">
                        <div className="mx-5">
                            <h1 className="text-white font-black text-4xl">BEM VINDO AO EKHYTERA</h1>
                        </div>
                        <div className="mx-5 text-xl text-gray-300">
                            Primeiro site do Brasil a recomendar hardware{' '}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Register