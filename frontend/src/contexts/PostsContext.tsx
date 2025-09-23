import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import api from "../services/api";
import { toast } from 'react-toastify';
import type { BackendPost } from "../types";

interface PostsContextProps {
    posts: BackendPost[];
    loading: boolean;
    loadingMore: boolean;
    newPostsCount: number;
    pagination: {
        page: number;
        nextPage: number;
        prevPage: number;
        hasMore: boolean;
    };
    setPosts: React.Dispatch<React.SetStateAction<BackendPost[]>>;
    fetchPosts: (page?: number) => Promise<void>;
    handleLike: (id_post: number) => Promise<void>;
    handleLoadMore: () => void;
    handleReset: () => void;
    resetPosts: () => void;
}

const PostsContext = createContext({} as PostsContextProps);

export function PostsProvider({ children }: { children: React.ReactElement }) {
    const [posts, setPosts] = useState<BackendPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [newPostsCount, setNewPostsCount] = useState(0);
    const [pagination, setPagination] = useState({
        page: 1,
        nextPage: 0,
        prevPage: 0,
        hasMore: false
    });

    // ✅ Função para buscar posts
    const fetchPosts = useCallback(async (page?: number) => {
        try {
            if (page && page > 1) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }

            const response = await api.get(`/list-posts?page=${page || 1}`, {
                headers: localStorage.getItem('token') ? {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                } : {}
            });

            if (response.data.ok) {
                if (page && page > 1) {
                    setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
                    setNewPostsCount(response.data.posts.length);
                } else {
                    setPosts(response.data.posts);
                    setNewPostsCount(0);
                }

                setPagination({
                    page: response.data.page,
                    nextPage: response.data.nextPage,
                    prevPage: response.data.prevPage,
                    hasMore: response.data.hasMore
                });
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Erro ao carregar posts', {
                position: "bottom-right",
                autoClose: 3000,
                theme: 'dark'
            });
        } finally {
            setTimeout(() => {
                setLoadingMore(false);
                setLoading(false);
            }, 100);
        }
    }, []);

    // ✅ Função para curtir/descurtir posts
    const handleLike = useCallback(async (id_post: number) => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            toast.warning('Faça login para curtir posts', {
                position: "bottom-right",
                autoClose: 3000,
                theme: 'dark'
            });
            return;
        }

        try {
            setPosts(prevPosts => {
                const currentPost = prevPosts.find(item => item.id_post === id_post);
                const endpoint = !currentPost?.isLiked ? `/add-like/${id_post}` : `/remove-like/${id_post}`;

                // Fazer requisição em background
                api.patch(endpoint, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).catch(error => {
                    console.error('Error updating like:', error);
                    
                    // Reverter em caso de erro
                    setPosts(revertPosts => 
                        revertPosts.map(post =>
                            post.id_post === id_post
                                ? {
                                    ...post,
                                    curtidas: post.isLiked ? post.curtidas + 1 : post.curtidas - 1,
                                    isLiked: !post.isLiked
                                }
                                : post
                        )
                    );
                    
                    toast.error('Erro ao curtir post', {
                        position: "bottom-right",
                        autoClose: 3000,
                        theme: 'dark'
                    });
                });

                // Atualizar UI otimisticamente
                return prevPosts.map(post =>
                    post.id_post === id_post
                        ? {
                            ...post,
                            curtidas: post.isLiked ? post.curtidas - 1 : post.curtidas + 1,
                            isLiked: !post.isLiked
                        }
                        : post
                );
            });

        } catch (error) {
            console.error('Error updating like:', error);
        }
    }, []);

    // ✅ Função para carregar mais posts
    const handleLoadMore = useCallback(() => {
        if (pagination.hasMore && !loadingMore) {
            fetchPosts(pagination.nextPage);
        }
    }, [pagination.hasMore, pagination.nextPage, loadingMore, fetchPosts]);

    // ✅ Função para resetar para primeira página
    const handleReset = useCallback(() => {
        if (!loading && !loadingMore) {
            setPagination(prev => ({ ...prev, page: 1, hasMore: false }));
            fetchPosts(1);
        }
    }, [loading, loadingMore, fetchPosts]);

    // ✅ Função para limpar posts (útil para logout/navegação)
    const resetPosts = useCallback(() => {
        setPosts([]);
        setLoading(true);
        setLoadingMore(false);
        setNewPostsCount(0);
        setPagination({
            page: 1,
            nextPage: 0,
            prevPage: 0,
            hasMore: false
        });
    }, []);

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <PostsContext.Provider
            value={{
                posts,
                loading,
                loadingMore,
                newPostsCount,
                pagination,
                setPosts,
                fetchPosts,
                handleLike,
                handleLoadMore,
                handleReset,
                resetPosts
            }}>
            {children}
        </PostsContext.Provider>
    );
}

/* eslint-disable react-refresh/only-export-components */
export function usePosts() {
    return useContext(PostsContext);
}