import { toast } from "react-toastify";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import React from "react";

interface DescriptionProps {
    visitor: boolean;
    desc: string | null | undefined;
}

function Description({ visitor, desc }: DescriptionProps) {
    const { auth } = useAuth();
    const [descricao, setDescricao] = useState('');
    const [charCount, setCharCount] = useState(0);

    // ✅ Memoizar função para evitar re-criação
    const handleUpdateDescription = useCallback(async (descricao: string) => {
        if (descricao === auth?.descricao) return;

        // ✅ Permitir valores vazios/nulos
        let processedDescription = descricao;
        if (descricao.trim()) {
            processedDescription = descricao.trim().replace(/(\r?\n){3,}/g, '\n\n\n');
        } else {
            processedDescription = "";
        }

        try {
            const req = await api.patch('/update-user', { descricao: processedDescription }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!req.data.ok) {
                throw new Error("Falha ao atualizar descrição")
            }

            setDescricao(processedDescription);

            const message = processedDescription 
                ? "Sua descrição foi salva" 
                : "Descrição removida com sucesso";

            toast.success(message, {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            })

        } catch (error) {
            setDescricao(auth?.descricao || '');

            if (error instanceof AxiosError && error.response) {
                toast.error(error.response.data.message, {
                    position: "bottom-right",
                    autoClose: 4000,
                    pauseOnHover: false,
                    theme: 'dark'
                });
            } else {
                toast.error("Erro ao salvar! Tente novamente", {
                    position: "bottom-right",
                    autoClose: 4000,
                    pauseOnHover: false,
                    theme: 'dark'
                });
            }
        }
    }, [auth?.descricao]);

    // ✅ Memoizar função de atualização do contador
    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setDescricao(value);
        setCharCount(value.length);
    }, []);

    useEffect(() => {
        const authDesc = auth?.descricao || "";
        setDescricao(authDesc);
        setCharCount(authDesc.length);
    }, [auth?.descricao]);

    return (
        <div className="mt-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <label className="text-white">Descrição </label>
                {!visitor && <span className="text-gray-300">{charCount}/300</span>}
            </div>
            {!visitor ?
                <textarea
                    placeholder="Adicione uma descrição para o seu perfil..."
                    className="block w-full h-30 rounded-md bg-white/5 px-3 py-2 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 resize-none scroll-profile"
                    value={descricao}
                    onChange={handleChange}
                    onBlur={(e) => handleUpdateDescription(e.target.value)}
                    maxLength={300}
                />
                :
                <p className="break-words whitespace-pre-line w-full text-gray-300 border-l-2 pl-2 py-2 scroll-profile text-justify">{desc || "Sem descrição"}</p>
            }
        </div>
    )
}

// ✅ Memoizar o componente para evitar re-renders quando props não mudam
export default React.memo(Description);