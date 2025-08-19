import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import logo from '../../assets/EK.png';
import background from '../../assets/ekhytera_background_pattern1.png';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";


const schema = z.object({
    email: z.string().email('Insira um email valido').nonempty('O campo email é obrigatório'),
    name: z.string()
        .trim()
        .nonempty('O campo nome é obrigatótio')
        .regex(/^\S+$/, "Não pode conter espaços"),
    password: z.string()
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

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });
    const [viewPassword, setViewPassword] = useState(false);
    const [nameError, setNameError] = useState('');

    async function onSubmit(data: FormData) {
        try {
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="flex">
                <section className="flex flex-col items-center justify-center bg-zinc-900 w-full lg:w-1/2 h-screen">
                    <img src={logo} alt="logo" className="w-40 mx-auto" />

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
                                <label htmlFor="email" className="block font-medium text-gray-100 text-xl">
                                    Nome de usuario
                                </label>
                                <div className="mt-2">
                                    <Input
                                        name="name"
                                        type="text"
                                        placeholder="exemplo123"
                                        error={errors.name?.message || nameError}
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
                                        name="password"
                                        type={viewPassword ? 'text' : 'password'}
                                        placeholder="********"
                                        error={errors.password?.message}
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