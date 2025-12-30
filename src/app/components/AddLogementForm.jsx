"use client";

import { useRef, useState } from "react";

export default function AddLogementForm() {
  // refs pour les inputs text
  const titreRef = useRef(null);
  const descriptionRef = useRef(null);
  const prixRef = useRef(null);
  const localisationRef = useRef(null);
  const capaciteRef = useRef(null);
  const statutRef = useRef(null);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1️⃣ construire payload logement
    const logementPayload = {
      titre: titreRef.current.value,
      description: descriptionRef.current.value,
      prix_mensuel: Number(prixRef.current.value),
      localisation: localisationRef.current.value,
      capacite: Number(capaciteRef.current.value),
      statut: statutRef.current.value,
      proprietaire_id: 1, // TODO: depuis auth
    };

    // 2️⃣ POST logement
    const res = await fetch("http://localhost:8000/logements/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logementPayload),
    });

    const logement = await res.json();

    // 3️⃣ upload images via Next API
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((img) => formData.append("files", img));

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const urls = await uploadRes.json();

      // 4️⃣ save images in backend
      for (let i = 0; i < urls.length; i++) {
        await fetch("http://localhost:8000/images/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: urls[i],
            principale: i === 0,
            logement_id: logement.id,
          }),
        });
      }
    }

    setLoading(false);
    alert("Logement publié avec succès !");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-soft p-8">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">Ajouter un logement</h2>
      <p className="text-muted-foreground mb-8">
        Renseigne les informations pour publier ton annonce
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Titre du logement
          </label>
          <input
            ref={titreRef}
            type="text"
            placeholder="Studio moderne près de l’université"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sec"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            ref={descriptionRef}
            rows={4}
            placeholder="Décris le logement, l’ambiance, les équipements..."
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sec resize-none"
          />
        </div>

        {/* Prix + Capacité */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Prix mensuel (MAD)
            </label>
            <input
              ref={prixRef}
              type="number"
              placeholder="1500"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sec"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Capacité (personnes)
            </label>
            <input
              ref={capaciteRef}
              type="number"
              placeholder="2"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sec"
            />
          </div>
        </div>

        {/* Localisation */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Localisation
          </label>
          <input
            ref={localisationRef}
            type="text"
            placeholder="Casablanca – Ain Chock"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sec"
          />
        </div>

        {/* Statut */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Statut
          </label>
          <select
            ref={statutRef}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sec"
          >
            <option value="">Sélectionner un statut</option>
            <option value="disponible">Disponible</option>
            <option value="reserve">Réservé</option>
            <option value="indisponible">Indisponible</option>
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Images du logement
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
            className="w-full border border-dashed rounded-xl p-4 cursor-pointer"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Tu peux ajouter plusieurs images (JPG, PNG)
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full gradiantButton text-white py-3 font-medium disabled:opacity-60"
        >
          {loading ? "Publication..." : "Publier le logement"}
        </button>
      </form>
    </div>
  );
}
