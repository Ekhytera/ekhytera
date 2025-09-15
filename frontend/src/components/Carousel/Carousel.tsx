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
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CarouselProps {
  children: ReactNode[];
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export default function Carousel({ 
  children, 
  autoPlayInterval = 5000, 
  showDots = true, 
  showArrows = true,
  className = ""
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = children.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (autoPlayInterval > 0) {
      const interval = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlayInterval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-700 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="min-w-full h-full">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Slide anterior"
          >
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Próximo slide"
          >
            <ChevronRightIcon className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#79A7DD] scale-125 shadow-lg shadow-[#79A7DD]/50' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}