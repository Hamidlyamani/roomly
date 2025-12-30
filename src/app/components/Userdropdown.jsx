"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { useRouter } from "next/navigation";

export default function Userdropdown({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const route = useRouter()
  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


const handleLogout = async () => {
  await fetch("/api/logout", { method: "POST" });

  // Clear Zustand or redirect
  useUserStore.getState().clearUser();
  route.push("/");
};


  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-2xl px-2 py-1 bg-purple-300 hover:bg-purple-400 transition"
      >
        <img
          src="/imgs/avatar.png"
          alt="avatar"
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-sm font-semibold ">
            {user.name}
          </span>
          <span className="text-xs text-gray-600">
            {user.role}
          </span>
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-52 rounded-xl bg-zinc-900/95 backdrop-blur shadow-xl border border-white/10">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>

          <div className="py-2">
             {user.navigation?.map((item,i) => {
                      return  (
                        
                       <Link
                        key={i}
                        href={item.href}
                        className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition"
                      >
                        {item.name}
                      </Link>
                      )})}
          </div>

          <div className="border-t border-white/10">
            <button
              onClick={() => handleLogout()}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
