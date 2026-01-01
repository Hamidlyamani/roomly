import React from 'react';
import { useUserStore } from '../store/userStore';

export default function SideBarMessages({ filtered, selectedChat, setSelectedChat }) {
    const currentUser = useUserStore((state) => state.user);

    return (
        <div className="flex-1 overflow-y-auto">
            {filtered?.length > 0 ? (
                filtered.map((conv) => {
                    // LOGIQUE CORRIGÉE : 
                    // Si l'ID de l'étudiant est le mien, alors le correspondant est le PROPRIÉTAIRE.
                    // Sinon, le correspondant est l'ÉTUDIANT.
                    currentUser?.id
                    const correspondant = currentUser?.role == "etudiant" ? conv.etudiant?.id === currentUser?.id
                        ? conv.etudiant
                        : conv.proprietaire :
                        conv.etudiant?.id === currentUser?.id
                            ? conv.proprietaire
                            : conv.etudiant
                        ;

                    return (
                        <div
                            key={conv.id}
                            className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition ${selectedChat?.id === conv.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                                }`}
                            onClick={() => setSelectedChat(conv)}
                        >
                            <img
                                src={correspondant?.image_url || `https://ui-avatars.com/api/?name=${correspondant?.nom}`}
                                className="h-12 w-12 rounded-full object-cover bg-gray-200"
                                alt={correspondant?.nom}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 truncate">
                                    {correspondant?.nom}
                                </p>
                                {/* ... reste du code (dernier message, date, etc.) */}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="p-4 text-center text-gray-500">Aucune conversation</div>
            )}
        </div>
    );
}