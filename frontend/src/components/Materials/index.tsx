

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
                                            <li>
                                                <a 
                                                    href="https://edisciplinas.usp.br/pluginfile.php/177793/mod_resource/content/1/Introducao_a_Informatica.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Introdução a Informática
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    href="https://home.ufam.edu.br/salles/arquivos/2010.1/Livro%20-%20Arquitetura%20e%20Organizacao%20de%20Computadores%20-%208%20edicao%20-%20William%20Stallings.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Arquitetura de Computadores
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    href="https://wiki.inf.ufpr.br/maziero/lib/exe/fetch.php?media=so:so-livro.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Sistemas Operacionais
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    href="https://www.docdroid.net/ZlFoHpu/montagem-e-manutencao-de-computadores-laercio-vasconcelos-pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Montagem e Manutenção de Computadores
                                                </a>
                                            </li>
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
                                            <li>
                                                <a 
                                                    href="https://python.nilo.pro.br/livro/introducao-a-programacao-com-python-3ed.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Introdução a Programação Básica
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    href="https://www.ime.usp.br/~pf/algoritmos/aulas/footnotes/cormen.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Algoritmos e Estrutura de Dados
                                                </a>
                                            </li>
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
                                            <li>
                                                <a 
                                                    href="https://www.ic.unicamp.br/~meidanis/courses/mc336/2009s2/prolog/estruturas-de-dados.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Teoria da Computação
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    href="https://www.ime.usp.br/~elo/IntroducaoComputacao.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Lógica para Computação
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    href="https://www.dcc.ufrj.br/~fabiom/mab225/04teoria.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Complexidade Computacional
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    href="https://www.ime.usp.br/~finger/mac0444/ep/automata-theory.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Autômatos e Linguagens Formais
                                                </a>
                                            </li>
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
                                            <li>
                                                <a 
                                                    href="https://www.ime.usp.br/~pf/mac0444/apostilas/discretebook.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Matemática Discreta
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    href="https://www.ime.usp.br/~song/mac2166/book.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Conjuntos Numéricos
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    href="https://www.ufrgs.br/reamat/CalculoNumerico/livro-py/livro.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Cálculo I
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    href="https://www.ime.usp.br/~yambar/livroEstatistica.pdf" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Estatística e Probabilidade
                                                </a>
                                            </li>
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
                                            <li>
                                                <a 
                                                    href="https://github.com/Universidade-Livre/ciencia-da-computacao" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Universidade-Livre / ciencia-da-computacao
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    href="https://github.com/Universidade-Livre/matematica" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-gray-400 cursor-pointer transition-colors duration-300"
                                                >
                                                    Universidade-Livre / matematica
                                                </a>
                                            </li>
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