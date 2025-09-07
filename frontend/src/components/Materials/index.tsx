

export function Materiais() {
    return (
        <>
            <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0">
                <h2 className="mb-1 text-3xl font-semibold tracking-tight text-balance text-gray-100 pb-10">Materiais de estudo</h2>

                <div className="w-full">
                    <div className="flex flex-col w-full mb-10 sm:flex-row">
                        <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div className="relative h-full ml-0 mr-0 sm:mr-10 hover:shadow-[0px_0px_45px_-22px_#969fff] transition">
                                <div className="relative h-full p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
                                    <div className="flex items-start justify-start -mt-1">
                                        <h3 className="my-2  text-lg font-bold text-gray-100">Hardware</h3>
                                    </div>
                                    
                                    <p className="mb-2 text-gray-600">
                                        <ul className="flex flex-col gap-3">
                                            <li className="hover:text-gray-400 cursor-pointer">Introdução a Informática</li>
                                            <li className="hover:text-gray-400 cursor-pointer">Arquitetura de Computadores</li>
                                            <li className="hover:text-gray-400 cursor-pointer">Sistemas Operacionais</li>
                                            <li className="hover:text-gray-400 cursor-pointer">Montagem e Manutenção de Computadores</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="relative h-full ml-0 md:mr-10 hover:shadow-[0px_0px_45px_-22px_#969fff] transition">
                                <div className="relative h-full p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
                                    <div className="flex items-start justify-start -mt-1">
                                        <h3 className="my-2  text-lg font-bold text-gray-100">Software</h3>
                                    </div>
                                    
                                    <p className="mb-2 text-gray-600">
                                        <ul className="flex flex-col gap-3">
                                            <li className="hover:text-gray-400 cursor-pointer">Introdução a Programação Básica</li>
                                            <li className="hover:text-gray-400 cursor-pointer">Algoritmos e Estrutura de Dados</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full mb-5 sm:flex-row">
                        <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div className="relative h-full ml-0 mr-0 sm:mr-10 hover:shadow-[0px_0px_45px_-22px_#969fff] transition">
                                <div className="relative h-full p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
                                    <div className="flex items-start justify-start -mt-1">
                                        <h3 className="my-2  text-lg font-bold text-gray-100">Computação Teórica</h3>
                                    </div>
                                
                                    <p className="mb-2 text-gray-600">
                                        <ul className="flex flex-col gap-3">
                                            <li className="hover:text-gray-400 cursor-pointer">Introdução a Informática</li>
                                            <li className="hover:text-gray-400 cursor-pointer">Arquitetura de Computadores</li>
                                            <li className="hover:text-gray-400 cursor-pointer">Sistemas Operacionais</li>
                                            <li className="hover:text-gray-400 cursor-pointer">Montagem e Manutenção de Computadores</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div className="relative h-full ml-0 mr-0 sm:mr-10 hover:shadow-[0px_0px_45px_-22px_#969fff] transition">
                                <div className="relative h-full p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
                                    <div className="flex items-start justify-start -mt-1">
                                        <h3 className="my-2  text-lg font-bold text-gray-100">Matemática para Tecnologia</h3>
                                    </div>
                                    
                                    <p className="mb-2 text-gray-600">
                                        <ul className="flex flex-col gap-3">
                                            <li className="hover:text-gray-400 cursor-pointer">Matemática Discreta</li>
                                            <li className="hover:text-gray-400 cursor-pointer">Conjuntos Numéricos</li>
                                            <li className="hover:text-gray-400 cursor-pointer">Cálculo I</li>
                                            <li className="hover:text-gray-400 cursor-pointer">Estatistica e Probabilidade</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="relative h-full ml-0 md:mr-10 hover:shadow-[0px_0px_45px_-22px_#969fff] transition">
                                <div className="relative h-full p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
                                    <div className="flex items-start justify-start -mt-1">
                                        <h3 className="my-2  text-lg font-bold text-gray-100">Repositórios de estudos no GitHub</h3>
                                    </div>
                                    
                                    <p className="mb-2 text-gray-600">
                                        <ul className="flex flex-col gap-3">
                                            <li className="hover:text-gray-400 cursor-pointer">Universidade-Livre / ciencia-da-computacao </li>
                                            <li className="hover:text-gray-400 cursor-pointer">Universidade-Livre / matematica </li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}