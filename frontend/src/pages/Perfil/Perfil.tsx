import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { IoSettingsOutline } from "react-icons/io5";
import ContentCard from "../../components/ContentCard/ContentCard";
import Config from "../../components/ConfigModal/Config";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import EditImageMenu from "../../components/EditImageMenu/EditImageMenu";
import { useParams } from "react-router-dom";
import { type User } from "../../types";

function Perfil() {

    const { auth, getUser } = useAuth();
    const { userName } = useParams();
    const banner = 'https://www.womantowomanmentoring.org/wp-content/uploads/placeholder.jpg';
    const foto = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
    const [configIsOpen, setConfigIsOpen] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [profile, setProfile] = useState<User>();
    const [visitor, setvisitor] = useState(false);

    useEffect(() => {
        setDescricao(auth?.descricao || "");
    }, [auth?.descricao]);

    useEffect(() => {
        if (userName === auth?.nome_usuario) {
            console.log("Meu perfil");
            setvisitor(false);
            setProfile(undefined);
        } else {
            console.log("Perfil de outro usuario");
            setvisitor(true);
            getUserProfile();
        }
    }, [userName]);

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

    async function getUserProfile() {
        try {
            const req = await api.get(`usuarios/info/${userName}`);

            if (!req.data.ok) {
                throw new Error("Falha ao buscar usuario")
            }

            setProfile(req.data.user);
        } catch (error) {
            console.log(error)
        }
    }

    const formatarData = (dataString?: string | Date) => {
        if (!dataString) return "";
        const date = typeof dataString === "string" ? new Date(dataString) : dataString;
        return date.toLocaleDateString('pt-BR');
    };

    async function handleUpdateDescription(descricao: string) {
        if (descricao === auth?.descricao) return;

        descricao = descricao.trim().replace(/(\r?\n){3,}/g, '\n\n\n');

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

    function formatedImage(file: File) {
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Formato de imagem não suportado. Use JPEG, PNG ou WebP.', { theme: 'dark' });
            return;
        }

        const formData = new FormData();
        formData.append('imagem', file);
        return formData;
    }

    async function handleEditBanner(file: File) {
        const data = formatedImage(file);

        try {
            const req = await api.patch('update-user?typeImage=banner', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": 'multipart/form-data'
                }
            });

            if (!req.data.ok) {
                throw new Error("Falha ao adicionar imagem")
            }

            toast.success(`Imagem adicionada com sucesso`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });

            getUser();

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error(`Falha ao adicionar imagem`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });
        }
    };

    async function handleEditProfile(file: File) {
        const data = formatedImage(file);

        try {
            const req = await api.patch('update-user?typeImage=perfil', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": 'multipart/form-data'
                }
            });

            if (!req.data.ok) {
                throw new Error("Falha ao adicionar imagem")
            }

            toast.success(`Imagem adicionada com sucesso`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });

            getUser();

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error(`Falha ao adicionar imagem`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });
        }
    };

    async function handleRemoveBanner() {

        if (!auth?.endereco_banner) return;

        try {
            const req = await api.patch('update-user?typeImage=banner', { endereco_banner: null }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": 'multipart/form-data'
                }
            });

            if (!req.data.ok) {
                throw new Error("Falha ao remover imagem")
            }

            toast.success(`Imagem removida com sucesso`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });

            getUser();

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error(`Falha ao remover imagem`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });
        }
    };

    async function handleRemoveProfile() {

        if (!auth?.endereco_imagem) return;

        try {
            const req = await api.patch('update-user?typeImage=perfil', { endereco_imagem: null }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": 'multipart/form-data'
                }
            });

            if (!req.data.ok) {
                throw new Error("Falha ao remover imagem")
            }

            toast.success(`Imagem removida com sucesso`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });

            getUser();

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error(`Falha ao remover imagem`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 pt-25 pb-12">
            {configIsOpen && <Config setConfigIsOpen={setConfigIsOpen} />}

            <main className="w-full max-w-6xl mx-auto mb-5 bg-gray-900/50 border-2 border-gray-900 rounded-md backdrop-blur-2xl">
                <section className="flex items-center relative">
                    {!visitor && <div className="absolute top-2 left-5 z-10">
                        <EditImageMenu
                            onEditBanner={handleEditBanner}
                            onEditProfile={handleEditProfile}
                            onRemoveBanner={handleRemoveBanner}
                            onRemoveProfile={handleRemoveProfile}
                        />
                    </div>}

                    <img src={!visitor ? auth?.endereco_banner || banner : profile?.endereco_banner || banner} alt="banner" className="w-full h-45 object-cover rounded-t-lg" />

                    <img src={!visitor ? auth?.endereco_imagem || foto : profile?.endereco_imagem || foto} alt="foto de perfil do usuario" className="w-30 h-30 xl:w-40 xl:h-40 rounded-full absolute left-10 -bottom-10 border-gray-900 border-2" />
                </section>

                <div className="flex flex-col md:flex-row w-full mt-15 px-5 gap-8">
                    <section className={!visitor ? "flex flex-col flex-2 w-full" : "w-full max-w-3xl"}>
                        <div className="w-full">
                            <div className="flex items-center flex-wrap justify-between">
                                <h1 className="text-2xl text-white font-semibold">
                                    {!visitor ?
                                        auth?.nome_usuario
                                        :
                                        profile?.nome_usuario
                                    }
                                </h1>
                                <p className="text-gray-300">Entrou em: 
                                    {!visitor ?
                                        formatarData(auth?.criado_em)
                                        :
                                        formatarData(profile?.criado_em)
                                    }</p>
                            </div>
                            {!visitor && <p className="text-gray-300">{auth?.email}</p>}
                        </div>

                        <div className="mt-5 flex flex-col gap-2">
                            <label className="text-white">Descrição </label>
                            {!visitor ? 
                            <textarea
                                placeholder="Adicione uma descrição para o seu perfil..."
                                className="block w-full h-30 rounded-md bg-white/5 px-3 py-2 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 resize-none scroll-profile"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                onBlur={(e) => handleUpdateDescription(e.target.value)}
                                maxLength={300}
                            ></textarea>
                            :
                            <p className="break-words whitespace-pre-line w-full text-gray-300 border-l-2 pl-2 py-2 scroll-profile text-justify">{profile?.descricao || "Sem descrição"}</p>
                        }
                        </div>

                        {!visitor && <div className="mt-5 md:mt-auto flex justify-between">
                            <button
                                onClick={() => setConfigIsOpen(true)}
                                className="text-gray-300 flex items-center cursor-pointer hover:text-gray-400 hover:underline underline-offset-4 duration-200"
                            >
                                <IoSettingsOutline className="mr-2" />
                                Configurações
                            </button>
                        </div>}
                    </section>

                    {!visitor && <hr className="block md:hidden text-gray-500" />}

                    {!visitor && <section className="flex h-full max-h-80 overflow-y-auto flex-col flex-1 w-full gap-4 scroll-profile">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            {<ContentCard title="Conteúdos Salvos" nameButton="Ver Todos" contentList={educationalContent} />}
                        </div>
                    </section>}
                </div>

                <hr className="m-5 text-gray-500" />

                <section className="px-5 pb-5">
                    <h1 className="text-2xl text-white font-semibold">Histórico de montagem</h1>

                    <p className="text-gray-300 mt-5">Nenhuma montagem foi realizada</p>

                    {!visitor && <Link
                        to={'/montagem'}
                        className="text-[#79A7DD] hover:text-[#E0E1DD] transition-colors duration-200 underline underline-offset-4 flex items-center"
                    >
                        Faça sua primeira montagem
                        <ChevronRightIcon className="w-4 h-4" />
                    </Link>}
                </section>

            </main>
        </div>
    )
}

export default Perfil