import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { IoSettingsOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";



function Perfil() {

    const { auth } = useAuth();
    const banner = 'https://www.womantowomanmentoring.org/wp-content/uploads/placeholder.jpg';
    const foto = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

    const educationalContent = [
        {
            title: "Como escolher fonte de alimentação",
            type: "Guia",
            difficulty: "Iniciante"
        },
        {
            title: "Overclock seguro para iniciantes",
            type: "Tutorial",
            difficulty: "Intermediário"
        },
        {
            title: "Refrigeração líquida vs ar",
            type: "Comparativo",
            difficulty: "Avançado"
        }
    ];

    const formatarData = (dataString?: string | Date) => {
        if (!dataString) return "";
        const date = typeof dataString === "string" ? new Date(dataString) : dataString;
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <>
            <main className="w-full max-w-6xl mx-auto mt-25 mb-5 bg-gray-900/50 border-2 border-gray-900 rounded-md backdrop-blur-2xl">
                <section className="flex items-center relative">
                    <button className="bg-gray-900 rounded-md px-2 py-1 absolute top-2 left-5 hover:text-[#79A7DD] text-[#E0E1DD] transition-colors duration-200 flex items-center">
                        <GoPencil size={20} className="mr-2"/>
                        Editar
                    </button>

                    <img src={banner} alt="banner" className="w-full h-45 object-cover rounded-t-lg" />

                    <img src={foto || auth?.endereco_imagem} alt="foto de perfil do usuario" className="w-30 h-30 xl:w-40 xl:h-40 rounded-full absolute left-10 -bottom-10 border-gray-900 border-2" />
                </section>

                <div className="flex flex-col md:flex-row w-full mt-15 px-5 gap-4">
                    <section className="flex flex-col flex-1 w-full">
                        <div className="w-full max-w-xl">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl text-white font-semibold">{auth?.nome_usuario}</h1>
                                <p className="text-gray-300">Entrou em: {formatarData(auth?.criado_em)}</p>
                            </div>
                            <p className="text-gray-300">{auth?.email}</p>
                        </div>

                        <div className="mt-5 flex flex-col gap-2">
                            <label className="text-white">Descrição </label>
                            <textarea className="block w-full h-30 rounded-md bg-white/5 px-3 py-2 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 resize-none"></textarea>
                        </div>

                        <div className="mt-5 md:mt-auto">
                            <button className="text-gray-300 flex items-center cursor-pointer hover:text-gray-400 hover:underline underline-offset-4 duration-200">
                                Configurações
                                <IoSettingsOutline className="ml-2" />
                            </button>
                        </div>
                    </section>

                    <hr className="block md:hidden text-gray-500" />

                    <section className="flex flex-col flex-1 w-full">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h1 className="text-white text-2xl font-semibold">Conteúdos salvos</h1>
                            <div className="space-y-4 mt-2">
                                {educationalContent.map((content, index) => (
                                    <div key={index} className="group cursor-pointer">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-green-400 font-medium">{content.type}</span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${content.difficulty === 'Iniciante' ? 'bg-green-500/20 text-green-400' :
                                                content.difficulty === 'Intermediário' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'
                                                }`}>
                                                {content.difficulty}
                                            </span>
                                        </div>
                                        <h3 className="text-white font-medium group-hover:text-green-300 transition-colors">
                                            {content.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-4 text-green-400 hover:text-green-300 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                                Ver todos
                                <ChevronRightIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </section>
                </div>

                <hr className="m-5 text-gray-500" />

                <section className="px-5 pb-5">
                    <h1 className="text-2xl text-white font-semibold">Histórico de montagem</h1>

                    <p className="text-gray-300 mt-5">Nenhuma montagem foi realizada</p>

                    <Link
                        to={'/montagem'}
                        className="text-[#79A7DD] hover:text-[#E0E1DD] transition-colors duration-200 underline underline-offset-4 flex items-center"
                    >
                        Faça sua primeira montagem
                        <ChevronRightIcon className="w-4 h-4" />
                    </Link>
                </section>

            </main>
        </>
    )
}

export default Perfil