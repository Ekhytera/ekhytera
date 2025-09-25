import { useAuth } from "../../contexts/AuthContext";
import {
    PhotoIcon,
    FaceSmileIcon
} from '@heroicons/react/24/outline';
import { toast } from "react-toastify";
import { useState, memo } from "react";
import api from "../../services/api";
import { AxiosError } from 'axios';
import { usePosts } from "../../contexts/PostsContext";

function PostCreator() {

    const { handleReset } = usePosts();
    const { auth, getUser } = useAuth();
    const [newPost, setNewPost] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitPost = async () => {
        if (!auth) {
            toast.warning('Faça login para fazer posts', {
                position: "bottom-right",
                autoClose: 3000,
                theme: 'dark'
            });
            return;
        }

        if (!newPost.trim()) {
            toast.error('Post não pode estar vazio', {
                position: "bottom-right",
                autoClose: 3000,
                theme: 'dark'
            });
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await api.post('/create-post', {
                texto: newPost.trim().replace(/(\r?\n){3,}/g, '\n\n\n')
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.ok) {
                toast.success('Post criado com sucesso!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    theme: 'dark'
                });

                handleReset();
                getUser();
                setNewPost('');
            }
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
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            handleSubmitPost();
        }
    };

    return (
        <>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
                <div className="flex gap-4">
                    <img
                        src={auth?.endereco_imagem
                            ? auth.endereco_imagem
                            : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                        }
                        alt="Your avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={auth
                                ? "O que você está construindo hoje?"
                                : "Faça login para fazer posts..."
                            }
                            disabled={!auth || isSubmitting}
                            className="w-full bg-transparent text-white placeholder-gray-400 text-lg resize-none border-none outline-none disabled:opacity-50 scroll-profile"
                            rows={3}
                            maxLength={500}
                        />

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                            <div className="flex gap-4">
                                <button
                                    className="text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                                    disabled={!auth}
                                >
                                    <PhotoIcon className="w-5 h-5" />
                                </button>
                                <button
                                    className="text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                                    disabled={!auth}
                                >
                                    <FaceSmileIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-400">
                                    {newPost.length}/500
                                </span>
                                <button
                                    onClick={handleSubmitPost}
                                    disabled={!auth || !newPost.trim() || isSubmitting || newPost.length > 500}
                                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                                >
                                    {isSubmitting ? 'Postando...' : 'Postar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(PostCreator)