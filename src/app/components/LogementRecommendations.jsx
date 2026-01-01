import Link from "next/link";

export default function LogementRecommendations({ logement }) {

    return (
        <div className=" p-6  rounded-2xl border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                Voici les meilleures options pour toi :
            </h3>

            <ul className="space-y-6">
                {Array.isArray(logement.text) ? (
                    // Cas 1 : C'est un tableau (plusieurs logements)
                    logement.text.map((item, index) => (
                        <li key={item.id_logement || index} className="relative pl-6 border-l-2 border-blue-300">
                            <h4 className="font-bold text-gray-800 text-md uppercase tracking-wide">
                                {item.nom}
                            </h4>
                            <p className="mt-1 text-gray-600 leading-relaxed italic">
                                <span className="font-medium text-blue-700"></span> {item.pourquoi}
                            </p>
                            <Link href={`/logements/${logement.text.id_logement}`} className="mt-2 text-sm font-semibold text-blue-600 hover:underline">
                                Voir les détails →
                            </Link>
                        </li>
                    ))
                ) : (
                    // Cas 2 : C'est un objet unique (un seul logement)
                    logement.text && (
                        <li className="relative pl-6 border-l-2 border-blue-300">
                            <span className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></span>
                            <h4 className="font-bold text-gray-800 text-md uppercase tracking-wide">
                                {logement.text.nom}
                            </h4>
                            <p className="mt-1 text-gray-600 leading-relaxed italic">
                                <span className="font-medium text-blue-700"></span> {logement.text.pourquoi}
                            </p>
                            <Link href={`/logements/${logement.text.id_logement}`} className="mt-2 text-sm font-semibold text-blue-600 hover:underline">
                                Voir les détails →
                            </Link>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}