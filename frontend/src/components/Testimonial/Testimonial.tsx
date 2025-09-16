
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import NumberCount from "../NumberCount";
import { useEffect, useRef, useState } from 'react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatarUrl: string;
    rating: number;
    quote: string;
}

// Hook para detectar quando o componente está visível
const useIntersectionObserver = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.3, // Ativa quando 30% do componente está visível
                rootMargin: '0px'
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [isVisible]);

    return [ref, isVisible] as const;
};

const testimonialData: Testimonial[] = [
    {
        id: 1,
        name: 'João Silva',
        role: 'Desenvolvedor Full Stack',
        avatarUrl: 'https://pagedone.io/asset/uploads/1696229969.png',
        rating: 4.9,
        quote: 'A Ekhytera revolucionou minha forma de escolher hardware. As recomendações são precisas e o catálogo de jogos me ajuda a tomar as melhores decisões.',
    },
    {
        id: 2,
        name: 'Maria Santos',
        role: 'Game Designer',
        avatarUrl: 'https://pagedone.io/asset/uploads/1696229994.png',
        rating: 4.8,
        quote: 'Graças à Ekhytera, consegui montar meu PC gamer ideal. A plataforma é intuitiva e as configurações sugeridas são excelentes.',
    },
    {
        id: 3,
        name: 'Carlos Mendes',
        role: 'Streamer',
        avatarUrl: 'https://pagedone.io/asset/uploads/1696230027.png',
        rating: 5.0,
        quote: 'Como streamer, preciso de performance máxima. A Ekhytera me ajudou a escolher os componentes perfeitos para streaming e jogos simultâneos.',
    },
    {
        id: 4,
        name: 'Ana Costa',
        role: 'Gamer Profissional',
        avatarUrl: 'https://pagedone.io/asset/uploads/1696229969.png',
        rating: 4.9,
        quote: 'A comunidade da Ekhytera é incrível! Sempre encontro dicas valiosas e suporte técnico de qualidade. Recomendo para todos os gamers.',
    },
    {
        id: 5,
        name: 'Pedro Oliveira',
        role: 'Engenheiro de Software',
        avatarUrl: 'https://pagedone.io/asset/uploads/1696229994.png',
        rating: 4.7,
        quote: 'Interface clean, recomendações inteligentes e uma base de dados completa. A Ekhytera é essencial para quem leva gaming a sério.',
    },
];


export default function Testimonials() {
    const [sectionRef, isVisible] = useIntersectionObserver();

    return (
        <section ref={sectionRef} className="py-24 bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <span className="text-sm text-zinc-400 font-medium text-center block mb-2">DEPOIMENTOS</span>
                    <h2 className="text-4xl text-center font-bold text-white">
                        <NumberCount startCounting={isVisible} /> + Usuários aprovam e recomendam a{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#79A7DD] to-[#415A77]">
                            Ekhytera
                        </span>
                    </h2>
                </div>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={32}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 32,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 32,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 32,
                        },
                    }}
                    className="mb-16"
                >

                    {testimonialData.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 transition-all duration-500 w-full mx-auto hover:border-[#79A7DD]/50 hover:shadow-lg hover:shadow-[#79A7DD]/20 h-80 flex flex-col">
                                <div className="flex-1">
                                    <div className="flex items-center mb-7 gap-2 text-amber-500">
                                        <svg className="w-5 h-5" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z" fill="#79A7DD" />
                                        </svg>
                                        <span className="text-base font-semibold text-[#79A7DD]">{testimonial.rating}</span>
                                    </div>
                                    <p className="text-base text-gray-300 leading-6 transition-all duration-500 pb-8 group-hover:text-white overflow-hidden">
                                        "{testimonial.quote}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-5 border-t border-zinc-700 pt-5 mt-auto">
                                    <img className="rounded-full h-10 w-10 object-cover" src={testimonial.avatarUrl} alt={`Avatar de ${testimonial.name}`} />
                                    <div>
                                        <h5 className="text-white font-medium transition-all duration-500 mb-1">{testimonial.name}</h5>
                                        <span className="text-sm leading-4 text-gray-400">{testimonial.role}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}
