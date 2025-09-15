import { StarIcon } from '@heroicons/react/24/solid';
import type { Game } from '../../utils/games';

interface GameCardProps {
    game: Game;
    viewMode: 'grid' | 'list';
    onClick?: (game: Game) => void;
}

export default function GameCard({ game, viewMode, onClick }: GameCardProps) {
    const handleClick = () => {
        if (onClick) {
            onClick(game);
        }
    };

    return (
        <div
            onClick={handleClick}
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
                    onError={(e) => {
                        // Fallback for broken images
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder-game.jpg';
                    }}
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
    );
}