"use client";

import { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  Bed,
  Wifi,
  Coffee,
  Phone,
  Heart,
} from "lucide-react";
import { useParams } from "next/navigation";
import GalleryBookingCard from "../../../components/GalleryBookingcard"
import FormulaireReservation from "../../../components/FormulaireReservation"
import LoadingIcon from "../../../components/loadingIcon";
import ContactOwner from "../../../components/ContactOwner";



export default function SingleLogementPage() {
 
  const [faved, setFaved] = useState(false);



 const { id } = useParams();
const [logement, setLogement] = useState([]);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
      const fetchLogement = async () => {
        try {
          const res = await fetch(`http://localhost:8000/logements/${id}`);
          const data = await res.json();
          setLogement(data);
        } catch (err) {
          console.error("Erreur chargement logements", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchLogement();
    }, []);

return loading?   <LoadingIcon/> :




   (
    <div className="max-w-6xl mx-auto p-6">
      {/* Top: title + basic info */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {logement.titre}
              
            </h1>
            <div className="mt-2 flex items-center text-sm text-gray-600 gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-red-500" />
                <span> {logement.localisation}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFaved(!faved)}
              className={`rounded-md p-2 border ${faved ? "bg-red-50 border-red-300 text-red-600" : "bg-white border-gray-200"} hover:shadow`}
              aria-label="Ajouter aux favoris"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery + Booking card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gallery */}
        <div className="lg:col-span-2">
          <GalleryBookingCard images={logement.images}/>

          {/* Description */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{logement.description}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Bed className="h-5 w-5 text-gray-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Capacité</p>
                  <p className="text-sm text-gray-600">{logement.capacite} personnes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Wifi className="h-5 w-5 text-gray-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Internet</p>
                  <p className="text-sm text-gray-600">Wifi haut débit inclus</p>
                </div>
              </div>
            </div>

            
          </div>

          {/* Reviews */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border">
            <div className="space-y-4">
              {/* {mockLogement.reviews.map((r) => (
                <div key={r.id} className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    {r.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{r.author}</p>
                        <div className="flex items-center text-sm text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < r.rating ? "text-yellow-400" : "text-gray-300"}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{r.date}</span>
                    </div>
                    <p className="text-gray-700 mt-2">{r.text}</p>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <aside className="sticky top-6">
          <div className="bg-white border rounded-xl p-5 shadow-sm w-full">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Prix par un mois</div>
                <div className="text-2xl font-bold text-gray-900">{logement.prix_mensuel} DH</div>
              </div>
              
            </div>

            <FormulaireReservation logementId={logement.id} />

           <ContactOwner 
        proprietaireId={logement.proprietaire_id} 
        logementNom={logement.titre} 
      />
          </div>

          
          
        </aside>
      </div>
    </div>
  );
}
