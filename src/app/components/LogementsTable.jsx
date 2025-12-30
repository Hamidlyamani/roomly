"use client";

import { useEffect, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";

const STATUS_STYLES = {
  disponible: "bg-green-100 text-green-700",
  reserve: "bg-yellow-100 text-yellow-700",
  indisponible: "bg-red-100 text-red-700",
};

export default function LogementsTable() {
  const [logements, setLogements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogements = async () => {
      try {
        const res = await fetch("http://localhost:8000/logements/");
        const data = await res.json();
        setLogements(data);
      } catch (err) {
        console.error("Erreur chargement logements", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogements();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Chargement des logements...</p>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Titre</th>
            <th className="px-4 py-3 text-left">Localisation</th>
            <th className="px-4 py-3 text-left">Prix</th>
            <th className="px-4 py-3 text-left">Capacité</th>
            <th className="px-4 py-3 text-left">Statut</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {logements.map((logement) => (
            <tr
              key={logement.id}
              className="border-t hover:bg-gray-50 transition"
            >
              {/* Image */}
              <td className="px-4 py-3">
                <img
                  src={
                    logement.images?.find((img) => img.principale)?.url ||
                    "/placeholder.jpg"
                  }
                  alt={logement.titre}
                  className="w-16 h-12 object-cover rounded-lg"
                />
              </td>

              {/* Titre */}
              <td className="px-4 py-3 font-medium text-gray-800">
                {logement.titre}
              </td>

              {/* Localisation */}
              <td className="px-4 py-3 text-gray-500">
                {logement.localisation}
              </td>

              {/* Prix */}
              <td className="px-4 py-3">
                {logement.prix_mensuel} MAD
              </td>

              {/* Capacité */}
              <td className="px-4 py-3">
                {logement.capacite} pers.
              </td>

              {/* Statut */}
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    STATUS_STYLES[logement.statut]
                  }`}
                >
                  {logement.statut}
                </span>
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">
                  <button className="text-prim hover:text-sec">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-ter">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {logements.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          Aucun logement trouvé.
        </div>
      )}
    </div>
  );
}
