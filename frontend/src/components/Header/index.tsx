'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { href } from 'react-router-dom'

const navigation = [
    { name: 'Montagem', href: '#' },
    { name: 'Educação', href: '#' },
    { name: 'Fórum', href: '#' },
    { name: 'Catálogo', href: '#' },
    { name: 'Promoções', href: '#' },
    { name: 'Sobre Nós', href: '#' }
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <svg width="40" height="40" viewBox="0 0 202 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M133.769 29.1158L116.015 45.5173C115.951 30.7051 115.908 15.8929 115.844 1.05957C121.769 1.05957 127.695 1.05957 133.62 1.08076C133.663 10.4258 133.727 19.7708 133.769 29.0946V29.1158Z" fill="white" stroke="white" stroke-miterlimit="10" />
                                <path d="M109.556 1.05957V22.6315H22.7638V87.3474H73.4495C65.7763 94.4462 58.0818 101.545 50.4086 108.665C33.9538 108.75 17.5204 108.835 1.06567 108.919V1.05957H109.556ZM94.9984 65.7754H35.318V41.5123H94.9984V65.7754Z" fill="white" stroke="white" stroke-miterlimit="10" />
                                <path d="M169.748 1.52578C148.434 22.3984 127.098 43.2923 105.784 64.165C90.6504 78.9983 75.4958 93.8105 60.3625 108.644C69.9754 108.601 79.5882 108.559 89.201 108.517C125.691 72.7895 162.203 37.0835 198.714 1.37744C189.059 1.41982 179.404 1.48339 169.748 1.52578Z" fill="white" stroke="white" stroke-miterlimit="10" />
                                <path d="M142.231 68.6361C146.835 63.7834 151.418 58.9308 156.022 54.0994C167.723 72.2808 179.446 90.4623 191.148 108.623C183.155 108.58 175.162 108.517 167.148 108.474C158.835 95.1878 150.523 81.9225 142.231 68.6361Z" fill="white" stroke="white" stroke-miterlimit="10" />
                            </svg>

                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="#" className="text-sm/6 font-semibold text-white">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-auto"
                                />
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-200"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-white/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                                    >
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </>
    )
}