import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface Game {
    id: number;
    name: string;
    image: string;
    category: 'fps' | 'rpg' | 'strategy' | 'racing' | 'indie' | 'mmo';
    rating: number;
    price: string;
    description: string;
    tags: string[];
    featured: boolean;
}

const games: Game[] = [
    {
        id: 1,
        name: "Counter-Strike 2",
        image: "/images/games/cs2.jpg",
        category: "fps",
        rating: 4.8,
        price: "Free",
        description: "The legendary FPS returns with next-gen graphics and gameplay.",
        tags: ["Competitivo", "Multiplayer", "Tático"],
        featured: true
    },
    {
        id: 2,
        name: "Fortnite",
        image: "/images/games/fortnite.jpg",
        category: "fps",
        rating: 4.5,
        price: "Free",
        description: "Battle royale que define uma geração de jogadores.",
        tags: ["Battle Royale", "Construção", "Cross-platform"],
        featured: true
    },
    {
        id: 3,
        name: "The Witcher 3",
        image: "/images/games/thewitcher3.jpg",
        category: "rpg",
        rating: 4.9,
        price: "R$ 59,99",
        description: "Uma épica aventura de fantasia dark em mundo aberto.",
        tags: ["Mundo Aberto", "História Rica", "Escolhas"],
        featured: true
    },
    {
        id: 4,
        name: "Rocket League",
        image: "/images/games/rocketleague.jpg",
        category: "racing",
        rating: 4.7,
        price: "Free",
        description: "Futebol com carros em alta velocidade e acrobacias.",
        tags: ["Esports", "Multiplayer", "Física"],
        featured: false
    },
    {
        id: 5,
        name: "Age of Empires IV",
        image: "/images/games/ageofempires.png",
        category: "strategy",
        rating: 4.6,
        price: "R$ 129,99",
        description: "RTS clássico reimaginado para a era moderna.",
        tags: ["Estratégia", "Histórico", "Multiplayer"],
        featured: false
    },
    {
        id: 6,
        name: "Hollow Knight",
        image: "/images/games/hollowknight.avif",
        category: "indie",
        rating: 4.8,
        price: "R$ 31,99",
        description: "Metroidvania atmosférico com arte desenhada à mão.",
        tags: ["Metroidvania", "Arte 2D", "Desafiador"],
        featured: false
    },
    {
        id: 7,
        name: "Final Fantasy XIV",
        image: "/images/games/finalfantasy.jpg",
        category: "mmo",
        rating: 4.7,
        price: "R$ 19,99/mês",
        description: "MMORPG com uma das melhores histórias do gênero.",
        tags: ["MMORPG", "História", "Social"],
        featured: true
    },
    {
        id: 8,
        name: "Civilization VI",
        image: "/images/games/civilization.avif",
        category: "strategy",
        rating: 4.5,
        price: "R$ 199,99",
        description: "Construa um império que resistirá ao teste do tempo.",
        tags: ["4X", "Turnos", "Estratégia"],
        featured: false
    }
];

const categories = [
    { id: 'all', name: 'Todos', count: games.length },
    { id: 'fps', name: 'FPS', count: games.filter(g => g.category === 'fps').length },
    { id: 'rpg', name: 'RPG', count: games.filter(g => g.category === 'rpg').length },
    { id: 'strategy', name: 'Estratégia', count: games.filter(g => g.category === 'strategy').length },
    { id: 'racing', name: 'Corrida', count: games.filter(g => g.category === 'racing').length },
    { id: 'indie', name: 'Indie', count: games.filter(g => g.category === 'indie').length },
    { id: 'mmo', name: 'MMO', count: games.filter(g => g.category === 'mmo').length },
];

export default function Catalog() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [filteredGames, setFilteredGames] = useState(games);

    const featuredGames = games.filter(game => game.featured);

    useEffect(() => {
        let filtered = games;

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(game => game.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(game =>
                game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredGames(filtered);
    }, [selectedCategory, searchTerm]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 pt-20">
            <section className="relative h-96 md:h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    {featuredGames.map((game, index) => (
                        <div
                            key={game.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={game.image}
                                alt={game.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        </div>
                    ))}
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                </button>

                <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                {featuredGames[currentSlide]?.name}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300 mb-6">
                                {featuredGames[currentSlide]?.description}
                            </p>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1">
                                    <StarIcon className="w-5 h-5 text-yellow-400" />
                                    <span className="text-white font-medium">
                                        {featuredGames[currentSlide]?.rating}
                                    </span>
                                </div>
                                <span className="text-2xl font-bold text-[#79A7DD]">
                                    {featuredGames[currentSlide]?.price}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {featuredGames[currentSlide]?.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-sm bg-white/20 text-white rounded-full backdrop-blur-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {featuredGames.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-[#79A7DD]' : 'bg-white/30'
                                }`}
                        />
                    ))}
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-white mb-2">Catálogo de Jogos</h2>
                        <p className="text-gray-400">
                            Descubra os melhores jogos para sua configuração
                        </p>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="relative">
                            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar jogos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#79A7DD] focus:outline-none"
                            />
                        </div>

                        <div className="flex rounded-lg border border-gray-700 overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-[#79A7DD] text-white' : 'bg-gray-900 text-gray-400'}`}
                            >
                                <Squares2X2Icon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list' ? 'bg-[#79A7DD] text-white' : 'bg-gray-900 text-gray-400'}`}
                            >
                                <ListBulletIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id
                                ? 'bg-[#79A7DD] text-white'
                                : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            {category.name} ({category.count})
                        </button>
                    ))}
                </div>

                <div className={`
          ${viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                        : 'space-y-4'
                    }
        `}>
                    {filteredGames.map((game) => (
                        <div
                            key={game.id}
                            className={`
                group cursor-pointer transition-all duration-300 hover:scale-105
                ${viewMode === 'grid'
                                    ? 'bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-[#79A7DD]/50 hover:shadow-lg hover:shadow-[#79A7DD]/10'
                                    : 'bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-[#79A7DD]/50 flex gap-4'
                                }
              `}
                        >
                            <div className={viewMode === 'grid' ? 'aspect-video overflow-hidden' : 'w-32 h-20 rounded-lg overflow-hidden flex-shrink-0'}>
                                <img
                                    src={game.image}
                                    alt={game.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>

                            <div className={viewMode === 'grid' ? 'p-4' : 'flex-1'}>
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-white group-hover:text-[#79A7DD] transition-colors">
                                        {game.name}
                                    </h3>
                                    {game.featured && (
                                        <span className="px-2 py-1 text-xs bg-[#79A7DD] text-white rounded-full">
                                            Destaque
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                    {game.description}
                                </p>

                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-1">
                                        <StarIcon className="w-4 h-4 text-yellow-400" />
                                        <span className="text-white text-sm">{game.rating}</span>
                                    </div>
                                    <span className="font-bold text-[#79A7DD]">{game.price}</span>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {game.tags.slice(0, 2).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {game.tags.length > 2 && (
                                        <span className="px-2 py-1 text-xs text-gray-500">
                                            +{game.tags.length - 2}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredGames.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MagnifyingGlassIcon className="w-12 h-12 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Nenhum jogo encontrado
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Tente ajustar os filtros ou termo de busca
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                            }}
                            className="px-6 py-2 bg-[#79A7DD] text-white rounded-lg hover:bg-[#415A77] transition-colors"
                        >
                            Limpar Filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}