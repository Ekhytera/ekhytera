
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import HTMLContent from "../NumberCount";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatarUrl: string;
    rating: number;
    quote: string;
}

const testimonialData: Testimonial[] = [
    {
        id: 1,
        name: 'Jane D.',
        role: 'CEO',
        avatarUrl: 'https://pagedone.io/asset/uploads/1696229969.png',
        rating: 4.9,
        quote: 'Pagedone tornou possível para mim estar no topo do meu portfólio e tomar decisões informadas de forma rápida e fácil.',
    },
    {
        id: 2,
        name: 'Harsh P.',
        role: 'Product Designer',
        avatarUrl: 'https://pagedone.io/asset/uploads/1696229994.png',
        rating: 4.9,
        quote: 'Graças a Ekhytera, sinto-me mais informado e confiante sobre minhas decisões relacionadas a hardware do que nunca.',
    },
    {
        id: 3,
        name: 'Alex K.',
        role: 'Design Lead',
        avatarUrl: 'https://pagedone.io/asset/uploads/1696230027.png',
        rating: 4.9,
        quote: 'A equipe de atendimento ao cliente da pagedone foi além para me ajudar a resolver um problema de faturamento.',
    },
    {
        id: 4,
        name: 'Jane D.',
        role: 'CEO',
        avatarUrl: 'https://pagedone.io/asset/uploads/1696229969.png',
        rating: 4.9,
        quote: 'Pagedone tornou possível para mim estar no topo do meu portfólio e tomar decisões informadas de forma rápida e fácil.',
    },
    {
        id: 5,
        name: 'Harsh P.',
        role: 'Product Designer',
        avatarUrl: 'https://pagedone.io/asset/uploads/1696229994.png',
        rating: 4.9,
        quote: 'Graças a Ekhytera, sinto-me mais informado e confiante sobre minhas decisões relacionadas a hardware do que nunca.',
    },
];


export default function Testimonials() {



    return (
        <>

            <section className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <span className="text-sm text-zinc-400 font-medium text-center block mb-2">DEPOIMENTOS</span>
                        <h2 className="text-4xl text-center font-bold text-zinc-400">< HTMLContent /> + Usuários aprovam e recomendam a <span
                            className=" text-transparent bg-clip-text bg-gradient-to-tr bg-linear-to-tr from-[#79A7DD] to-[#415A77]">Ekhytera</span></h2>
                    </div>


                    <Swiper
                        modules={[Pagination, Autoplay]}
                        slidesPerView={1}
                        spaceBetween={32}
                        loop={true}
                        centeredSlides={true}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="mySwiper mb-16"
                    >

                        {testimonialData.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>

                                <div className="group bg-zinc-900/50 bg-clip-padding backdrop-filter backdrop-blur-sm border-1 border-zinc-800 rounded-xl p-6 transition-all duration-500 w-full mx-auto hover:border-gray-700 [&.swiper-slide-active]:border-gray-700 hover:shadow-[0px_0px_45px_-22px_#969fff]">
                                    <div>
                                        <div className="flex items-center mb-7 gap-2 text-amber-500">
                                            <svg className="w-5 h-5" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z" fill="#79A7DD" />
                                            </svg>
                                            <span className="text-base font-semibold text-[#79A7DD]">{testimonial.rating}</span>
                                        </div>
                                        <p className="text-base text-gray-400 leading-6 transition-all duration-500 pb-8 group-hover:text-blue-00 [&.swiper-slide-active]:text-gray-800">
                                            {testimonial.quote}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-5 border-t border-solid border-gray-200 pt-5">
                                        <img className="rounded-full h-10 w-10 object-cover" src={testimonial.avatarUrl} alt="avatar" />
                                        <div>
                                            <h5 className="text-gray-400 font-medium transition-all duration-500 mb-1">{testimonial.name}</h5>
                                            <span className="text-sm leading-4 text-gray-500">{testimonial.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

        </>
    )
}
