import { MdPerson, MdHome, MdAttachMoney, MdCheckCircle, MdCancel } from "react-icons/md";

export default function LogementCard({ logement }) {
  return (
    <div className="rounded-xl shadow-md overflow-hidden border hover:shadow-xl transition">
      <img
        src={logement.image}
        alt={logement.titre}
        className="h-56 max-h-56 w-full object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{logement.titre}</h3>
        <p className="text-sm text-gray-600">{logement.ville}</p>

        <div className="flex items-center space-x-4 mt-2 text-gray-700">
          <div className="flex items-center space-x-1">
            <MdHome className="text-prim" />
            <span>{logement.type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MdPerson className="text-ter" />
            <span>{logement.capacite} pers.</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-prim font-bold text-base flex items-center">
            <MdAttachMoney className="mr-1" />
            {logement.prix} DH / m
          </p>
          {logement.status === "Disponible" ? (
            <div className="flex justify-end items-center gap-2 "><MdCheckCircle className="text-ter" title="Disponible" /> <span className="">Disponible</span> </div>
          ) : (
            <div className="flex justify-end items-center gap-2 "> <MdCancel className="text-red-500" title="Indisponible" /><span className="">Indisponible</span>  </div>
          )}
        </div>
      </div>
    </div>
  );
}
