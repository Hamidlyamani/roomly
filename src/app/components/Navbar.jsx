'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import LoginDropdown from './dropdown'
import { usePathname } from 'next/navigation'
import { useUserStore } from '../store/userStore'
import Userdropdown from './Userdropdown'
// import logo from '/imgs/logo.png'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Liste des logements', href: '/logements' },
  { name: 'Recommandation IA', href: '/recommandation_IA' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const user = useUserStore((state) => state.user);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 5); // seuil du scroll
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const pathname = usePathname();
  return (

    <header className={`fixed inset-x-0  z-50 transition-all duration-300 border border-b-1 border-gray-200  px-6  ${scrolled ? "degrad  px-0 " : "bg-transparent"}`}>
      <nav aria-label="Global" className="flex items-center justify-between  p-4 lg:px-8 ">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Roomly</span>

            <Image src="/imgs/logo.png" alt='rommly' width={0}
              height={0}
              sizes="100vw"
              className="w-16 h-auto" />

          </Link>

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
        <div className="hidden lg:h-full lg:flex lg:gap-x-12">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (

              <Link
                key={item.name}
                href={item.href}
                className={`text-sm/6 font-semibold h-full pb-1
              ${isActive
                    ? "product-badge"
                    : "hover:text-prim text-gray-600"
                  }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user?.role === "admin" ? (
            <Userdropdown
              user={{
                name: user.nom,
                role: user.role,
                email: user.email,
                navigation: [{ name: "Tableau de bord", href: "/admin" }],
              }}
            />
          ) : user?.role === "proprietaire" ? (
            <Userdropdown
              user={{
                name: user.nom,
                role: user.role,
                email: user.email,
                navigation: [{ name: "Tableau de bord", href: "/dashboard" }],
              }}
            />
          ) : user?.role === "etudiant"?(
            <Userdropdown
              user={{
                name: user.nom,
                role: user.role,
                email: user.email,
                navigation: [{ name: "Conversions", href: "/messages" },{ name: "Favorises", href: "favoris" }],
              }}
            />
          ): <LoginDropdown />
          }
         
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">  Roomly</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </Link>
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
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">

                <LoginDropdown />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header >
  )
}
