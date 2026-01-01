"use client";
import { useState } from "react";
import { FaCheck, FaTimes, FaClock } from "react-icons/fa";

export default function StatusUpdater({ demandeId, currentStatus, onStatusUpdate }) {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/demandes/${demandeId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut: newStatus }),
      });

      if (res.ok) {
        const updatedDemande = await res.json();
        // onStatusUpdate permet de rafraîchir la liste dans le composant parent
        onStatusUpdate(demandeId, newStatus);
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    } finally {
      setLoading(false);
    }
  };

  if (currentStatus === "confirme") {
    return (
      <span className="flex items-center gap-1 text-green-600 font-medium text-sm">
        <FaCheck /> Confirmée
      </span>
    );
  }

  if (currentStatus === "annule") {
    return (
      <span className="flex items-center gap-1 text-red-600 font-medium text-sm">
        <FaTimes /> Annulée
      </span>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => updateStatus("confirme")}
        disabled={loading}
        className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-xs font-bold"
      >
        Accepter
      </button>
      <button
        onClick={() => updateStatus("annule")}
        disabled={loading}
        className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition text-xs font-bold"
      >
        Refuser
      </button>
    </div>
  );
}