import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { IoSettingsOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import ContentCard from "../../components/ContentCard/ContentCard";
import Config from "../../components/ConfigModal/Config";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

function Perfil() {

    const { auth } = useAuth();
    const banner = 'https://www.womantowomanmentoring.org/wp-content/uploads/placeholder.jpg';
    const foto = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
    const [configIsOpen, setConfigIsOpen] = useState(false);
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        setDescricao(auth?.descricao || "");
    }, [auth?.descricao]);

    const educationalContent = [
        {
            title: "Como escolher fonte de alimentação",
            type: "Guia",
            difficulty: "Iniciante"
        },
        {
            title: "Overclock seguro para iniciantes",
            type: "Tutorial",
            difficulty: "Intermediário"
        },
        {
            title: "Refrigeração líquida vs ar",
            type: "Comparativo",
            difficulty: "Avançado"
        }
    ];

    const formatarData = (dataString?: string | Date) => {
        if (!dataString) return "";
        const date = typeof dataString === "string" ? new Date(dataString) : dataString;
        return date.toLocaleDateString('pt-BR');
    };

    async function handleUpdateDescription(descricao: string) {

        if (descricao === auth?.descricao) return;

        descricao = descricao.replace(/^[\s\n\r]+|[\s\n\r]+$/g, '');

        try {
            const req = await api.patch('update-user', { descricao }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!req.data.ok) {
                throw new Error("Falha ao atualizar descrição")
            }

            setDescricao(descricao);

            toast.success("Sua descrição foi salva", {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            })
            
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setDescricao(auth?.descricao || '');
            toast.error(`Erro ao salvar, tente novamente.`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });
        }


    }

    return (
        <div className="min-h-screen bg-gray-950 pt-25 pb-12">
            {configIsOpen && <Config setConfigIsOpen={setConfigIsOpen} />}
            <main className="w-full max-w-6xl mx-auto mb-5 bg-gray-900/50 border-2 border-gray-900 rounded-md backdrop-blur-2xl">
                <section className="flex items-center relative">
                    <button className="bg-gray-900 rounded-md px-2 py-1 absolute top-2 left-5 hover:text-[#79A7DD] text-[#E0E1DD] transition-colors duration-200 flex items-center">
                        <GoPencil size={20} className="mr-2" />
                        Editar
                    </button>

                    <img src={banner} alt="banner" className="w-full h-45 object-cover rounded-t-lg" />

                    <img src={foto || auth?.endereco_imagem} alt="foto de perfil do usuario" className="w-30 h-30 xl:w-40 xl:h-40 rounded-full absolute left-10 -bottom-10 border-gray-900 border-2" />
                </section>

                <div className="flex flex-col md:flex-row w-full mt-15 px-5 gap-8">
                    <section className="flex flex-col flex-2 w-full">
                        <div className="w-full">
                            <div className="flex items-center flex-wrap justify-between">
                                <h1 className="text-2xl text-white font-semibold">{auth?.nome_usuario}</h1>
                                <p className="text-gray-300">Entrou em: {formatarData(auth?.criado_em)}</p>
                            </div>
                            <p className="text-gray-300">{auth?.email}</p>
                        </div>

                        <div className="mt-5 flex flex-col gap-2">
                            <label className="text-white">Descrição </label>
                            <textarea
                                placeholder="Adicione uma descrição para o seu perfil..."
                                className="block w-full h-30 rounded-md bg-white/5 px-3 py-2 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 resize-none scroll-profile"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                onBlur={(e) => handleUpdateDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mt-5 md:mt-auto">
                            <button
                                onClick={() => setConfigIsOpen(true)}
                                className="text-gray-300 flex items-center cursor-pointer hover:text-gray-400 hover:underline underline-offset-4 duration-200"
                            >
                                <IoSettingsOutline className="mr-2" />
                                Configurações
                            </button>
                        </div>
                    </section>

                    <hr className="block md:hidden text-gray-500" />

                    <section className="flex h-full max-h-80 overflow-y-auto flex-col flex-1 w-full gap-4 scroll-profile">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <ContentCard title="Conteúdos Salvos" nameButton="Ver Todos" contentList={educationalContent} />
                        </div>
                    </section>
                </div>

                <hr className="m-5 text-gray-500" />

                <section className="px-5 pb-5">
                    <h1 className="text-2xl text-white font-semibold">Histórico de montagem</h1>

                    <p className="text-gray-300 mt-5">Nenhuma montagem foi realizada</p>

                    <Link
                        to={'/montagem'}
                        className="text-[#79A7DD] hover:text-[#E0E1DD] transition-colors duration-200 underline underline-offset-4 flex items-center"
                    >
                        Faça sua primeira montagem
                        <ChevronRightIcon className="w-4 h-4" />
                    </Link>
                </section>

            </main>
        </div>
    )
}

export default Perfil