"use client";

import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import BackToPage from "../../components/BackToPage";
import Chatspace from "../../components/Chatspace";
import SideBarMessages from "../../components/SideBarMessages";
import LoadingIcon from "../../components/loadingIcon";
import { useUserStore } from "../../store/userStore";

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]); // Changé au pluriel
  const [selectedChat, setSelectedChat] = useState(null);
  const utilisateur = useUserStore((state) => state.user);

  useEffect(() => {
    if (utilisateur?.id) {
      fetchConversations();
    }
  }, [utilisateur?.id]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      // Utilisation de l'ID de l'utilisateur connecté
      const res = await fetch(`http://localhost:8000/conversations/user/${utilisateur.id}`);
      const data = await res.json();
      setConversations(data);
      
      // Sélectionner la première conversation par défaut si elle existe
      if (data.length > 0) {
        setSelectedChat(data[0]);
      }
    } catch (err) {
      console.error("Erreur chargement conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Logique pour trouver "l'autre" personne et filtrer
  const filtered = useMemo(() => {
    return conversations.filter((conv) => {
      // Déterminer qui est le correspondant
      const correspondant = conv.etudiant.id === utilisateur?.id 
        ? conv.proprietaire 
        : conv.etudiant;
      
      return correspondant.nom.toLowerCase().includes(search.toLowerCase());
    });
  }, [conversations, search, utilisateur?.id]);

  if (loading) return <div className="flex h-screen items-center justify-center"><LoadingIcon /></div>;

  return (
    <div className="flex h-[calc(100vh-5rem)] gap-6 m-4">
      {/* LEFT PANEL: INBOX */}
      <div className="w-80 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
        <div className="flex gap-2 items-center p-2">
          <BackToPage />
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Mes messages</h2>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative p-3">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher une conversation..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-blue-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CONVERSATION LIST */}
        <SideBarMessages 
          filtered={filtered} 
          selectedChat={selectedChat} 
          setSelectedChat={setSelectedChat}
          currentUserId={utilisateur?.id} // Passer l'ID actuel pour aider l'affichage
        />
      </div>

      {/* RIGHT PANEL: CHAT */}
      <div className="flex-1">
        {selectedChat ? (
          <Chatspace selectedChat={selectedChat} currentUserId={utilisateur?.id} />
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">
            Sélectionnez une conversation pour commencer à discuter
          </div>
        )}
      </div>
    </div>
  );
}