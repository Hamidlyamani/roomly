'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import { ICONS } from "./icons";
import Image from 'next/image';






export default function DashboardLayout({ children, navItems, theme }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const colors = {
    sidebarBg: theme?.sidebarBg || "bg-slate-900",
    sidebarText: theme?.sidebarText || "text-slate-300",
    activeBg: theme?.activeBg || "bg-slate-700",
    activeText: theme?.activeText || "text-white",
    hoverBg: theme?.hoverBg || "bg-sec",
    hoverText: theme?.hoverText || "hover:text-white",
  };



  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside
        className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed inset-y-0 left-0 z-50 w-64 ${colors.sidebarBg}  text-white 
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center px-4 text-2xl font-bold">
            <img src="/imgs/logo.png" alt='rommly' width={0}
                          height={0}
                          sizes="100vw"
                          className="w-20 white_filter h-auto" />
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
             
             const IconComponent = ICONS[item.icon];
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors
                    ${isActive 
                      ? `${colors.activeBg} ${colors.activeText}` 
                      : `${colors.sidebarText} hover:bg-${colors.hoverBg} ${colors.hoverText}`
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <IconComponent className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between bg-white px-4 shadow-sm lg:px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700 lg:hidden"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Dynamic page title */}
          <h1 className="text-xl font-semibold text-gray-800">
            {navItems.find(item => item.href === pathname)?.name || "Dashboard"}
          </h1>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Admin User</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="Avatar"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
