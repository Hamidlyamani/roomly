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
            <MdHome className="text-blue-500" />
            <span>{logement.type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MdPerson className="text-green-500" />
            <span>{logement.capacite} pers.</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-blue-600 font-bold text-lg flex items-center">
            <MdAttachMoney className="mr-1" />
            {logement.prix} DH / m
          </p>
          {logement.status === "Disponible" ? (
            <> <span className="">Disponible</span> <MdCheckCircle className="text-green-500" title="Disponible" /></>
          ) : (
            <> <span className="">Indisponible</span>  <MdCancel className="text-red-500" title="Indisponible" /></>
          )}
        </div>
      </div>
    </div>
  );
}
