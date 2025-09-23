import { memo } from "react";
import { IoIosArrowDown } from 'react-icons/io';
import Post from '../../components/Post/Post';
import { usePosts } from '../../contexts/PostsContext';
import type { BackendPost } from "../../types";

interface ListPostProps {
    // ✅ Props para modo Perfil
    isPerfil?: boolean;
    userPosts?: BackendPost[];
    postsLoading?: boolean;
    onUserPostLike?: (id_post: number) => Promise<void>;
    
    // ✅ Props opcionais para modo Community
    showPagination?: boolean;
}

function ListPost({ 
    isPerfil = false, 
    userPosts = [], 
    postsLoading = false,
    onUserPostLike,
    showPagination = true
}: ListPostProps) {

    const {
        loading: communityLoading, loadingMore,
        posts: communityPosts,
        newPostsCount,
        handleLike: communityHandleLike,
        fetchPosts,
        pagination,
        handleLoadMore,
        handleReset
    } = usePosts();

    const posts = isPerfil ? userPosts : communityPosts;
    const loading = isPerfil ? postsLoading : communityLoading;
    const handleLike = isPerfil ? (onUserPostLike || (() => Promise.resolve())) : communityHandleLike;

    // ✅ Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                <span className="ml-3 text-gray-400">Carregando posts...</span>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-400 text-lg">Nenhum post encontrado</p>
                <p className="text-gray-500 mt-2">
                    {isPerfil 
                        ? "Este usuário ainda não fez posts" 
                        : "Seja o primeiro a compartilhar algo!"
                    }
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                {posts.map((post, index) => {
                    const isNewPost = !isPerfil && newPostsCount > 0 && index >= (posts.length - newPostsCount);

                    return (
                        <div
                            key={post.id_post}
                            className={`transition-all duration-300 ${
                                isNewPost 
                                    ? 'animate-slideInUp opacity-0' 
                                    : 'opacity-100'
                            }`}
                            style={isNewPost ? {
                                animation: `slideInUp 0.3s ease-out ${(index - (posts.length - newPostsCount)) * 0.05}s forwards`
                            } : {}}
                        >
                            <Post
                                {...post}
                                isLiked={post.isLiked}
                                onLike={handleLike}
                                fetchPosts={fetchPosts}
                                pagination={pagination}
                            />
                        </div>
                    );
                })}
            </div>

            {!isPerfil && loadingMore && (
                <div className="flex justify-center items-center py-4 animate-pulse">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                    <span className="ml-3 text-gray-400">Carregando mais posts...</span>
                </div>
            )}

            {!isPerfil && showPagination && (posts.length > 10 || pagination.hasMore) && (
                <div className='flex'>
                    <button
                        className='text-white mx-auto cursor-pointer hover:bg-gray-600 duration-200 flex items-center font-semibold bg-gray-600/80 py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all'
                        onClick={pagination.hasMore ? handleLoadMore : handleReset}
                        disabled={loadingMore}
                    >
                        {loadingMore
                            ? 'Carregando...'
                            : pagination.hasMore
                                ? 'Ver Mais'
                                : 'Ver Menos'
                        }
                        <IoIosArrowDown className={`ml-2 transition-transform duration-200 ${
                            pagination.hasMore ? 'rotate-0' : 'rotate-180'
                        } ${loadingMore ? 'animate-pulse' : ''}`} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default memo(ListPost);