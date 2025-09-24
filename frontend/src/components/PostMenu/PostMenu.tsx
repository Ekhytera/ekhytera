import { useState, useRef, useEffect } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { GoPencil } from 'react-icons/go';
import { IoTrashOutline } from 'react-icons/io5';
import { useAuth } from '../../contexts/AuthContext';

interface PostMenuProps {
    onEdit: () => void;
    onDelete: () => void;
    userId: number;
}

function PostMenu({ onEdit, onDelete, userId }: PostMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { auth } = useAuth();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                isOpen &&
                menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setConfirmDelete(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
        setConfirmDelete(false);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={handleToggleMenu}
                ref={buttonRef}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full"
            >
                <EllipsisHorizontalIcon className="w-5 h-5" />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => {
                            setIsOpen(false);
                            setConfirmDelete(false);
                        }}
                    />
                    <div
                        ref={menuRef}
                        className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-20 overflow-hidden"
                    >
                        {
                        (auth?.cargo === 'user' || auth?.id_usuario == userId) &&
                            <button
                                onClick={() => {
                                    onEdit();
                                    setIsOpen(false);
                                    setConfirmDelete(false);
                                }}
                                className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                            >
                                <GoPencil size={18} />
                                <span className="text-sm font-medium">Editar post</span>
                            </button>}
                        <div className="relative h-12">

                            <button
                                onClick={() => setConfirmDelete(true)}
                                className={`absolute left-0 top-0 w-full h-12 px-4 py-3 text-left flex items-center gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300
                                    ${confirmDelete ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}
                                `}
                            >
                                <IoTrashOutline size={18} />
                                <span className="text-sm font-medium">Deletar post</span>
                            </button>

                            <button
                                onClick={() => {
                                    onDelete();
                                    setIsOpen(false);
                                    setConfirmDelete(false);
                                }}
                                className={`absolute left-0 top-0 w-full h-12 px-4 py-3 text-left flex items-center gap-3 text-red-500 bg-red-500/10 hover:bg-red-500/20 hover:text-red-600 transition-all duration-300
                                    ${confirmDelete ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
                                `}
                            >
                                <span className="text-sm font-semibold">Confirmar exclusão</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default PostMenu;