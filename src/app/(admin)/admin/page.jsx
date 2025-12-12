

export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Tableau de bord</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Exemple de cartes de statistiques */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Utilisateurs totaux</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Logements actifs</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">456</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Catégories</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Revenus mensuels</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">€12,345</p>
        </div>
      </div>
    </div>
  );
}
