"use client";
import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/userStore";

export default function ContactOwner({ proprietaireId, logementNom }) {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const currentUser = useUserStore((state) => state.user);
  const router = useRouter();

  const handleContact = async (e) => {
    e.preventDefault();
    if (!message.trim() || !currentUser) return;

    setLoading(true);
    try {
      // 1. Créer ou récupérer la conversation
      const convRes = await fetch("http://localhost:8000/conversations/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          etudiant_id: currentUser.id,
          proprietaire_id: proprietaireId
        }),
      });
      const convData = await convRes.json();

      // 2. Envoyer le message initial
      await fetch("http://localhost:8000/messages/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contenu: message,
          date_envoi: new Date().toISOString().split('T')[0],
          type_expediteur: "etudiant",
          conversation_id: convData.id,
          expediteur_id: currentUser.id
        }),
      });

      // 3. Rediriger vers la page des messages
      router.push("/messages");
    } catch (err) {
      console.error("Erreur contact:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg"
      >
        <MessageCircle className="h-5 w-5" />
        Contacter le propriétaire
      </button>
    );
  }

  return (
    <div className="border border-blue-100 bg-blue-50 p-4 rounded-xl shadow-inner transition-all">
      <h3 className="text-sm font-bold text-blue-800 mb-2">
        Envoyer un message pour : {logementNom}
      </h3>
      <form onSubmit={handleContact} className="space-y-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Bonjour, je suis intéressé par votre logement..."
          className="w-full p-3 text-sm rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Envoi..." : <><Send className="h-4 w-4" /> Envoyer</>}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}