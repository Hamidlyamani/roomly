"use client";
import { useState } from "react";
import { useStore } from "zustand";
import { useUserStore } from "../store/userStore";

export default function FormulaireReservation({ logementId }) {
  const [formData, setFormData] = useState({
    date_debut: "",
    date_fin: "",
    telephone: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
const utilisateurId = useUserStore((state) => state.user);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const reservationData = {
      ...formData,
      utilisateur_id: Number(utilisateurId.id),
      logement_id: logementId,
      statut: "en_attente",
      date_demande: new Date().toISOString().split('T')[0] // Date du jour
    };

    try {
      const res = await fetch("http://localhost:8000/demandes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Demande envoyée avec succès !" });
        setFormData({ date_debut: "", date_fin: "", telephone: "" });
      } else {
        throw new Error("Erreur lors de la réservation");
      }
    } catch (err) {
      setMessage({ type: "error", text: "Impossible d'envoyer la demande, tous les champs sont obligatoires" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mt-4 mx-auto bg-white p-6 rounded-2xl shadow-lg border">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Réserver ce logement</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date d'entrée (Début du mois)</label>
          <input
            required
            type="date"
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.date_debut}
            onChange={(e) => setFormData({ ...formData, date_debut: e.target.value })}
          />
        </div>

        {/* Date de fin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date de sortie (Fin du bail)</label>
          <input
            required
            type="date"
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.date_fin}
            onChange={(e) => setFormData({ ...formData, date_fin: e.target.value })}
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
          <input
            required
            type="tel"
            placeholder="Ex: 0612345678"
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          />
        </div>

        {/* Bouton de validation */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-bold text-white transition ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Envoi en cours..." : "Confirmer la demande"}
        </button>

        {/* Messages de retour */}
        {message && (
          <p className={`text-center text-sm mt-2 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}