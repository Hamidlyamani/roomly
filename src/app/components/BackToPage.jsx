"use client"

import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";


export default function BackToPage() {

    const router = useRouter();
    const handleClick = () => {
        router.back(); // Revient à l'URL précédente dans l'historique
    };
    return (

        <button onClick={handleClick} className="border border-prim  rounded-lg p-4 py-2 flex items-center gap-2 font-bold text-prim"><MoveLeft />Reteur</button>

    )
}
