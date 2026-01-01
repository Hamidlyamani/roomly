import { useState } from "react";



export default function GalleryBookingCard({images}) {
     const [currentImage, setCurrentImage] = useState(0);
    return (
        <>
            <div className="rounded-xl overflow-hidden shadow">
                <img
                    src={images?.[currentImage]?.url}
                    alt={`photo ${0 + 1}`}
                    className="w-full h-[420px] object-cover"
                />
            </div>


            <div className="mt-3 flex gap-3">
                {images?.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`h-20 w-28 rounded-lg overflow-hidden border ${i === currentImage ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"}`}
                        aria-label={`Voir image ${i + 1}`}
                    >
                        <img src={img.url} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </>
    )
}