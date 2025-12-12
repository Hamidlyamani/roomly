"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Eye,
} from "lucide-react";

const myLogements = [
  {
    id: 1,
    title: "Appartement moderne à Casablanca",
    city: "Casablanca",
    status: "Publié",
    occupancy: 87,
    image:
      "https://images.unsplash.com/photo-1600585154154-1f5e93f2aa19?auto=format&w=800",
  },
  {
    id: 2,
    title: "Studio cosy à Rabat",
    city: "Rabat",
    status: "En attente",
    occupancy: 42,
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&w=800",
  },
  {
    id: 3,
    title: "Maison traditionnelle à Marrakech",
    city: "Marrakech",
    status: "Publié",
    occupancy: 65,
    image:
      "https://images.unsplash.com/photo-1605283174574-0226f2a7ea99?auto=format&w=800",
  },
];

export default function MesLogementsPage() {
  const [search, setSearch] = useState("");

  const filtered = myLogements.filter((loc) =>
    loc.title.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    Publié: "bg-green-100 text-green-700",
    "En attente": "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mes logements</h1>
          <p className="text-gray-500 mt-1">
            Gérez les logements que vous avez publiés sur Roomly.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sec text-white text-sm font-medium hover:bg-prim shadow">
          <Plus className="h-4 w-4" />
          Ajouter un logement
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Rechercher dans mes logements..."
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((loc) => (
          <div
            key={loc.id}
            className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-4 flex flex-col"
          >
            {/* IMAGE */}
            <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
              <img
                src={loc.image}
                alt={loc.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* INFO */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {loc.title}
              </h3>
              <p className="text-gray-500 text-sm">{loc.city}</p>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[loc.status]
                  }`}
                >
                  {loc.status}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
              <button className="text-prim hover:text-sec flex items-center gap-1 text-sm">
                <Eye className="h-4 w-4" />
                Voir
              </button>

              <div className="flex gap-3">
                <button className="text-gray-600 hover:text-ter">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="text-gray-600 hover:text-red-600">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NO RESULTS */}
      {filtered.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          Aucun logement trouvé.
        </div>
      )}
    </div>
  );
}
