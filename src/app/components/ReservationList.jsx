"use client";
import { useEffect, useState } from "react";
import { FaPhone, FaUser, FaHome } from "react-icons/fa";

import { useUserStore } from "../store/userStore";
import LoadingIcon from "./loadingIcon";
import StatusUpdater from "./StatusUpdater";
import Link from "next/link";

export default function ReservationList() {
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("tous");
    const utilisateur = useUserStore((state) => state.user);
    const filtered = demandes.filter((res) => {
        const matchStatus = filter === "tous" || res.statut === filter;
        return matchStatus;
    });

    useEffect(() => {
        fetchDemandes();
    }, []);
    const fetchDemandes = async () => {
        try {
            const res = await fetch(`http://localhost:8000/demandes/proprietaire/${utilisateur.id}`);
            const data = await res.json();
            setDemandes(data);
            
        } catch (err) {
            console.error("Erreur chargement demandes:", err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (statut) => {
        switch (statut) {
            case "en_attente": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "confirme": return "bg-green-100 text-green-800 border-green-200";
            case "annule": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    if (loading) return <div className="p-10 text-center"><LoadingIcon /></div>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestion des Réservations
                    <p className="text-gray-500 text-xl font-normal">Gérez toutes les réservations de vos logements.</p>
                </h2>
                {/* Status filter */}
                <div className="gap-2 flex">
                    <select
                        className="border rounded-lg py-2 px-3 text-sm bg-white"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="tous">Tous les statuts</option>
                        <option value="confirme">Confirmées</option>
                        <option value="en_attente">En attente</option>
                        <option value="annule">Annulées</option>
                    </select>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 flex items-center rounded-full text-sm font-medium">
                        {demandes.length} demandes au total
                    </span>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="p-4 text-xs uppercase text-gray-500 font-semibold">ID / Date Demande</th>
                            <th className="p-4 text-xs uppercase text-gray-500 font-semibold">Locataire</th>
                            <th className="p-4 text-xs uppercase text-gray-500 font-semibold">Période</th>
                            <th className="p-4 text-xs uppercase text-gray-500 font-semibold">Contact</th>
                            <th className="p-4 text-xs uppercase text-gray-500 font-semibold">Statut</th>
                            <th className="p-4 text-xs uppercase text-gray-500 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filtered.map((d) => (
                            <tr key={d.id} className="hover:bg-gray-50 transition">
                                <td className="p-4">
                                    <div className="font-bold text-gray-700">#{d.id}</div>
                                    <div className="text-xs text-gray-400">{d.date_demande}</div>
                                </td>

                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <FaUser className="text-gray-400 text-xs" />
                                        <span className="text-sm font-medium text-gray-900">ID Client: {d.utilisateur_id}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <FaHome className="text-gray-400 text-xs" />
                                        <Link href={`/logements/${d.logement_id}`} className="text-xs text-blue-600 underline">Logement #{d.logement_id}</Link>
                                    </div>
                                </td>

                                <td className="p-4">
                                    <div className="text-sm text-gray-700 flex flex-col">
                                        <span className="flex items-center gap-1"><span className="text-[10px] text-gray-400">DU</span> {d.date_debut}</span>
                                        <span className="flex items-center gap-1"><span className="text-[10px] text-gray-400">AU</span> {d.date_fin}</span>
                                    </div>
                                </td>

                                <td className="p-4">
                                    <a href={`tel:${d.telephone}`} className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 text-sm">
                                        <FaPhone className="text-xs text-green-600" />
                                        {d.telephone}
                                    </a>
                                </td>

                                <td className="p-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(d.statut)}`}>
                                        {d.statut.replace('_', ' ')}
                                    </span>
                                </td>

                                <td className="p-4 text-right">
                                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 ml-4">
                                        <StatusUpdater
                                        demandeId={d.id}
                                        currentStatus={d.statut}
                                        onStatusUpdate={(id, newStatut) => {
                                            // Logique pour mettre à jour l'état local 'demandes'
                                            setDemandes(prev => prev.map(item =>
                                                item.id === id ? { ...item, statut: newStatut } : item
                                            ));
                                        }}
                                    /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {demandes.length === 0 && (
                    <div className="py-20 text-center text-gray-500">Aucune demande reçue pour le moment.</div>
                )}
            </div>
        </div>
    );
}