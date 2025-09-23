import { useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import ContentCard from "../../components/ContentCard/ContentCard";
import Config from "../../components/ConfigModal/Config";
import { toast } from "react-toastify";
import EditImageMenu from "../../components/EditImageMenu/EditImageMenu";
import Description from "../../components/Description/Description";
import ListPost from "../../components/ListPost/ListPost";

import api from "../../services/api";
import { type User, type BackendPost } from "../../types";

const banner = 'https://www.womantowomanmentoring.org/wp-content/uploads/placeholder.jpg';
const foto = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

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

function Perfil() {

    const { auth, getUser, authLoader, setAuth } = useAuth();
    const { userName } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<User>();
    const [visitor, setvisitor] = useState(false);
    const [visiterLoader, setVisitorLoader] = useState(false);
    const [activeTab, setActiveTab] = useState<'builds' | 'posts'>('builds');
    const [userPosts, setUserPosts] = useState<BackendPost[]>([]);
    const [postsLoading, setPostsLoading] = useState(false);

    useEffect(() => {
        if (authLoader) return;

        if (auth && userName == auth?.nome_usuario) {
            setvisitor(false);
            setVisitorLoader(false);
            setProfile(undefined);

            if (auth.tb_posts) {
                setUserPosts(auth.tb_posts);
            } else {
                setUserPosts([]);
            }
        } else {
            setvisitor(true);
            setVisitorLoader(true);
            getUserProfile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userName, authLoader, auth?.nome_usuario, auth?.tb_posts]);

    useEffect(() => {
        if(auth?.nome_usuario == userName){
            getUser()
        }
    }, []);

    const getUserProfile = useCallback(async () => {
        try {
            setPostsLoading(true);
            const req = await api.get(`/usuarios/info/${userName}`, {
                headers: localStorage.getItem('token') ? {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                } : {}
            });

            if (!req.data.ok) {
                navigate('/404', { replace: true });
                throw new Error("Falha ao buscar usuario")
            }

            setProfile(req.data.user);

            if (req.data.user.tb_posts) {
                setUserPosts(req.data.user.tb_posts);
            } else {
                setUserPosts([]);
            }

            setVisitorLoader(false);
            setPostsLoading(false);
        } catch (error) {
            console.log(error);
            navigate('/404', { replace: true });
            setVisitorLoader(false);
        }
    }, [userName, navigate]);

    const formatarData = (dataString?: string | Date) => {
        if (!dataString) return "";
        const date = typeof dataString === "string" ? new Date(dataString) : dataString;
        return date.toLocaleDateString('pt-BR');
    };

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

    const handleEditBanner = useCallback(async (file: File) => {
        const data = formatedImage(file);

        if (auth) {
            setAuth({
                ...auth,
                endereco_banner: URL.createObjectURL(file),
                tb_posts: auth?.tb_posts ?? []
            });
        }

        try {
            const req = await api.patch('/update-user?typeImage=banner', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": 'multipart/form-data'
                }
            });

            if (!req.data.ok) {
                throw new Error("Falha ao adicionar imagem")
            }

            getUser();
            // eslint-disable-next-line
        } catch (error) {
            toast.error(`Falha ao adicionar imagem`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });
        }
    }, [auth, setAuth, getUser]);

    const handleEditProfile = useCallback(async (file: File) => {
        const data = formatedImage(file);

        if (auth) {
            setAuth({
                ...auth,
                endereco_imagem: URL.createObjectURL(file),
                tb_posts: auth?.tb_posts ?? []
            });
        }

        try {
            const req = await api.patch('/update-user?typeImage=perfil', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": 'multipart/form-data'
                }
            });

            if (!req.data.ok) {
                throw new Error("Falha ao adicionar imagem")
            }

            getUser();
            // eslint-disable-next-line
        } catch (error) {
            toast.error(`Falha ao adicionar imagem`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });
        }
    }, [auth, setAuth, getUser]);

    const handleRemoveBanner = useCallback(async () => {
        if (!auth?.endereco_banner) return;

        setAuth({
            ...auth,
            endereco_banner: null,
            tb_posts: auth?.tb_posts ?? []
        });

        try {
            const formData = new FormData();
            formData.append('endereco_banner', "");
            const req = await api.patch('/update-user?typeImage=banner', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": 'multipart/form-data'
                }
            });

            if (!req.data.ok) {
                throw new Error("Falha ao remover imagem")
            }

            getUser();
            // eslint-disable-next-line
        } catch (error) {
            toast.error(`Falha ao remover imagem`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });
        }
    }, [auth, setAuth, getUser]);

    const handleRemoveProfile = useCallback(async () => {
        if (!auth?.endereco_imagem) return;

        setAuth({
            ...auth,
            endereco_imagem: null,
            tb_posts: auth?.tb_posts ?? []
        });

        try {
            const formData = new FormData();
            formData.append('endereco_imagem', "");

            const req = await api.patch('/update-user?typeImage=perfil', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": 'multipart/form-data'
                }
            });

            if (!req.data.ok) {
                throw new Error("Falha ao remover imagem")
            }

            getUser();

            // eslint-disable-next-line
        } catch (error) {
            toast.error(`Falha ao remover imagem`, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });
        }
    }, [auth, setAuth, getUser]);

    const handleUserPostLike = useCallback(async (id_post: number) => {
        if (!localStorage.getItem('token')) {
            toast.warning('Faça login para curtir posts', {
                position: "bottom-right",
                autoClose: 3000,
                theme: 'dark'
            });
            return;
        }

        try {
            setUserPosts(prevPosts => {
                const currentPost = prevPosts.find(item => item.id_post === id_post);
                const endpoint = !currentPost?.isLiked ? `/add-like/${id_post}` : `/remove-like/${id_post}`;

                api.patch(endpoint, {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }).catch(error => {
                    console.error('Error updating like:', error);

                    setUserPosts(revertPosts =>
                        revertPosts.map(post =>
                            post.id_post === id_post
                                ? {
                                    ...post,
                                    curtidas: post.isLiked ? post.curtidas + 1 : post.curtidas - 1,
                                    isLiked: !post.isLiked
                                }
                                : post
                        )
                    );

                    toast.error('Erro ao curtir post', {
                        position: "bottom-right",
                        autoClose: 3000,
                        theme: 'dark'
                    });
                });

                return prevPosts.map(post =>
                    post.id_post === id_post
                        ? {
                            ...post,
                            curtidas: post.isLiked ? post.curtidas - 1 : post.curtidas + 1,
                            isLiked: !post.isLiked
                        }
                        : post
                );
            });

        } catch (error) {
            console.error('Error updating like:', error);
        }
    }, []);

    if (authLoader || visiterLoader) {
        return (
            <div className="z-50 h-screen w-full bg-gray-950 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-950 pt-25 pb-12">


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
                                <p className="text-gray-300">Entrou em: {' '}
                                    {!visitor ?
                                        formatarData(auth?.criado_em)
                                        :
                                        formatarData(profile?.criado_em)
                                    }</p>
                            </div>
                            {!visitor && <p className="text-gray-300">{auth?.email}</p>}
                        </div>

                        <Description visitor={visitor} desc={profile?.descricao} />


                        {!visitor && <div className="mt-5 md:mt-auto flex justify-between">
                            <Config />

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

                <section className="px-5">
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setActiveTab('builds')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === 'builds'
                                ? 'bg-gradient-to-r from-[#79A7DD] to-[#415A77] text-white shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Histórico de montagem
                        </button>
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === 'posts'
                                ? 'bg-gradient-to-r from-[#79A7DD] to-[#415A77] text-white shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Posts ({userPosts.length})
                        </button>
                    </div>
                </section>

                <section className="px-5 pb-5">
                    {activeTab === 'builds' ? (
                        <>
                            <h1 className="text-2xl text-white font-semibold mb-5">Histórico de montagem</h1>
                            <p className="text-gray-300 mt-5">Nenhuma montagem foi realizada</p>
                            {!visitor && <Link
                                to={'/montagem'}
                                className="text-[#79A7DD] hover:text-[#E0E1DD] transition-colors duration-200 underline underline-offset-4 flex items-center"
                            >
                                Faça sua primeira montagem
                                <ChevronRightIcon className="w-4 h-4" />
                            </Link>}
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl text-white font-semibold mb-5">
                                Posts de {visitor ? profile?.nome_usuario : auth?.nome_usuario}
                            </h1>

                            {postsLoading ? (
                                <div className="flex justify-center items-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                                    <span className="ml-3 text-gray-400">Carregando posts...</span>
                                </div>
                            ) : userPosts.length > 0 ? (
                                <ListPost 
                                    isPerfil={true} 
                                    userPosts={userPosts} 
                                    postsLoading={postsLoading} 
                                    onUserPostLike={handleUserPostLike} 
                                    showPagination={false} 
                                />
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-400 text-lg">
                                        {visitor
                                            ? `${profile?.nome_usuario} ainda não fez nenhum post`
                                            : 'Você ainda não fez nenhum post'
                                        }
                                    </p>
                                    <p className="text-gray-500 mt-2">
                                        {!visitor && (
                                            <Link
                                                to="/community"
                                                className="text-[#79A7DD] hover:text-[#E0E1DD] transition-colors duration-200 underline underline-offset-4"
                                            >
                                                Comece a compartilhar na comunidade!
                                            </Link>
                                        )}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </section>

            </main>
        </div>
    )
}

export default Perfil