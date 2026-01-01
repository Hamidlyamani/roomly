"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { useUserStore } from "../store/userStore";

export default function Chatspace({ selectedChat }) {
  const [newMessage, setNewMessage] = useState("");
  const currentUser = useUserStore((state) => state.user);

  // 1. Identifier le correspondant pour l'en-tête
  const correspondant = selectedChat?.etudiant?.id === currentUser?.id 
    ? selectedChat?.proprietaire 
    : selectedChat?.etudiant;

 const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!newMessage.trim()) return;

  // 1. Préparer l'objet message selon votre schéma API
  const messageData = {
    contenu: newMessage,
    date_envoi: new Date().toISOString().split('T')[0], // Format "2026-01-01"
    type_expediteur: currentUser.role, // 'etudiant' ou 'proprietaire'
    conversation_id: selectedChat.id,
    expediteur_id: currentUser.id,
  };

  try {
    const res = await fetch("http://localhost:8000/messages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    });

    if (res.ok) {
      const createdMessage = await res.json();

      // 2. Mise à jour de l'UI en temps réel
      // On ajoute le nouveau message à la conversation sélectionnée
      selectedChat.messages = [...selectedChat.messages, createdMessage];
      
      // On vide le champ de saisie
      setNewMessage("");
    }
  } catch (err) {
    console.error("Erreur envoi message:", err);
  }
};

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">Sélectionnez une conversation pour discuter</p>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
      
      {/* CHAT HEADER */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-3 bg-white">
        <img
          src={correspondant?.image_url || `https://ui-avatars.com/api/?name=${correspondant?.nom}`}
          alt={correspondant?.nom}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-800">{correspondant?.nom}</p>
          <p className="text-xs text-green-500 font-medium">● {correspondant?.role}</p>
        </div>
      </div>

      {/* CHAT MESSAGES */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
        {selectedChat.messages.map((msg) => {
          const isMe = msg.type_expediteur === currentUser?.role;
          
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
                  isMe
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.contenu}</p>
                <div className={`text-[10px] mt-1 flex items-center gap-1 ${isMe ? "text-blue-100" : "text-gray-400"}`}>
                  <span>{msg.date_envoi}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHAT INPUT */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex gap-3 items-center bg-white">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrire votre message..."
          className="flex-1 rounded-full border border-gray-300 py-2.5 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        <button 
          type="submit"
          disabled={!newMessage.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2.5 rounded-full shadow-md transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}