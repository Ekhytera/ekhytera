import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { games } from '../../utils/games';

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const featuredGames = games.filter(game => game.featured);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [featuredGames.length]);

    if (featuredGames.length === 0) {
        return null;
    }

    return (
        <section className="relative h-96 md:h-[500px] overflow-hidden">
            <div className="absolute inset-0">
                {featuredGames.map((game, index) => (
                    <div
                        key={game.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
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
                        className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentSlide ? 'bg-[#79A7DD]' : 'bg-white/30'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}