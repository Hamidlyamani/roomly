"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import LogementRecommendations from "../../components/LogementRecommendations";

export const noFooter = true;

export default function AIRecommandationPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const hasSentRef = useRef(false);

  const sendMessage = async (text) => {
    const messageText = typeof text === "string" ? text : input;
    if (!messageText || !messageText.trim()) return;

    // 1. Ajouter le message de l'utilisateur
    setMessages((prev) => [...prev, { sender: "user", text: messageText }]);
    setInput("");
    setLoading(true); // Activer le chargement

    try {
      const res = await fetch(`http://localhost:8000/recommendations/logements?user_query=${encodeURIComponent(messageText)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      // 2. Ajouter la réponse du bot
      setMessages((prev) => [...prev, { sender: "bot", text: data }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Désolé, une erreur est survenue.", isError: true }]);
    } finally {
      setLoading(false); // Désactiver le chargement
    }
  };

  useEffect(() => {
    if (query && !hasSentRef.current) {
      hasSentRef.current = true;
      const decoded = decodeURIComponent(query);
      sendMessage(decoded);
    }
  }, [query]);

  return (
    <div className="flex flex-col h-[90vh] bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-6 py-10">
          
          {/* Header si vide */}
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center text-center mt-10">
              <Image src="/imgs/logo.png" alt='logo' width={100} height={100} className="w-24 h-auto" />
              <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Assistant RoomlyIA</h1>
            </div>
          )}

          {/* Boucle des messages */}
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : ""}`}>
              {msg.sender === "bot" && (
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-600 text-white rounded-full"><FaRobot /></div>
              )}
              <div className={`p-4 rounded-2xl max-w-[80%] ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-white border shadow-sm"}`}>
                {msg.sender === "user" ? msg.text : <LogementRecommendations logement={msg.text} />}
              </div>
              {msg.sender === "user" && (
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-800 text-white rounded-full"><FaUser /></div>
              )}
            </div>
          ))}

          {/* AFFICHAGE DU LOADING (Bulle de chat factice) */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full animate-bounce">
                <FaRobot />
              </div>
              <div className="bg-white border p-4 rounded-2xl shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Barre d'input */}
      <div className="border-t bg-white p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Posez votre question..."
            disabled={loading}
          />
          <button 
            onClick={() => sendMessage()} 
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-full disabled:bg-gray-300"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}