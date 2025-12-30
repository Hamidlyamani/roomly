"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import AddLogementForm from "@/src/app/components/AddLogementForm";
import LogementsTable from "@/src/app/components/LogementsTable";



const STATUS_STYLES = {
  Publié: "bg-green-100 text-green-700",
  "En attente": "bg-yellow-100 text-yellow-700",
};

/* ------------------------------------------------------------------ */
/* PAGE */
/* ------------------------------------------------------------------ */
export default function MesLogementsPage() {
  const [view, setView] = useState("list"); // "list" | "form"
  const [search, setSearch] = useState("");

  // const filteredLogements = useMemo(() => {
  //   return MY_LOGEMENTS.filter((loc) =>
  //     loc.title.toLowerCase().includes(search.toLowerCase())
  //   );
  // }, [search]);

  if (view === "form") {
    return (
      <div className="space-y-6">
        <Header
          title="Ajouter un logement"
          description="Publie un nouveau logement sur Roomly"
          actionLabel="Retour à la liste"
          onAction={() => setView("list")}
        />
        <AddLogementForm />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Header
        title="Mes logements"
        description="Gérez les logements que vous avez publiés sur Roomly."
        actionLabel="Ajouter un logement"
        onAction={() => setView("form")}
        icon={<Plus className="h-4 w-4" />}
      />

      <SearchInput value={search} onChange={setSearch} />

      {/* {filteredLogements.length === 0 ? (
        <EmptyState />
      ) : ( */}
        <LogementsTable />
      {/* )} */}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SUB COMPONENTS */
/* ------------------------------------------------------------------ */

function Header({ title, description, actionLabel, onAction, icon }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>

      <button
        onClick={onAction}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sec text-white text-sm font-medium hover:bg-prim shadow"
      >
        {icon}
        {actionLabel}
      </button>
    </div>
  );
}

function SearchInput({ value, onChange }) {
  return (
    <div className="relative w-full md:w-1/3">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
      <input
        type="text"
        placeholder="Rechercher dans mes logements..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm focus:ring-2 focus:ring-sec outline-none"
      />
    </div>
  );
}
