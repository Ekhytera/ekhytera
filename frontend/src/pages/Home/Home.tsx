import Bento from "../../components/BentoGrid/BentoGrid";
import Card from "../../components/Cards/Card";
import Hero from "../../components/Hero/Hero";
import { Materiais } from "../../components/Materials";
import { lazy, Suspense, useState, useRef, useEffect } from 'react';
import { Noticias } from "../../components/News";

const Testimonials = lazy<React.ComponentType>(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            import('../../components/Testimonial/Testimonial').then(module => {
                resolve({ default: module.default });
            });
        }, 2000);
    });
});


const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsIntersecting(true);
        setHasAnimated(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  return [ref, isIntersecting] as const;
};



export default function Home() {

    const [heroRef, heroVisible] = useIntersectionObserver();
    const [cardRef, cardVisible] = useIntersectionObserver();
    const [bentoRef, bentoVisible] = useIntersectionObserver();
    const [testimonialsRef, testimonialsVisible] = useIntersectionObserver();
    const [noticiasRef, noticiasVisible] = useIntersectionObserver();
    const [materiaisRef, materiaisVisible] = useIntersectionObserver();

    return (
        <>

            <div 
                ref={heroRef}
                className={`transition-all duration-1000 ease-out ${
                    heroVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                }`}
            >
                <Hero />
            </div>


            <div 
                ref={cardRef}
                className={`transition-all duration-1000 ease-out delay-200 ${
                    cardVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                }`}
            >
                <Card />
            </div>


            <div 
                ref={bentoRef}
                className={`transition-all duration-1000 ease-out delay-300 ${
                    bentoVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                }`}
            >
                <Bento />
            </div>

  
            <div 
                ref={testimonialsRef}
                className={`transition-all duration-1000 ease-out delay-400 ${
                    testimonialsVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                }`}
            >
                <Suspense fallback={
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#79A7DD]"></div>
                    </div>
                }>
                    <Testimonials />
                </Suspense>
            </div>


            <div 
                ref={noticiasRef}
                className={`transition-all duration-1000 ease-out delay-500 ${
                    noticiasVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                }`}
            >
                <Noticias />
            </div>


            <div 
                ref={materiaisRef}
                className={`transition-all duration-1000 ease-out delay-600 ${
                    materiaisVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                }`}
            >
                <Materiais />
            </div>
        </>
    )
}