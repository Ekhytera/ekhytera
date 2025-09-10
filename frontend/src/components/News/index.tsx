import { useEffect, useState } from 'react';
import newsBg from '../../assets/news-bg.png'

const apiKey = 'pub_578735429f4fc6aeda0faf6e4e3fd66085b40';

/*  
 
<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8" id='destaques>
 
                            <a href=${newsList[i].link} target="_blank"
                                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                                <img id="news-img" src=${newsList[i].image_url} loading="lazy" alt=${newsList[i].title} className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
 
                                <div
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                                </div>
 
                                <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">${newsList[i].title}</span>
                            </a>
 
                            <a href=${newsList[i].link} target="_blank"
                                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                                <img src=${newsList[i].image_url} loading="lazy" alt=${newsList[i].title} className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
 
                                <div
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                                </div>
 
                                <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">${newsList[i].title}</span>
                            </a>
 
                            <a href="#"
                                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                                <img src=${newsList[i].image_url} loading="lazy" alt=${newsList[i].title} className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
 
                                <div
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                                </div>
 
                                <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">${newsList[i].title}</span>
                            </a>
 
                            <a href="#"
                                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                                <img src=${newsList[i].image_url} loading="lazy" alt=${newsList[i].title} className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
 
                                <div
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                                </div>
 
                                <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">${newsList[i].title}</span>
                            </a>
                        </div>
 
*/


interface NewsItem {
    title: string;
    link: string;
    image_url: string;
}

export const Noticias = () => {
    const [noticias, setNoticias] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNews = async () => {
            try {
                const storedNews = localStorage.getItem('noticias');
                const lastFetchDate = localStorage.getItem('lastFetchDate');
                const today = new Date().toISOString().split('T')[0];

                if (storedNews && lastFetchDate === today) {
                    setNoticias(JSON.parse(storedNews));
                    return;
                }

                
                const url = `https://newsdata.io/api/1/latest?country=br&category=technology&apikey=${apiKey}`;
                const resp = await fetch(url);
                const dados = await resp.json();

                if (dados.results) {
                    const listaDeNoticias = dados.results.slice(0, 4).map((noticia: { title: any; link: any; image_url: any; }) => ({
                        title: noticia.title,
                        link: noticia.link,
                        image_url: noticia.image_url || newsBg, 
                    }));

                    setNoticias(listaDeNoticias);
                    localStorage.setItem('noticias', JSON.stringify(listaDeNoticias));
                    localStorage.setItem('lastFetchDate', today);
                }
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
            } finally {
                setLoading(false);
            }
        };

        getNews();
    }, []); 

    if (loading) {
        return <p className="text-center text-white">Carregando notícias...</p>;
    }

    return (
        <>

            <section className="pb-40">
                <div className="bg-black dark:bg-black py-6 sm:py-8 lg:py-20">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
                            <div className="flex items-center gap-12">
                                <h2 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">Destaques da Semana</h2>
                                <p className="hidden max-w-screen-sm text-gray-500 dark:text-gray-500 md:block">
                                    As melhores notícias selecionadas a dedo para você.
                                </p>
                            </div>
                            <a href="#" className="inline-block rounded-lg border bg-white dark:bg-zinc-900 dark:border-none px-4 py-2 text-center text-sm  font-semibold text-gray-500 dark:text-gray-200 outline-none ring-indigo-300 transition duration-100 hover:bg-zinc-800 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base">
                                Ver Mais
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
                            
                            {noticias.map((noticia, index) => {
                                
                                const isWide = index === 1 || index === 2;
                                const gridClasses = isWide
                                    ? "md:col-span-2 md:h-80"
                                    : "md:h-80";

                                return (
                                    <a
                                        key={noticia.link || index}
                                        href={noticia.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg ${gridClasses}`}
                                    >
                                        <img src={noticia.image_url} loading="lazy" alt={noticia.title} className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110 brightness-40 " />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
                                        <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">{noticia.title}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}