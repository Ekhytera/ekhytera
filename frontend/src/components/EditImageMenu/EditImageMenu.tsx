import { useState, useRef } from 'react';
import { GoPencil } from 'react-icons/go';
import { IoImageOutline, IoTrashOutline } from 'react-icons/io5';
import { MdOutlineAccountBox } from 'react-icons/md';

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

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>, 
        callback: (file: File) => void
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            callback(file);
            setIsOpen(false);
        }
    };

    const menuOptions = [
        {
            icon: <IoImageOutline size={18} />,
            label: "Editar banner",
            onClick: () => bannerInputRef.current?.click(),
            type: "edit" as const
        },
        {
            icon: <MdOutlineAccountBox size={18} />,
            label: "Editar foto de perfil",
            onClick: () => profileInputRef.current?.click(),
            type: "edit" as const
        },
        {
            icon: <IoTrashOutline size={18} />,
            label: "Remover banner",
            onClick: () => {
                onRemoveBanner();
                setIsOpen(false);
            },
            type: "remove" as const
        },
        {
            icon: <IoTrashOutline size={18} />,
            label: "Remover foto de perfil",
            onClick: () => {
                onRemoveProfile();
                setIsOpen(false);
            },
            type: "remove" as const
        }
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-900 rounded-md px-2 py-1 hover:text-[#79A7DD] text-[#E0E1DD] transition-colors duration-200 flex items-center"
            >
                <GoPencil size={20} className="mr-2" />
                Editar
            </button>

            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsOpen(false)}
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
                onChange={(e) => handleFileChange(e, onEditBanner)}
                className="hidden"
            />
            <input
                ref={profileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, onEditProfile)}
                className="hidden"
            />
        </div>
    );
}

export default EditImageMenu;