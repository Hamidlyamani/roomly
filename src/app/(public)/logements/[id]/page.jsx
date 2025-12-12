"use client";

import { useState } from "react";
import {
  Star,
  MapPin,
  Users,
  Bed,
  Calendar,
  Wifi,
  Coffee,
  Phone,
  Heart,
} from "lucide-react";

const mockLogement = {
  id: 1,
  title: "Charmant appartement marocain à proximité de la médina",
  city: "Marrakech",
  address: "Rue des Orangers, Médina",
  pricePerNight: 55, // en €
  rating: 4.7,
  reviewsCount: 34,
  host: {
    name: "Amina",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    since: "2021",
  },
  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1400&q=80",
  ],
  description:
    "Bel appartement rénové mêlant éléments traditionnels marocains et confort moderne. Situé à 10 minutes à pied de la place Jemaa el-Fna. Cuisine équipée, climatisation, wifi rapide.",
  amenities: ["Wifi", "Climatisation", "Cuisine", "TV", "Lave-linge", "Petit-déjeuner"],
  reviews: [
    {
      id: 1,
      author: "Yassine",
      text: "Séjour excellent, hôte très accueillante. Appartement propre et bien situé.",
      rating: 5,
      date: "12 Jan 2025",
    },
    {
      id: 2,
      author: "Sofia",
      text: "Très bon rapport qualité/prix. Le seul bémol : rue un peu bruyante le soir.",
      rating: 4,
      date: "03 Fév 2025",
    },
  ],
};

export default function SingleLogementPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [guests, setGuests] = useState(2);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [faved, setFaved] = useState(false);

  const nights =
    startDate && endDate ? Math.max(1, (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) : 0;
  const total = nights ? (nights * mockLogement.pricePerNight).toFixed(2) : null;

  function handleBooking(e) {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Veuillez sélectionner les dates de séjour.");
      return;
    }
    alert(
      `Réservation simulée : ${mockLogement.title}\nDates : ${startDate} → ${endDate}\nNuitées : ${nights}\nInvités : ${guests}\nTotal : ${total}€`
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Top: title + basic info */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {mockLogement.title}
            </h1>
            <div className="mt-2 flex items-center text-sm text-gray-600 gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>{mockLogement.city} · {mockLogement.address}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{mockLogement.rating} · {mockLogement.reviewsCount} avis</span>
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
          <div className="rounded-xl overflow-hidden shadow">
            <img
              src={mockLogement.images[currentImage]}
              alt={`photo ${currentImage + 1}`}
              className="w-full h-[420px] object-cover"
            />
          </div>

          {/* thumbnails */}
          <div className="mt-3 flex gap-3">
            {mockLogement.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`h-20 w-28 rounded-lg overflow-hidden border ${i === currentImage ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"}`}
                aria-label={`Voir image ${i + 1}`}
              >
                <img src={src} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{mockLogement.description}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Bed className="h-5 w-5 text-gray-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Capacité</p>
                  <p className="text-sm text-gray-600">Jusqu'à 4 personnes</p>
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

            {/* Amenités */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Équipements</h3>
              <ul className="flex flex-wrap gap-2">
                {mockLogement.amenities.map((a) => (
                  <li key={a} className="text-sm px-3 py-1 rounded-md bg-gray-50 border border-gray-100 text-gray-700">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Avis ({mockLogement.reviews.length})</h2>
            <div className="space-y-4">
              {mockLogement.reviews.map((r) => (
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
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <aside className="sticky top-6">
          <div className="bg-white border rounded-xl p-5 shadow-sm w-full">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Prix par nuit</div>
                <div className="text-2xl font-bold text-gray-900">{mockLogement.pricePerNight} €</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Note</div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold">{mockLogement.rating}</span>
                </div>
              </div>
            </div>

            <form className="mt-4 space-y-3" onSubmit={handleBooking}>
              <div>
                <label className="text-xs font-medium text-gray-600">Arrivée</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Départ</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Invités</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                >
                  <option value={1}>1 invité</option>
                  <option value={2}>2 invités</option>
                  <option value={3}>3 invités</option>
                  <option value={4}>4 invités</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 font-medium"
                >
                  Réserver maintenant
                </button>
              </div>

              <div className="text-sm text-gray-600 pt-2">
                {nights > 0 ? (
                  <div>
                    <div>{nights} nuit(s) × {mockLogement.pricePerNight}€ = <strong>{total}€</strong></div>
                  </div>
                ) : (
                  <div>Sélectionnez vos dates pour voir le prix total</div>
                )}
              </div>
            </form>

            <div className="mt-4 border-t pt-4 text-sm text-gray-600 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>Contact hôte : +212 6X XX XX XX</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4 text-gray-500" />
                <span>Petit-déjeuner disponible</span>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-4 bg-white border rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Emplacement</h3>
            <div className="w-full h-48 rounded-md overflow-hidden border">
              {/* Simple embedded OpenStreetMap iframe or placeholder */}
              <iframe
                title="map"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=0,0,0,0&layer=mapnik`}
                className="w-full h-full"
              />
            </div>
            <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-500" />
              <span>{mockLogement.address}, {mockLogement.city}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
