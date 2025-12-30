"use client"
import { Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MdPerson, MdHome, MdAttachMoney, MdCheckCircle, MdCancel, } from "react-icons/md";
import { useUserStore } from "../store/userStore";

export default function LogementCard({ logement,id }) {


  const [success, setSuccess] = useState(false)
const user = useUserStore((state) => state.user);




 const addToFavorites = async () => {
    try {
      const res = await fetch('http://localhost:8000/favoris/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date_ajout: new Date().toISOString().split('T')[0], // "2025-12-29" format
          utilisateur_id: user.id,
          logement_id: logement.id,
        }),
      })

      if (!res.ok) throw new Error('Failed to add favorite')
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setSuccess(false)
    } finally {
    
    }
}



  return (
    <div className="rounded-xl shadow-md overflow-hidden border hover:shadow-xl transition relative ">
<div onClick={addToFavorites} className={`${success?"bg-orange-500 ":"bg-[#ffffffa9]"} " bg-[#ffffffa9] hover:bg-purple-300 rounded-full w-10 h-10 z-10 top-2 right-2 absolute flex items-center justify-center cursor-pointer "`}>
  <Heart className={`${success?"text-white ":"text-prim"} `} />
</div>

      <Link href={`logements/${logement.id}`} className="block h-56 w-full overflow-hidden">
      <img
        src={logement.images[0].url}
        alt={logement.titre}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110 hover:rotate-4"
      />
      </Link>
      <div className="p-4 space-y-2">
       <Link href={`logements/id=${logement.id}`}> <h3 className="text-lg font-semibold">{logement.titre}</h3></Link>
        <div className="flex items-center space-x-4 mt-2 text-gray-700">
          <div className="flex items-center space-x-1">
            <MdHome className="text-prim" />
            <span>{logement.localisation.split("–")[0].trim()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MdPerson className="text-ter" />
            <span>{logement.capacite} pers.</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-prim font-bold text-base flex items-center">
            <MdAttachMoney className="mr-1" />
            {logement.prix_mensuel} DH / m
          </p>
          {logement.statut === "disponible" ? (
            <div className="flex justify-end items-center gap-2 "><MdCheckCircle className="text-green-400 " title="Disponible" /> <span className="">Disponible</span> </div>
          ) : (
            <div className="flex justify-end items-center gap-2 "> <MdCancel className="text-red-500" title="Indisponible" /><span className="">Indisponible</span>  </div>
          )}
        </div>
      </div>
    </div>
  );
}
