import {
    HeartIcon,
    ChatBubbleOvalLeftIcon,
    ShareIcon,
    BookmarkIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import PostMenu from '../PostMenu/PostMenu';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';

interface PostProps {
    id_post: number;
    texto: string;
    imagem_post?: string;
    id_usuario: number;
    curtidas: number;
    status: number;
    criado_em: string;
    atualizado_em: string;
    tb_usuarios: {
        nome_usuario: string;
        endereco_imagem?: string;
        id_usuario: number;
    };
    isLiked: boolean;
    onLike: (postId: number) => void;
    fetchPosts: () => void;
}

export default function Post({
    id_post,
    texto,
    imagem_post,
    curtidas,
    criado_em,
    tb_usuarios,
    isLiked,
    onLike,
    fetchPosts
}: PostProps) {
    const getTimeAgo = (dateString: string): string => {
        const now = new Date();
        const postDate = new Date(dateString);
        const diffInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'agora';
        if (diffInMinutes < 60) return `${diffInMinutes}m`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
        return `${Math.floor(diffInMinutes / 1440)}d`;
    };

    const { auth } = useAuth();
    const [edit, setEdit] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const avatarUrl = tb_usuarios?.endereco_imagem
    ? tb_usuarios.endereco_imagem
    : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
    
    async function handleDelete() {
        try {
            const req = await api.delete(`delete-post/${id_post}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!req.data.ok) {
                throw new Error("Falha ao deletar post");
            }

            fetchPosts();
            toast.success("Post deletado com sucesso", {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Falha ao deletar o post", {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });
        }
    }

    async function handleEdit() {
        setEdit(texto);
        setIsEdit(true)
    }

    async function handleSaveEdit() {
        if (!edit.trim()) {
            toast.error("O post não pode estar vazio", {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
            }
            return;
        }

        if (texto === edit) {
            setIsEdit(false);
            return;
        }

        try {
            const req = await api.patch(`/edit-post/${id_post}`, { texto: edit }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!req.data.ok) {
                throw new Error("Falha ao editar post");
            }

            setEdit('');
            setIsEdit(false)
            fetchPosts();
            toast.success("Post editado com sucesso", {
                position: "bottom-right",
                autoClose: 4000,
                pauseOnHover: false,
                theme: 'dark'
            });

        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response.data.message, {
                    position: "bottom-right",
                    autoClose: 4000,
                    pauseOnHover: false,
                    theme: 'dark'
                });
            } else {
                toast.error("Erro! Tente novamente", {
                    position: "bottom-right",
                    autoClose: 4000,
                    pauseOnHover: false,
                    theme: 'dark'
                });
            }

            setIsEdit(false);
        }
    }

    useEffect(() => {
        if (isEdit && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
        }
    }, [isEdit]);

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-gray-900/70 transition-all duration-200">
            <div className="flex gap-3">
                <Link to={`/perfil/${tb_usuarios.nome_usuario}`}>
                    <img
                        src={avatarUrl}
                        alt={tb_usuarios.nome_usuario}
                        className="w-10 h-10 rounded-full"
                    />
                </Link>

                <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <div className='flex items-center space-x-2'>
                            <Link to={`/perfil/${tb_usuarios.nome_usuario}`}>
                                <h3 className="font-semibold text-white hover:text-gray-300 hover:underline duration-150">{tb_usuarios.nome_usuario}</h3>
                            </Link>
                            <span className="text-gray-500">·</span>
                            <span className="text-gray-500">{getTimeAgo(criado_em)}</span>
                        </div>
                        <div>
                            {tb_usuarios.id_usuario === auth?.id_usuario &&
                                <PostMenu onDelete={handleDelete} onEdit={handleEdit} />
                            }
                        </div>
                    </div>

                    {!isEdit ?
                        <p className="text-white mb-3 leading-relaxed whitespace-pre-line wrap-anywhere text-justify">{texto}</p>
                        :
                        <div className="mb-3">
                            <textarea
                                className="block w-full h-30 rounded-md bg-white/5 px-3 py-2 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 resize-none scroll-profile"
                                value={edit}
                                onChange={(e) => setEdit(e.target.value)}
                                ref={textareaRef}
                                onBlur={(e) => {
                                    const relatedTarget = e.relatedTarget as HTMLElement;
                                    if (!relatedTarget || !textareaRef.current?.contains(relatedTarget)) {
                                        handleSaveEdit();
                                    }
                                }}
                                placeholder="Digite seu post..."
                                maxLength={500}
                            />

                            <span className='text-gray-300 text-sm
                            '>{edit.length}/500</span>
                        </div>
                    }

                    {imagem_post && (
                        <img
                            src={imagem_post}
                            alt="Post image"
                            className="rounded-xl mb-3 max-w-full h-auto"
                        />
                    )}

                    <div className="flex items-center gap-4 sm:gap-8 text-gray-400">
                        <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                            <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition-colors">
                                <ChatBubbleOvalLeftIcon className="w-4 h-4" />
                            </div>
                            <span className="text-sm">0</span>
                        </button>


                        <button className="flex items-center gap-2 hover:text-yellow-400 transition-colors group">
                            <div className="p-2 rounded-full group-hover:bg-yellow-400/10 transition-colors">
                                <BookmarkIcon className="w-4 h-4" />
                            </div>
                            <span className="text-sm">0</span>
                        </button>

                        <button
                            onClick={() => onLike(id_post)}
                            className={`flex items-center gap-2 transition-colors group ${isLiked ? 'text-red-500' : 'hover:text-red-400'
                                }`}
                        >
                            <div className="p-2 rounded-full group-hover:bg-red-400/10 transition-colors">
                                {isLiked ? (
                                    <HeartSolidIcon className="w-4 h-4" />
                                ) : (
                                    <HeartIcon className="w-4 h-4" />
                                )}
                            </div>
                            <span className="text-sm">{curtidas}</span>
                        </button>

                        <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                            <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition-colors">
                                <ShareIcon className="w-4 h-4" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}