"use client";

import { useState } from "react";
import { Plus, Search, Folder, Edit, Trash2 } from "lucide-react";

const mockCategories = [
  {
    id: 1,
    name: "Appartements",
    count: 124,
    icon: Folder,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    name: "Maisons",
    count: 68,
    icon: Folder,
    color: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    name: "Studios",
    count: 45,
    icon: Folder,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 4,
    name: "Villas",
    count: 12,
    icon: Folder,
    color: "bg-red-100 text-red-700",
  },
];

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = mockCategories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Catégories</h1>
        <p className="text-gray-500 mt-1">
          Gérez les catégories utilisées pour classer les logements.
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Add category */}
        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Ajouter une catégorie
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((cat) => {
          const Icon = cat.icon;

          return (
            <div
              key={cat.id}
              className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${cat.color}`}>
                <Icon className="h-6 w-6" />
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {cat.name}
              </h3>

              {/* Count */}
              <p className="text-gray-600 text-sm mb-4">
                {cat.count} logements associés
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm">
                  <Edit className="h-4 w-4" />
                  Modifier
                </button>

                <button className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm">
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* If no result */}
      {filteredCategories.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          Aucune catégorie ne correspond à votre recherche.
        </div>
      )}
    </div>
  );
}
