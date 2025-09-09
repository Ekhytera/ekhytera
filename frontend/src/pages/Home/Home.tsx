import Bento from "../../components/BentoGrid/BentoGrid";
import Card from "../../components/Cards/Card";
import Hero from "../../components/Hero/Hero";
import { Materiais } from "../../components/Materials";
import { lazy, Suspense, useState, useRef, useEffect } from 'react';
import { Noticias } from "../../components/News";

const Testimonials = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(import('../../components/Testimonial/Testimonial'));
        }, 2000);
    });
});



export default function Home() {
    return (
        <>
            <Hero />
            <Card />
            <Bento />
            <Suspense fallback={<h1 className="text-white font-xl">Carregando...</h1>}>
                <Testimonials />
            </Suspense>
            <Noticias />
            <Materiais />
        </>
    )
}