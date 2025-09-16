import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from "react";
import api from "../../services/api";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { useAuth } from "../../contexts/AuthContext";
import { FaCheck } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface ConfigProps {
    setConfigIsOpen: (value: boolean) => void;
}

const schema = z.object({
    email: z.string()
        .email('Insira um email valido')
        .nonempty('O campo email é obrigatório'),
    nome_usuario: z.string()
        .trim()
        .nonempty('O campo nome é obrigatótio')
        .regex(/^\S+$/, "Não pode conter espaços")
        .min(3, 'O nome deve conter no mínimo 3 caracteres')
        .max(20, 'O nome deve conter no maximo 20 caracteres')
});

type FormData = z.infer<typeof schema>

function Config({ setConfigIsOpen }: ConfigProps) {

    const { auth, setAuth, getUser } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            email: auth!.email || "",
            nome_usuario: auth!.nome_usuario || ""
        }
    });

    const [errorInputName, setErrorInputName] = useState('');
    const [viewDeleteCount, setViewDeleteCount] = useState(false);
    const [inputSenha, setInputSenha] = useState('');
    const [inputSenhaError, setInputSenhaError] = useState('');

    const watchedUsername = watch('nome_usuario');

    async function handleVerifyName(username: string) {
        if (!username || username.trim() === '') {
            setErrorInputName('');
            return;
        }

        try {
            if (username === auth?.nome_usuario) {
                setErrorInputName('');
                return
            }

            const req = await api.get(`/usuarios/userName/${username}`);

            if (req.data.error) {
                setErrorInputName(req.data.message);
            } else {
                setErrorInputName('');
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setErrorInputName('');
        }
    }

    async function onSubmit(data: FormData) {
        try {
            const req = await api.patch('/update-user', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!req.data.ok) {
                throw new Error("falha ao atualizar o nome")
            }

            getUser();
            toast.success("Nome alterado com sucesso", {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });

        } catch (error) {
            reset({
                nome_usuario: auth?.nome_usuario || "",
                email: auth?.email || ""
            });
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response.data.message, {
                    position: "bottom-right",
                    autoClose: 4000,
                    pauseOnHover: false,
                    theme: 'dark'
                });
            } else {
                toast.error("Erro! Tente novamente", {
                    position: "bottom-right",
                    autoClose: 4000,
                    pauseOnHover: false,
                    theme: 'dark'
                });
            }
        }
    }

    function handleLogout() {
        setAuth(null);
        localStorage.removeItem('token');
        navigate('/');
    }

    async function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        try {
            const req = await api.delete('delete-user', {
                data: { senha: inputSenha },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!req.data.ok) {
                throw new Error("falha ao deletar a conta")
            }

            setAuth(null);
            localStorage.removeItem('token');

            navigate('/');
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                setInputSenhaError(error.response.data.message || 'Erro no servidor');
            } else {
                setInputSenhaError('Erro de conexão. Tente novamente.');
            }
        }
    }

    function handleLogoutConfirmation() {
        const confirmToast = () => (
            <div className="flex flex-col gap-3">
                <span>Tem certeza que deseja sair da conta?</span>
                <div className="flex gap-2 justify-end">
                    <button
                        className="bg-gray-600 px-3 py-1 rounded text-white hover:bg-gray-700 transition-colors"
                        onClick={() => toast.dismiss()}
                    >
                        Não
                    </button>
                    <button
                        className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 transition-colors"
                        onClick={() => {
                            handleLogout();
                            toast.dismiss();
                        }}
                    >
                        Sim
                    </button>
                </div>
            </div>
        );

        toast(confirmToast, {
            position: "top-center",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            theme: 'dark',
            className: 'bg-zinc-800 text-white'
        });
    }

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

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center z-50 fixed inset-0 bg-black/50" onClick={() => {
                setConfigIsOpen(false)
            }}>
                <div className="bg-zinc-900 w-full max-w-md p-5 mx-auto rounded-xl flex flex-col relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="text-xl px-2 cursor-pointer rounded-sm hover:scale-110 hover:bg-zinc-700 duration-200 text-white w-fit absolute right-5 top-3 z-20"
                        onClick={() => setConfigIsOpen(false)}
                    >X</button>
                    <div className="text-white flex items-center text-xl font-semibold mb-5 border-b-1">
                        <IoSettingsOutline className="mr-2" />Configurações
                    </div>

                    <h2 className="text-white mb-3">Informações</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        <div className="pointer-events-none flex items-center relative opacity-60">
                            <Input
                                name="email"
                                type="email"
                                placeholder="exemplo@gmail.com"
                                error={errors.email?.message}
                                register={register}
                            />

                            <CiLock size={20} className="text-gray-400 absolute right-2" />

                        </div>
                        <div className="items-center">
                            <Input
                                name="nome_usuario"
                                type="text"
                                placeholder="exemplo123"
                                error={errors.nome_usuario?.message || errorInputName}
                                register={register}
                            />
                            {auth?.nome_usuario !== watchedUsername &&
                                <div className="flex justify-start text-white font-bold m-1 gap-2 duration-200 transition-all flex-row-reverse">
                                    <button className="text-xl bg-blue-700 px-1 cursor-pointer rounded-sm hover:scale-105 hover:bg-blue-600 duration-200">
                                        < FaCheck />
                                    </button>
                                    <button className="text-xl bg-zinc-700 px-2 cursor-pointer rounded-sm hover:scale-110 hover:bg-zinc-600 duration-200"
                                        onClick={() => {
                                            reset({ nome_usuario: auth?.nome_usuario || "" });
                                            setErrorInputName('');
                                        }}
                                    >
                                        X
                                    </button>
                                </div>}
                        </div>
                    </form>

                    <button className="flex items-center text-white mt-5 hover:bg-zinc-700 w-full py-2 px-2 rounded-md cursor-pointer"
                        onClick={handleLogoutConfirmation}
                    >
                        <CiLogout className="mr-2" size={20} />
                        Sair da conta
                    </button>

                    <hr className="block mt-2 text-gray-500" />

                    {!viewDeleteCount ?
                        <div className="flex justify-end">
                            <button className="text-red-600 flex items-center mt-10 cursor-pointer hover:scale-105 hover:text-red-800 duration-200 w-fit"
                                onClick={() => setViewDeleteCount(true)}
                            >
                                Apagar conta
                                < ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                        :
                        <div>
                            <button className="text-white flex items-center mt-5 hover:opacity-60 hover:scale-105 duration-200 cursor-pointer"
                                onClick={() => setViewDeleteCount(false)}
                            >
                                < IoIosArrowRoundBack size={25} className="mt-1" />
                                Voltar
                            </button>

                            <span className="mt-5 text-red-600">Digite <span className="font-bold">sua senha</span> para confirmar</span>

                            <form onSubmit={handleDelete}>
                                <div className="flex items-center justify-center">
                                    <input
                                        type="password"
                                        placeholder="********"
                                        className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600"
                                        onChange={(e) => setInputSenha(e.target.value)}
                                    />

                                    <button
                                        type="submit"
                                        className="flex items-center rounded-md text-white mx-1 mt-2 px-2 bg-red-600 h-10 cursor-pointer hover:scale-105 hover:bg-red-700">
                                        < FaCheck />
                                    </button>

                                </div>
                                {inputSenhaError && <span className="text-red-600">* {inputSenhaError}</span>}

                            </form>
                        </div>
                    }


                </div>
            </div>
        </>
    )
}

export default Config