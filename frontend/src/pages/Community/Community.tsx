import { useState } from 'react';
import {
    HeartIcon,
    ChatBubbleOvalLeftIcon,
    ArrowPathIcon,
    ShareIcon,
    PhotoIcon,
    FaceSmileIcon,
    EllipsisHorizontalIcon,
    NewspaperIcon,
    AcademicCapIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface Post {
    id: number;
    user: {
        name: string;
        username: string;
        avatar: string;
    };
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    reposts: number;
    isLiked: boolean;
    image?: string;
}

const mockPosts: Post[] = [
    {
        id: 1,
        user: {
            name: "João Silva",
            username: "joaosilva_tech",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        },
        content: "Acabei de montar meu primeiro PC gamer! RTX 4070 + Ryzen 7 7700X. O desempenho está incrível! 🚀 #PCGamer #TechBuild",
        timestamp: "2h",
        likes: 24,
        comments: 8,
        reposts: 3,
        isLiked: false,
        image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        user: {
            name: "Maria Santos",
            username: "maria_hardwares",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
        },
        content: "Dica para quem está montando PC: sempre verifiquem a compatibilidade da RAM com a motherboard antes de comprar. Aprendi isso da forma difícil 😅",
        timestamp: "4h",
        likes: 42,
        comments: 15,
        reposts: 8,
        isLiked: true
    },
    {
        id: 3,
        user: {
            name: "Carlos Tech",
            username: "carlos_reviews",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
        },
        content: "Review completo da RTX 4080 saindo amanhã no canal! Spoiler: vale muito a pena para quem joga em 4K. O que vocês querem ver testado?",
        timestamp: "6h",
        likes: 67,
        comments: 23,
        reposts: 12,
        isLiked: false
    }
];

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
    const [posts, setPosts] = useState<Post[]>(mockPosts);
    const [newPost, setNewPost] = useState('');

    const handleLike = (postId: number) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
                : post
        ));
    };

    const handleSubmitPost = () => {
        if (newPost.trim()) {
            const post: Post = {
                id: Date.now(),
                user: {
                    name: "Você",
                    username: "your_username",
                    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                },
                content: newPost,
                timestamp: "agora",
                likes: 0,
                comments: 0,
                reposts: 0,
                isLiked: false
            };
            setPosts([post, ...posts]);
            setNewPost('');
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
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                                    alt="Your avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1">
                                    <textarea
                                        value={newPost}
                                        onChange={(e) => setNewPost(e.target.value)}
                                        placeholder="O que você está construindo hoje?"
                                        className="w-full bg-transparent text-white placeholder-gray-400 text-lg resize-none border-none outline-none"
                                        rows={3}
                                    />

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                        <div className="flex gap-4">
                                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                                <PhotoIcon className="w-5 h-5" />
                                            </button>
                                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                                <FaceSmileIcon className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={handleSubmitPost}
                                            disabled={!newPost.trim()}
                                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                                        >
                                            Postar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-gray-900/70 transition-all duration-200"
                                >
                                    <div className="flex gap-3">
                                        <img
                                            src={post.user.avatar}
                                            alt={post.user.name}
                                            className="w-10 h-10 rounded-full"
                                        />

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-white">{post.user.name}</h3>
                                                <span className="text-gray-400">@{post.user.username}</span>
                                                <span className="text-gray-500">·</span>
                                                <span className="text-gray-500">{post.timestamp}</span>
                                                <button className="ml-auto text-gray-400 hover:text-white transition-colors">
                                                    <EllipsisHorizontalIcon className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <p className="text-white mb-3 leading-relaxed">{post.content}</p>

                                            {post.image && (
                                                <img
                                                    src={post.image}
                                                    alt="Post image"
                                                    className="rounded-xl mb-3 max-w-full h-auto"
                                                />
                                            )}

                                            <div className="flex items-center gap-8 text-gray-400">
                                                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                                                    <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition-colors">
                                                        <ChatBubbleOvalLeftIcon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm">{post.comments}</span>
                                                </button>

                                                <button className="flex items-center gap-2 hover:text-green-400 transition-colors group">
                                                    <div className="p-2 rounded-full group-hover:bg-green-400/10 transition-colors">
                                                        <ArrowPathIcon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm">{post.reposts}</span>
                                                </button>

                                                <button
                                                    onClick={() => handleLike(post.id)}
                                                    className={`flex items-center gap-2 transition-colors group ${post.isLiked ? 'text-red-500' : 'hover:text-red-400'
                                                        }`}
                                                >
                                                    <div className="p-2 rounded-full group-hover:bg-red-400/10 transition-colors">
                                                        {post.isLiked ? (
                                                            <HeartSolidIcon className="w-4 h-4" />
                                                        ) : (
                                                            <HeartIcon className="w-4 h-4" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm">{post.likes}</span>
                                                </button>

                                                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                                                    <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition-colors">
                                                        <ShareIcon className="w-4 h-4" />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

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
                            <div className="flex items-center gap-2 mb-4">
                                <AcademicCapIcon className="w-5 h-5 text-green-400" />
                                <h2 className="font-bold text-white text-lg">Conteúdo Educativo</h2>
                            </div>

                            <div className="space-y-4">
                                {educationalContent.map((content, index) => (
                                    <div key={index} className="group cursor-pointer">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-green-400 font-medium">{content.type}</span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${content.difficulty === 'Iniciante' ? 'bg-green-500/20 text-green-400' :
                                                content.difficulty === 'Intermediário' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'
                                                }`}>
                                                {content.difficulty}
                                            </span>
                                        </div>
                                        <h3 className="text-white font-medium group-hover:text-green-300 transition-colors">
                                            {content.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-4 text-green-400 hover:text-green-300 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                                Ver todos os guias
                                <ChevronRightIcon className="w-4 h-4" />
                            </button>
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
        </div>
    );
}