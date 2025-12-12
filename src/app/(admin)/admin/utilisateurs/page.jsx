"use client";

import { useState } from "react";
import {
  Search,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "Yassine B.",
    email: "yassine@example.com",
    role: "Utilisateur",
    status: "Actif",
    date: "12 Jan 2025",
    avatar:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sofia El M.",
    email: "sofia@example.com",
    role: "Admin",
    status: "Suspendu",
    date: "03 Fev 2025",
    avatar:
      "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 3,
    name: "Omar A.",
    email: "omar@example.com",
    role: "Utilisateur",
    status: "En attente",
    date: "22 Jan 2025",
    avatar:
      "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");

  const filteredUsers = mockUsers.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "Tous" || user.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusColor = {
    Actif: "bg-green-100 text-green-700",
    Suspendu: "bg-red-100 text-red-700",
    "En attente": "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des utilisateurs
        </h1>
        <p className="text-gray-500 mt-1">
          Consultez, gérez et modérez les comptes utilisateurs.
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm focus:border-prim focus:ring-2 focus:ring-blue-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter */}
        <select
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-sec focus:ring-2 focus:ring-blue-200"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>Tous</option>
          <option>Actif</option>
          <option>Suspendu</option>
          <option>En attente</option>
        </select>

        {/* Add user */}
        <button className="flex items-center justify-center gap-2 rounded-lg bg-prim px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sec">
          <UserPlus className="h-4 w-4" />
          Ajouter un utilisateur
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Rôle
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Statut
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Inscription
              </th>
              <th className="px-6 py-3 text-right font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="flex items-center gap-3 px-6 py-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">
                    {user.name}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">{user.email}</td>

                <td className="px-6 py-4 text-gray-600">{user.role}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColor[user.status]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">{user.date}</td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-gray-600 hover:text-blue-600">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-yellow-600">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-red-600">
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No results */}
        {filteredUsers.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            Aucun utilisateur ne correspond à votre recherche.
          </div>
        )}
      </div>
    </div>
  );
}
