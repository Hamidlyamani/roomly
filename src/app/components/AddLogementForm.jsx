import { useRef, useState } from "react";
import { useUserStore } from '../store/userStore'

export default function AddLogementForm() {
  // refs pour les inputs text
  const titreRef = useRef(null);
  const descriptionRef = useRef(null);
  const prixRef = useRef(null);
  const localisationRef = useRef(null);
  const capaciteRef = useRef(null);
  const statutRef = useRef(null);
  const fileInputRef = useRef(null); // Ajouté pour vider l'input file

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !titreRef.current.value ||
      !descriptionRef.current.value ||
      !prixRef.current.value ||
      !localisationRef.current.value ||
      !capaciteRef.current.value ||
      !statutRef.current.value ||
      images.length === 0 // Optionnel : vérifier s'il y a au moins une image
    ) {
      alert("Veuillez remplir tous les champs et ajouter au moins une image.");
      return;
    }

    setLoading(true);

    try {
      // 2️⃣ Construire payload logement
      const logementPayload = {
        titre: titreRef.current.value,
        description: descriptionRef.current.value,
        prix_mensuel: Number(prixRef.current.value),
        localisation: localisationRef.current.value,
        capacite: Number(capaciteRef.current.value),
        statut: statutRef.current.value,
        proprietaire_id: user?.id,
      };

      // 3️⃣ POST logement
      const res = await fetch("http://localhost:8000/logements/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logementPayload),
      });

      if (!res.ok) throw new Error("Erreur lors de la création du logement");
      const logement = await res.json();

      // 4️⃣ Upload images via Next API
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((img) => formData.append("files", img));

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const urls = await uploadRes.json();

        // 5️⃣ Save images in backend
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

      // 🎉 SUCCÈS : Vider les champs
      titreRef.current.value = "";
      descriptionRef.current.value = "";
      prixRef.current.value = "";
      localisationRef.current.value = "";
      capaciteRef.current.value = "";
      statutRef.current.value = "";
      if (fileInputRef.current) fileInputRef.current.value = ""; // Vide l'input file
      setImages([]); // Vide l'état des images

      alert("Logement publié avec succès !");
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de la publication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-soft p-8">
      <h2 className="text-2xl font-bold mb-2">Ajouter un logement</h2>
      <p className="text-muted-foreground mb-8">
        Renseigne les informations pour publier ton annonce
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Titre du logement</label>
          <input
            ref={titreRef}
            type="text"
            placeholder="Studio moderne près de l’université"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sec"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            ref={descriptionRef}
            rows={4}
            placeholder="Décris le logement..."
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sec resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Prix mensuel (MAD)</label>
            <input
              ref={prixRef}
              type="number"
              placeholder="1500"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sec"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Capacité (personnes)</label>
            <input
              ref={capaciteRef}
              type="number"
              placeholder="2"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sec"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Localisation</label>
          <input
            ref={localisationRef}
            type="text"
            placeholder="Casablanca – Ain Chock"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sec"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Statut</label>
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

        <div>
          <label className="block text-sm font-medium mb-2">Images du logement</label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
            className="w-full border border-dashed rounded-xl p-4 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-blue-600 gradiantButton text-white py-3 font-medium disabled:opacity-60"
        >
          {loading ? "Publication..." : "Publier le logement"}
        </button>
      </form>
    </div>
  );
}