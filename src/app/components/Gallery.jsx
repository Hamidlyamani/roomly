"use client"


import { Plane } from "lucide-react";

const images = [
  { src: "/imgs/temoin_1__1_.jpg", alt: "Temple bouddhiste au coucher du soleil", size: "tall" },
  { src: "/imgs/temoin_1__1_.jpg", alt: "Voyage en Europe", size: "tall" },
  { src: "/imgs/temoin_1__1_.jpg", alt: "Village traditionnel au Japon", size: "medium" },
  { src: "/imgs/temoin_1__1_.jpg", alt: "Rues bleues du Maroc", size: "tall" },
  { src: "/imgs/temoin_1__1_.jpg", alt: "Vue sur Santorin", size: "tall" },
  { src: "/imgs/temoin_1__1_.jpg", alt: "Couple à la piscine", size: "wide" },
  { src: "/imgs/temoin_1__1_.jpg", alt: "Kayak en Thaïlande", size: "tall" },
  { src: "/imgs/temoin_1__1_.jpg", alt: "Temple doré", size: "tall" },
  { src: "/imgs/temoin_1__1_.jpg", alt: "Ruines antiques", size: "medium" },
  { src: "/imgs/temoin_1__1_.jpg", alt: "Bateau traditionnel", size: "wide" },
];

export default function Gallery () {
  return (
    <section className="min-h-screen bg-white py-16   flex items-center justify-center">
      <div className="mx-auto">
        <div className="flex items-center justify-center gap-2 md:gap-3">
          {/* Column 1 - Smallest */}
          <div className="flex flex-col  gap-2 md:gap-3 ">
            <div className="gallery-image w-28 md:w-36 h-28 md:h-36 ">
              <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover rounded-2xl shadow-lg" />
            </div>
            
          </div>

          {/* Column 2 - Small */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="gallery-image w-28 md:w-36 h-36 md:h-56">
              <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover rounded-2xl shadow-lg" />
            </div>
           
          </div>

          {/* Column 3 - Medium */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="gallery-image w-28 md:w-36 h-24 md:h-32">
              <img src={images[4].src} alt={images[4].alt} className="w-full h-full object-cover rounded-2xl shadow-lg" />
            </div>
            <div className="gallery-image w-28 md:w-36 h-32 md:h-44">
              <img src={images[5].src} alt={images[5].alt} className="w-full h-full object-cover rounded-2xl shadow-lg" />
            </div>
          </div>

          {/* Column 4 - Center (Largest) */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="gallery-image w-28 md:w-36 h-40 md:h-48">
              <img src={images[7].src} alt={images[7].alt} className="w-full h-full object-cover rounded-2xl shadow-lg" />
            </div>
            <div className="gallery-image w-28 md:w-36 h-32 md:h-36">
              <img src={images[6].src} alt={images[6].alt} className="w-full h-full object-cover rounded-2xl shadow-lg" />
            </div>
          </div>

          {/* Column 5 - Medium */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="gallery-image w-28 md:w-36 h-32 md:h-44">
              <img src={images[8].src} alt={images[8].alt} className="w-full h-full object-cover rounded-2xl shadow-lg" />
            </div>
            <div className="gallery-image w-28 md:w-36 h-24 md:h-36">
              <img src={images[9].src} alt={images[9].alt} className="w-full h-full object-cover rounded-2xl shadow-lg" />
            </div>
          </div>

          {/* Column 6 - Small */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="gallery-image w-28 md:w-36 h-36 md:h-56">
              <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover rounded-2xl shadow-lg" />
            </div>
           
          </div>

          {/* Column 7 - Smallest */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="gallery-image  w-28 md:w-36 h-28 md:h-36">
              <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

