"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Home,
  Filter,
} from "lucide-react";

const mockLogements = [
  {
    id: 1,
    title: "Appartement moderne au centre de Casablanca",
    city: "Casablanca",
    owner: "Yassine B.",
    status: "Publié",
    date: "10 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&w=800",
  },
  {
    id: 2,
    title: "Maison traditionnelle à Marrakech",
    city: "Marrakech",
    owner: "Sofia El M.",
    status: "En attente",
    date: "02 Fév 2025",
    image:
      "https://images.unsplash.com/photo-1600585154154-1f5e93f2aa19?auto=format&w=800",
  },
  {
    id: 3,
    title: "Studio cosy à Rabat",
    city: "Rabat",
    owner: "Omar A.",
    status: "Refusé",
    date: "25 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&w=800",
  },
  {
    id: 4,
    title: "Appartement avec vue sur mer à Tanger",
    city: "Tanger",
    owner: "Sara L.",
    status: "Publié",
    date: "15 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&w=800",
  },
];

export default function LogementsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Toutes");

  const statusColors = {
    Publié: "bg-green-100 text-green-700",
    "En attente": "bg-yellow-100 text-yellow-700",
    Refusé: "bg-red-100 text-red-700",
  };

  const filteredLogements = mockLogements.filter((logement) => {
    const matchSearch =
      logement.title.toLowerCase().includes(search.toLowerCase()) ||
      logement.city.toLowerCase().includes(search.toLowerCase()) ||
      logement.owner.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filterStatus === "Toutes" || logement.status === filterStatus;

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des logements
        </h1>
        <p className="text-gray-500 mt-1">
          Consultez et modérez les annonces des propriétaires.
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Rechercher un logement..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter */}
        <select
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>Toutes</option>
          <option>Publié</option>
          <option>En attente</option>
          <option>Refusé</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Logement
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Ville
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Propriétaire
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Statut
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Publication
              </th>
              <th className="px-6 py-3 text-right font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredLogements.map((logement) => (
              <tr key={logement.id} className="hover:bg-gray-50 transition">
                {/* Logement */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={logement.image}
                    alt={logement.title}
                    className="h-12 w-16 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {logement.title}
                    </div>
                  </div>
                </td>

                {/* Ville */}
                <td className="px-6 py-4 text-gray-600">
                  {logement.city}
                </td>

                {/* Owner */}
                <td className="px-6 py-4 text-gray-600">
                  {logement.owner}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      statusColors[logement.status]
                    }`}
                  >
                    {logement.status}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-gray-600">
                  {logement.date}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-3">
                    <button className="text-gray-600 hover:text-blue-600">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-yellow-600">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-red-600">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* If no result */}
        {filteredLogements.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            Aucun logement ne correspond à votre recherche ou filtre.
          </div>
        )}
      </div>
    </div>
  );
}
