"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function LoginDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2 text-sm font-medium hover:bg-black/80 transition-all"
      >
        Connexion
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right animate-in fade-in zoom-in bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
          <ul className="flex flex-col">
            <li>
              <Link
                href="/login_student"
                className="block px-4 py-3 hover:bg-gray-100 transition-all text-gray-800 text-sm"
              >
                Etudiant
              </Link>
            </li>

            <li>
              <Link
                href="/login_owner"
                className="block px-4 py-3 hover:bg-gray-100 transition-all text-gray-800 text-sm"
              >
                Propriétaire
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
