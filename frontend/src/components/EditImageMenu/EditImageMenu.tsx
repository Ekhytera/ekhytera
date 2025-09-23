import { useState, useRef, useCallback } from 'react';
import { GoPencil } from 'react-icons/go';
import { IoImageOutline, IoTrashOutline } from 'react-icons/io5';
import { MdOutlineAccountBox } from 'react-icons/md';
import React from 'react';

interface EditImageMenuProps {
    onEditBanner: (file: File) => void;
    onEditProfile: (file: File) => void;
    onRemoveBanner: () => void;
    onRemoveProfile: () => void;
}

function EditImageMenu({ onEditBanner, onEditProfile, onRemoveBanner, onRemoveProfile }: EditImageMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const profileInputRef = useRef<HTMLInputElement>(null);

    // ✅ Memoizar função para evitar re-criação
    const handleFileChange = useCallback((
        event: React.ChangeEvent<HTMLInputElement>, 
        callback: (file: File) => void
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            callback(file);
            setIsOpen(false);
        }
    }, []);

    // ✅ Memoizar handlers
    const handleBannerClick = useCallback(() => bannerInputRef.current?.click(), []);
    const handleProfileClick = useCallback(() => profileInputRef.current?.click(), []);
    
    const handleRemoveBanner = useCallback(() => {
        onRemoveBanner();
        setIsOpen(false);
    }, [onRemoveBanner]);
    
    const handleRemoveProfile = useCallback(() => {
        onRemoveProfile();
        setIsOpen(false);
    }, [onRemoveProfile]);

    const handleToggleMenu = useCallback(() => setIsOpen(!isOpen), [isOpen]);
    const handleCloseMenu = useCallback(() => setIsOpen(false), []);

    const handleBannerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => 
        handleFileChange(e, onEditBanner), [handleFileChange, onEditBanner]
    );
    
    const handleProfileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => 
        handleFileChange(e, onEditProfile), [handleFileChange, onEditProfile]
    );

    // ✅ Memoizar array de opções
    const menuOptions = React.useMemo(() => [
        {
            icon: <IoImageOutline size={18} />,
            label: "Editar banner",
            onClick: handleBannerClick,
            type: "edit" as const
        },
        {
            icon: <MdOutlineAccountBox size={18} />,
            label: "Editar foto de perfil",
            onClick: handleProfileClick,
            type: "edit" as const
        },
        {
            icon: <IoTrashOutline size={18} />,
            label: "Remover banner",
            onClick: handleRemoveBanner,
            type: "remove" as const
        },
        {
            icon: <IoTrashOutline size={18} />,
            label: "Remover foto de perfil",
            onClick: handleRemoveProfile,
            type: "remove" as const
        }
    ], [handleBannerClick, handleProfileClick, handleRemoveBanner, handleRemoveProfile]);

    return (
        <div className="relative">
            <button
                onClick={handleToggleMenu}
                className="bg-gray-900 rounded-md px-2 py-1 hover:text-[#79A7DD] text-[#E0E1DD] transition-colors duration-200 flex items-center"
            >
                <GoPencil size={20} className="mr-2" />
                Editar
            </button>

            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={handleCloseMenu}
                    />
                    
                    <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-20 overflow-hidden">
                        
                        <div className="py-2">
                            {menuOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={option.onClick}
                                    className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors duration-200 ${
                                        option.type === 'remove' 
                                            ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300' 
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    {option.icon}
                                    <span className="text-sm font-medium">{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            <input
                ref={bannerInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleBannerChange}
                className="hidden"
            />
            <input
                ref={profileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleProfileChange}
                className="hidden"
            />
        </div>
    );
}

// ✅ Memoizar o componente
export default React.memo(EditImageMenu);