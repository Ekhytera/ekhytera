import { useState, useEffect } from 'react';
import {
    PhotoIcon,
    FaceSmileIcon,
    NewspaperIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import ContentCard from '../../components/ContentCard/ContentCard';
import Post from '../../components/Post/Post';
import { IoIosArrowDown } from "react-icons/io";
import type { BackendPost } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const techNews = [
    {
        title: "Nova GPU da NVIDIA promete 40% mais performance",
        category: "Hardware",
        time: "1h ago"
    },
    {
        title: "AMD lança processadores Ryzen 8000 series",
        category: "Processadores",
        time: "3h ago"
    },
    {
        title: "SSD M.2 PCIe 5.0: vale a pena o upgrade?",
        category: "Armazenamento",
        time: "5h ago"
    }
];

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

export default function Community() {
    const [posts, setPosts] = useState<BackendPost[]>([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [newPostsCount, setNewPostsCount] = useState(0); // Para controlar animações
    const [pagination, setPagination] = useState({
        page: 1,
        nextPage: 0,
        prevPage: 0,
        hasMore: false
    });
    const { auth } = useAuth();

    // Fetch posts from backend
    const fetchPosts = async (page?: number) => {
        try {
            if (page && page > 1) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }

            const response = await api.get(`/list-posts?page=${page || 1}`, {
                headers: localStorage.getItem('token') ? {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                } : {}
            });

            if (response.data.ok) {
                if (page && page > 1) {
                    // Adiciona os posts imediatamente
                    setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
                    setNewPostsCount(response.data.posts.length);
                } else {
                    setPosts(response.data.posts);
                    setNewPostsCount(0);
                }

                setPagination({
                    page: response.data.page,
                    nextPage: response.data.nextPage,
                    prevPage: response.data.prevPage,
                    hasMore: response.data.hasMore
                });
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Erro ao carregar posts', {
                position: "bottom-right",
                autoClose: 3000,
                theme: 'dark'
            });
        } finally {
            // Delay mínimo apenas para o loading
            setTimeout(() => {
                setLoadingMore(false);
                setLoading(false);
            }, 100);
        }
    };

    // Handle like/unlike
    const handleLike = async (id_post: number) => {
        if (!auth) {
            toast.warning('Faça login para curtir posts', {
                position: "bottom-right",
                autoClose: 3000,
                theme: 'dark'
            });
            return;
        }

        try {
            const currentPost = posts.find(item => item.id_post === id_post);
            const endpoint = !currentPost?.isLiked ? `/add-like/${id_post}` : `/remove-like/${id_post}`

            setPosts(posts.map(post =>
                post.id_post === id_post
                    ? {
                        ...post,
                        curtidas: post.isLiked ? post.curtidas - 1 : post.curtidas + 1,
                        isLiked: post.isLiked ? false : true
                    }
                    : post
            ));

            const response = await api.patch(endpoint, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.data.ok) {
                throw new Error('Failed to update like');
            }

        } catch (error) {
            console.error('Error updating like:', error);
            setPosts(posts.map(post =>
                post.id_post === id_post
                    ? {
                        ...post,
                        curtidas: post.isLiked ? post.curtidas + 1 : post.curtidas - 1
                    }
                    : post
            ));

            toast.error('Erro ao curtir post', {
                position: "bottom-right",
                autoClose: 3000,
                theme: 'dark'
            });
        }
    };

    // Handle post submission
    const handleSubmitPost = async () => {
        if (!auth) {
            toast.warning('Faça login para fazer posts', {
                position: "bottom-right",
                autoClose: 3000,
                theme: 'dark'
            });
            return;
        }

        if (!newPost.trim()) {
            toast.error('Post não pode estar vazio', {
                position: "bottom-right",
                autoClose: 3000,
                theme: 'dark'
            });
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await api.post('/create-post', {
                texto: newPost.trim().replace(/(\r?\n){3,}/g, '\n\n\n')
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.ok) {
                toast.success('Post criado com sucesso!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    theme: 'dark'
                });

                fetchPosts(1);
                setNewPost('');

            }
        } catch (error) {
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
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchPosts(1);
    }, []);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            handleSubmitPost();
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
                        <div className="py-6 border-b border-white/10 mb-6">
                            <h1 className="text-2xl font-bold text-white">Comunidade</h1>
                            <p className="text-gray-400 mt-1">Conecte-se com outros entusiastas de tecnologia</p>
                        </div>

                        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
                            <div className="flex gap-4">
                                <img
                                    src={auth?.endereco_imagem
                                        ? auth.endereco_imagem
                                        : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                                    }
                                    alt="Your avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1">
                                    <textarea
                                        value={newPost}
                                        onChange={(e) => setNewPost(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder={auth
                                            ? "O que você está construindo hoje?"
                                            : "Faça login para fazer posts..."
                                        }
                                        disabled={!auth || isSubmitting}
                                        className="w-full bg-transparent text-white placeholder-gray-400 text-lg resize-none border-none outline-none disabled:opacity-50 scroll-profile"
                                        rows={3}
                                        maxLength={500}
                                    />

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                        <div className="flex gap-4">
                                            <button
                                                className="text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                                                disabled={!auth}
                                            >
                                                <PhotoIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                                                disabled={!auth}
                                            >
                                                <FaceSmileIcon className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-400">
                                                {newPost.length}/500
                                            </span>
                                            <button
                                                onClick={handleSubmitPost}
                                                disabled={!auth || !newPost.trim() || isSubmitting || newPost.length > 500}
                                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                                            >
                                                {isSubmitting ? 'Postando...' : 'Postar'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Posts feed */}
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                                <span className="ml-3 text-gray-400">Carregando posts...</span>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {posts.length > 0 ? (
                                    <>
                                        <div className="space-y-4">
                                            {posts.map((post, index) => {
                                                const isNewPost = newPostsCount > 0 && index >= (posts.length - newPostsCount);
                                                
                                                return (
                                                    <div
                                                        key={post.id_post}
                                                        className={`transition-all duration-300 ${
                                                            isNewPost 
                                                                ? 'animate-slideInUp opacity-0' 
                                                                : 'opacity-100'
                                                        }`}
                                                        style={isNewPost ? {
                                                            animation: `slideInUp 0.3s ease-out ${(index - (posts.length - newPostsCount)) * 0.05}s forwards`
                                                        } : {}}
                                                    >
                                                        <Post
                                                            {...post}
                                                            isLiked={post.isLiked}
                                                            onLike={handleLike}
                                                            fetchPosts={fetchPosts}
                                                            pagination={pagination}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        
                                        {/* Loading indicator para "Ver Mais" */}
                                        {loadingMore && (
                                            <div className="flex justify-center items-center py-4 animate-pulse">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                                                <span className="ml-3 text-gray-400">Carregando mais posts...</span>
                                            </div>
                                        )}

                                        {(posts.length > 10 || pagination.hasMore) && <div className='flex'>
                                            <button
                                                className='text-white mx-auto cursor-pointer hover:bg-gray-600 duration-200 flex items-center font-semibold bg-gray-600/80 py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all'
                                                onClick={() => {
                                                    if (pagination.hasMore) fetchPosts(pagination.nextPage);
                                                    else fetchPosts(1);
                                                }}
                                                disabled={loadingMore}
                                            >
                                                {loadingMore 
                                                    ? 'Carregando...' 
                                                    : pagination.hasMore 
                                                        ? 'Ver Mais' 
                                                        : 'Ver Menos'
                                                }
                                                <IoIosArrowDown className={`ml-2 transition-transform duration-200 ${
                                                    pagination.hasMore ? 'rotate-0': 'rotate-180'
                                                } ${loadingMore ? 'animate-pulse' : ''}`}/>
                                            </button>
                                        </div>}
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-400 text-lg">Nenhum post encontrado</p>
                                        <p className="text-gray-500 mt-2">Seja o primeiro a compartilhar algo!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 space-y-6">
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <NewspaperIcon className="w-5 h-5 text-blue-400" />
                                <h2 className="font-bold text-white text-lg">Notícias Tech</h2>
                            </div>

                            <div className="space-y-4">
                                {techNews.map((news, index) => (
                                    <div key={index} className="group cursor-pointer">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-blue-400 font-medium">{news.category}</span>
                                            <span className="text-xs text-gray-500">{news.time}</span>
                                        </div>
                                        <h3 className="text-white font-medium group-hover:text-blue-300 transition-colors">
                                            {news.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-4 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                                Ver mais notícias
                                <ChevronRightIcon className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                            <ContentCard title='Conteúdo Educativo' nameButton='Ver todos os guias' contentList={educationalContent} />
                        </div>

                        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                            <h2 className="font-bold text-white text-lg mb-4">Trending</h2>

                            <div className="space-y-3">
                                {['#RTX4080', '#Ryzen7000', '#DDR5', '#PCGamer', '#BuildPC'].map((tag, index) => (
                                    <div key={index} className="flex items-center justify-between group cursor-pointer">
                                        <span className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                                            {tag}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            {Math.floor(Math.random() * 100)}k posts
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS personalizado para animações */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}