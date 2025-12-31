"use client";


import { useState } from "react";
import { Search, Star } from "lucide-react";

// Fake data
const avisMock = [
  {
    id: 1,
    logement: "Appartement Moderne - Centre Ville",
    client: "Yassine B.",
    note: 5,
    commentaire: "Séjour parfait ! Logement très propre et bien situé.",
    date: "12 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=600",
  },
  {
    id: 2,
    logement: "Studio Cozy - Quartier Hassan",
    client: "Sofia M.",
    note: 4,
    commentaire:
      "Très bon logement, juste un peu de bruit le soir mais sinon top !",
    date: "2 Fev 2025",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600",
  },
  {
    id: 3,
    logement: "Villa Luxe - Rabat",
    client: "Omar A.",
    note: 2,
    commentaire: "Déçu. Problème d’eau chaude et arrivée tardive du propriétaire.",
    date: "20 Mars 2025",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600",
  },
];

export default function AvisPage() {
  const [search, setSearch] = useState("");
  const [minNote, setMinNote] = useState(0);

  const filtered = avisMock.filter((avis) => {
    const matchSearch =
      avis.client.toLowerCase().includes(search.toLowerCase()) ||
      avis.logement.toLowerCase().includes(search.toLowerCase());
    const matchNote = avis.note >= minNote;
    return matchSearch && matchNote;
  });

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Avis & Évaluations
        </h1>
        <p className="text-gray-500">
          Consultez les avis laissés par vos clients sur vos logements.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 border rounded-xl shadow-sm flex flex-wrap items-center gap-4">

        {/* Search */}
        <div className="relative flex-1 min-w-[250px]">
          <Search className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            placeholder="Rechercher un client ou un logement…"
            className="w-full border rounded-lg py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-blue-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter by note */}
        <select
          className="border rounded-lg py-2 px-3 text-sm bg-white"
          value={minNote}
          onChange={(e) => setMinNote(Number(e.target.value))}
        >
          <option value={0}>Toutes les notes</option>
          <option value={5}>5 étoiles</option>
          <option value={4}>4 étoiles et plus</option>
          <option value={3}>3 étoiles et plus</option>
          <option value={2}>2 étoiles et plus</option>
          <option value={1}>1 étoile et plus</option>
        </select>
      </div>

      {/* LISTE DES AVIS */}
      <div className="space-y-4">
        {filtered.map((avis) => (
          <div
            key={avis.id}
            className="bg-white border rounded-xl shadow-sm p-4 flex gap-4 hover:bg-gray-50 transition"
          >
            {/* Image du logement */}
            <img
              src={avis.image}
              alt="logement"
              className="h-20 w-20 rounded-lg object-cover"
            />

            {/* Infos */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">
                  {avis.logement}
                </h3>
                <span className="text-sm text-gray-500">{avis.date}</span>
              </div>

              <p className="text-gray-600 text-sm mt-1">
                Par <span className="font-medium text-gray-800">{avis.client}</span>
              </p>

              {/* Stars */}
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < avis.note
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-700 font-medium">
                  {avis.note}/5
                </span>
              </div>

              {/* Commentaire */}
              <p className="text-gray-700 text-sm mt-3">{avis.commentaire}</p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Aucun avis ne correspond à votre recherche.
          </div>
        )}
      </div>

    </div>
  );
}
