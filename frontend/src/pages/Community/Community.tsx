import { memo } from 'motion/react';
import {
    NewspaperIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import PostCreator from '../../components/PostCreator/PostCreator';
import ContentCard from '../../components/ContentCard/ContentCard';
import ListPost from '../../components/ListPost/ListPost';

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

function Community() {
    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between flex-col lg:flex-row">
                    <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
                        <div className="py-6 border-b border-white/10 mb-6">
                            <h1 className="text-2xl font-bold text-white">Comunidade</h1>
                            <p className="text-gray-400 mt-1">Conecte-se com outros entusiastas de tecnologia</p>
                        </div>
                        <PostCreator />
                        {/* Posts feed */}
                        <ListPost />
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

export default memo(Community)