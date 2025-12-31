"use client";

import { Heart } from "lucide-react";
import Image from "next/image";

export default function FavorisList({ favoris }) {


    const removeFromFavorites= async () =>{
  try {
      const res = await fetch('http://localhost:8000/avis/2', {
        method: 'DELETE',
      
      })

      if (!res.ok) throw new Error('Failed to remove favorite')
   
    } catch (err) {
      console.error(err)
    } finally {
    
    }
    }
  if (!favoris || favoris.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg"> Aucun logement en favoris</p>
        <p className="text-sm">Ajoute des logements pour les retrouver ici</p>
      </div>
    );
  }

  return (
     <div className="divide-y rounded-xl border bg-white">
      {favoris.map((favori) => {
        const logement = favori.logement;

        return (
          <div
            key={favori.id}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition"
          >
            <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src="/imgs/im.jpg"
                alt={logement.titre}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {logement.titre}
              </h3>

              <p className="text-xs text-gray-500 truncate">
                {logement.localisation} • {logement.capacite} personnes
              </p>

              <p className="text-xs text-gray-400 line-clamp-1 mt-1">
                {logement.description}
              </p>
            </div>

            {/* Prix & statut */}
            <div className="text-right space-y-1">
              <p className="text-sm font-bold text-indigo-600">
                {logement.prix_mensuel} DH
              </p>

              <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                {logement.statut}
              </span>
            </div>

            {/* Action */}
            <button
              className="ml-3 text-gray-400 hover:text-red-500 transition"
              title="Retirer des favoris"
            >
              <div onClick={removeFromFavorites} className="bg-orange-500  bg-[#ffffffa9]  rounded-full w-10 h-10 z-10   flex items-center justify-center cursor-pointer ">
  <Heart className="text-white " />
</div>
            </button>
          </div>
        );
      })}
    </div>
        );
    }
