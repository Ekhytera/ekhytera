'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FaUserLarge } from "react-icons/fa6";


const navigation = [
    { name: 'Montagem', href: '/montagem' },
    { name: 'Educação', href: '/educacao' },
    { name: 'Fórum', href: '/forum' },
    { name: 'Catálogo', href: '/catalogo' },
    { name: 'Promoções', href: '/promocoes' },
    { name: 'Sobre Nós', href: '/sobre' }
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { signed } = useAuth();

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-white/10 shadow-lg">
                <nav aria-label="Global" className="flex items-center justify-between p-4 sm:p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link to={"/"} className="-m-1.5 p-1.5 transition-transform hover:scale-105">
                            <span className="sr-only">Ekhytera</span>
                            <svg width="50" height="35" viewBox="0 0 202 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-opacity hover:opacity-80 sm:w-[60px] sm:h-[40px]">
                                <path d="M133.769 29.1158L116.015 45.5173C115.951 30.7051 115.908 15.8929 115.844 1.05957C121.769 1.05957 127.695 1.05957 133.62 1.08076C133.663 10.4258 133.727 19.7708 133.769 29.0946V29.1158Z" fill="white" stroke="white" strokeMiterlimit="10" />
                                <path d="M109.556 1.05957V22.6315H22.7638V87.3474H73.4495C65.7763 94.4462 58.0818 101.545 50.4086 108.665C33.9538 108.75 17.5204 108.835 1.06567 108.919V1.05957H109.556ZM94.9984 65.7754H35.318V41.5123H94.9984V65.7754Z" fill="white" stroke="white" strokeMiterlimit="10" />
                                <path d="M169.748 1.52578C148.434 22.3984 127.098 43.2923 105.784 64.165C90.6504 78.9983 75.4958 93.8105 60.3625 108.644C69.9754 108.601 79.5882 108.559 89.201 108.517C125.691 72.7895 162.203 37.0835 198.714 1.37744C189.059 1.41982 179.404 1.48339 169.748 1.52578Z" fill="white" stroke="white" strokeMiterlimit="10" />
                                <path d="M142.231 68.6361C146.835 63.7834 151.418 58.9308 156.022 54.0994C167.723 72.2808 179.446 90.4623 191.148 108.623C183.155 108.58 175.162 108.517 167.148 108.474C158.835 95.1878 150.523 81.9225 142.231 68.6361Z" fill="white" stroke="white" strokeMiterlimit="10" />
                            </svg>
                        </Link>
                    </div>

                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200 hover:bg-white/10 hover:text-white transition-colors duration-200"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:gap-x-6 xl:gap-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="relative text-sm font-semibold text-gray-200 hover:text-white transition-colors duration-200 group whitespace-nowrap"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {!signed ?
                            <Link
                                to={"/login"}
                                className="relative px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 whitespace-nowrap"
                            >
                                Log in
                                <span aria-hidden="true" className="ml-1">&rarr;</span>
                            </Link>
                            :
                            <Link
                                to={"/perfil"}
                                className="relative px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 whitespace-nowrap flex items-center justify-center"
                            >
                                Perfil <FaUserLarge className='ml-4' />
                            </Link>
                        }
                    </div>
                </nav>

                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 max-w-xs w-full overflow-y-auto bg-gray-900/95 backdrop-blur-md p-6 border-l border-white/10 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                                <span className="sr-only">Ekhytera</span>
                                <svg width="40" height="30" viewBox="0 0 202 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M133.769 29.1158L116.015 45.5173C115.951 30.7051 115.908 15.8929 115.844 1.05957C121.769 1.05957 127.695 1.05957 133.62 1.08076C133.663 10.4258 133.727 19.7708 133.769 29.0946V29.1158Z" fill="white" stroke="white" strokeMiterlimit="10" />
                                    <path d="M109.556 1.05957V22.6315H22.7638V87.3474H73.4495C65.7763 94.4462 58.0818 101.545 50.4086 108.665C33.9538 108.75 17.5204 108.835 1.06567 108.919V1.05957H109.556ZM94.9984 65.7754H35.318V41.5123H94.9984V65.7754Z" fill="white" stroke="white" strokeMiterlimit="10" />
                                    <path d="M169.748 1.52578C148.434 22.3984 127.098 43.2923 105.784 64.165C90.6504 78.9983 75.4958 93.8105 60.3625 108.644C69.9754 108.601 79.5882 108.559 89.201 108.517C125.691 72.7895 162.203 37.0835 198.714 1.37744C189.059 1.41982 179.404 1.48339 169.748 1.52578Z" fill="white" stroke="white" strokeMiterlimit="10" />
                                    <path d="M142.231 68.6361C146.835 63.7834 151.418 58.9308 156.022 54.0994C167.723 72.2808 179.446 90.4623 191.148 108.623C183.155 108.58 175.162 108.517 167.148 108.474C158.835 95-1878 150.523 81.9225 142.231 68.6361Z" fill="white" stroke="white" strokeMiterlimit="10" />
                                </svg>
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-200 hover:bg-white/10 hover:text-white transition-colors duration-200"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>

                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-white/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold text-gray-200 hover:bg-white/10 hover:text-white transition-all duration-200 hover:translate-x-1"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    {
                                        !signed ?
                                            <Link
                                                to={"/login"}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center"
                                            >
                                                Log in
                                            </Link>
                                            :
                                            <Link
                                                to={"/perfil"}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="-mx-3 rounded-lg px-3 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center flex items-center justify-center"
                                            >
                                                Perfil <FaUserLarge className='ml-4' />
                                            </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </>
    )
}