import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0D1B2A] text-[#E0E1DD] flex flex-col items-center justify-center px-4 relative overflow-hidden pt-20">
            <div
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage: "url('https://ekhytera.github.io/newEkhytera/imgs/img-noise-500x500.png')",
                    backgroundRepeat: 'repeat'
                }}
            />

            <div className="absolute top-20 left-[-200px] w-[400px] h-[800px] bg-gradient-radial from-[#79A7DD] to-transparent opacity-30 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-20 right-[-200px] w-[600px] h-[600px] bg-gradient-radial from-[#79A7DD] to-transparent opacity-20 blur-[150px] pointer-events-none" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-[#E0E1DD] to-[#79A7DD] bg-clip-text text-transparent mb-4">
                        404
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-[#79A7DD] to-[#415A77] mx-auto rounded-full" />
                </div>

                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E0E1DD]">
                        Página Não Encontrada
                    </h2>
                    <p className="text-lg md:text-xl text-[#E0E1DD]/80 leading-relaxed">
                        Ops! Parece que você se perdeu no universo da tecnologia.
                        A página que você está procurando não existe ou foi movida.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/"
                        className="bg-gradient-to-r from-[#79A7DD] to-[#415A77] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[#79A7DD]/25"
                    >
                        Voltar ao Início
                    </Link>

                    <Link
                        to="/montagem"
                        className="ring-2 ring-[#79A7DD] ring-inset text-[#79A7DD] font-semibold px-8 py-3 rounded-lg hover:bg-[#79A7DD] hover:text-white transition-all duration-300"
                    >
                        Monte seu PC
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-[#E0E1DD]/20">
                    <p className="text-[#E0E1DD]/60 mb-4">
                        Ou explore outras seções:
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link
                            to="/community"
                            className="text-[#79A7DD] hover:text-[#E0E1DD] transition-colors duration-200 underline underline-offset-4"
                        >
                            Comunidade
                        </Link>
                        <Link
                            to="/catalogo"
                            className="text-[#79A7DD] hover:text-[#E0E1DD] transition-colors duration-200 underline underline-offset-4"
                        >
                            Catálogo
                        </Link>
                        <Link
                            to="/sobre"
                            className="text-[#79A7DD] hover:text-[#E0E1DD] transition-colors duration-200 underline underline-offset-4"
                        >
                            Sobre Nós
                        </Link>
                    </div>
                </div>

                <div className="mt-8 opacity-30">
                    <div className="w-16 h-16 mx-auto border-2 border-[#79A7DD] rounded-full flex items-center justify-center">
                        <span className="text-2xl">⚡</span>
                    </div>
                </div>
            </div>
        </div>
    );
}