'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Liste des logements', href: 'logements' },
  { name: 'Recommandation IA', href: 'recommandation_IA' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
   
      <header className="fixed inset-x-0 top-2 z-50 container mx-auto bg-[rgba(18,111,117,0.19)] backdrop-blur-[2px] backdrop-saturate-[180%] border border-[rgba(255,255,255,0.8)] rounded-[2rem]  shadow-[0_8px_32px_rgba(31,38,135,0.2),_inset_0_4px_20px_rgba(255,255,255,0.3)] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[rgba(255,255,255,0.1)] after:rounded-[2rem] after:backdrop-blur-[1px] after:shadow-[inset_-10px_-8px_0px_-11px_rgba(255,255,255,1),_inset_0px_-9px_0px_-8px_rgba(255,255,255,1)] after:opacity-60 after:z-[-1] after:filter-[blur(1px)_drop-shadow(10px_4px_6px_black)_brightness(115%)] after:pointer-events-none">
        
        <nav aria-label="Global" className="flex items-center justify-between  p-6 lg:px-8 ">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {/* <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              /> */}
              <span className='font-sans font-black text-purple-800'>Rommly</span>
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
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold ">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className="text-sm/6 font-semibold ">
              Se connecter <span aria-hidden="true">&rarr;</span>
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
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    Se connecter
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
  )
}
