"use client";

import { useState } from "react";
import { Search, Send } from "lucide-react";

const conversationsMock = [
  {
    id: 1,
    user: "Yassine B.",
    lastMessage: "Est-ce que l'appartement est disponible le weekend ?",
    time: "14:22",
    unread: true,
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    messages: [
      { from: "client", text: "Est-ce que l'appartement est disponible le weekend ?", time: "14:22" },
      { from: "owner", text: "Bonjour ! Oui totalement disponible 😄", time: "14:24" },
    ],
  },
  {
    id: 2,
    user: "Sofia M.",
    lastMessage: "Merci pour la réponse !",
    time: "11:05",
    unread: false,
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    messages: [
      { from: "owner", text: "Bonjour Sofia, avec plaisir !", time: "11:00" },
      { from: "client", text: "Merci pour la réponse !", time: "11:05" },
    ],
  },
  {
    id: 3,
    user: "Omar A.",
    lastMessage: "Je veux réserver pour une semaine.",
    time: "Hier",
    unread: true,
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    messages: [
      { from: "client", text: "Je veux réserver pour une semaine.", time: "18:32" },
    ],
  },
];

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(conversationsMock[0]);

  const filtered = conversationsMock.filter((conv) =>
    conv.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-5rem)] gap-6">
      {/* LEFT PANEL: INBOX */}
      <div className="w-80 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
        
        {/* HEADER */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Messages</h2>
          <p className="text-sm text-gray-500">Conversations avec vos clients</p>
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
        <div className="flex-1 overflow-y-auto">
          {filtered.map((conv) => (
            <div
              key={conv.id}
              className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition ${
                selectedChat.id === conv.id ? "bg-blue-50" : ""
              }`}
              onClick={() => setSelectedChat(conv)}
            >
              <img
                src={conv.avatar}
                className="h-10 w-10 rounded-full object-cover"
                alt={conv.user}
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{conv.user}</p>
                <p className="text-sm text-gray-500 truncate">
                  {conv.lastMessage}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">{conv.time}</p>
                {conv.unread && (
                  <span className="inline-block mt-1 h-2.5 w-2.5 rounded-full bg-prim" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: CHAT */}
      <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
        
        {/* CHAT HEADER */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <img
            src={selectedChat.avatar}
            alt={selectedChat.user}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{selectedChat.user}</p>
            <p className="text-sm text-gray-500">En ligne récemment</p>
          </div>
        </div>

        {/* CHAT MESSAGES */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
          {selectedChat.messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs p-3 rounded-lg shadow-sm ${
                msg.from === "owner"
                  ? "ml-auto bg-prim text-white"
                  : "bg-white text-gray-800 border"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-[10px] mt-1 opacity-70">{msg.time}</p>
            </div>
          ))}
        </div>

        {/* CHAT INPUT */}
        <div className="p-4 border-t border-gray-200 flex gap-3 items-center">
          <input
            type="text"
            placeholder="Écrire un message..."
            className="flex-1 rounded-lg border py-2 px-3 text-sm focus:ring-2 focus:ring-blue-200"
          />
          <button className="bg-prim hover:bg-sec text-white p-2 rounded-lg shadow">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
