"use client";

import { useState } from "react";
import { Calendar, Filter, Search } from "lucide-react";

const reservationsMock = [
  {
    id: 1,
    logement: "Appartement Moderne - Centre Ville",
    client: "Yassine B.",
    date: "12 Jan 2025 → 15 Jan 2025",
    statut: "confirmée",
    prix: "420€",
    image: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=600",
  },
  {
    id: 2,
    logement: "Studio Cozy - Quartier Hassan",
    client: "Sofia M.",
    date: "2 Fev 2025 → 5 Fev 2025",
    statut: "en attente",
    prix: "190€",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600",
  },
  {
    id: 3,
    logement: "Villa Luxe - Rabat",
    client: "Omar A.",
    date: "20 Mars 2025 → 27 Mars 2025",
    statut: "annulée",
    prix: "0€",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600",
  },
];

const statusColors= {
  confirmée: "bg-green-100 text-green-700",
  "en attente": "bg-yellow-100 text-yellow-700",
  annulée: "bg-red-100 text-red-700",
};

export default function ReservationsPage() {
  const [filter, setFilter] = useState("tous");
  const [search, setSearch] = useState("");

  const filtered = reservationsMock.filter((res) => {
    const matchStatus = filter === "tous" || res.statut === filter;
    const matchSearch =
      res.client.toLowerCase().includes(search.toLowerCase()) ||
      res.logement.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Réservations</h1>
        <p className="text-gray-500">Gérez toutes les réservations de vos logements.</p>
      </div>

      {/* FILTERS */}
      <div className="flex items-center gap-4 flex-wrap bg-white p-4 rounded-xl shadow-sm border">

        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher un client ou logement…"
            className="w-full border rounded-lg py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-blue-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status filter */}
        <select
          className="border rounded-lg py-2 px-3 text-sm bg-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="tous">Tous les statuts</option>
          <option value="confirmée">Confirmées</option>
          <option value="en attente">En attente</option>
          <option value="annulée">Annulées</option>
        </select>

        {/* Date filter (frontend only) */}
        <button className="flex items-center gap-2 bg-gray-100 border px-3 py-2 rounded-lg text-sm hover:bg-gray-200">
          <Calendar className="h-4 w-4" /> Dates
        </button>

        <button className="flex items-center gap-2 bg-gray-100 border px-3 py-2 rounded-lg text-sm hover:bg-gray-200">
          <Filter className="h-4 w-4" /> Plus de filtres
        </button>
      </div>

      {/* RESERVATIONS TABLE */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-600 text-sm">
              <th className="p-4">Logement</th>
              <th className="p-4">Client</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Statut</th>
              <th className="p-4">Prix</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((reservation) => (
              <tr
                key={reservation.id}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={reservation.image}
                    className="h-12 w-12 rounded-lg object-cover"
                    alt="logement"
                  />
                  <span className="font-medium text-gray-800">
                    {reservation.logement}
                  </span>
                </td>

                <td className="p-4 text-gray-700">{reservation.client}</td>

                <td className="p-4 text-gray-500">{reservation.date}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[reservation.statut]}`}
                  >
                    {reservation.statut}
                  </span>
                </td>

                <td className="p-4 font-semibold text-gray-700">
                  {reservation.prix}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-500">Aucune réservation trouvée.</div>
        )}
      </div>

    </div>
  );
}
