
import { TrendingUp, Home, Users, Calendar, ArrowRight } from "lucide-react";


const stats = [
  {
    label: "Logements actifs",
    value: 6,
    icon: Home,
    bg: "bg-purple-200",
    iconBg: "bg-prim",
  },
  {
    label: "Réservations ce mois",
    value: 14,
    icon: Calendar,
    bg: "bg-green-100",
    iconBg: "bg-green-500",
  },
  {
    label: "Revenus mensuels",
    value: "2 750€",
    icon: TrendingUp,
    bg: "bg-purple-100",
    iconBg: "bg-sec",
  },
  {
    label: "Clients total",
    value: 89,
    icon: Users,
    bg: "bg-orange-100",
    iconBg: "bg-ter",
  },
];

const topLogements = [
  {
    id: 1,
    titre: "Appartement Moderne - Rabat",
    vues: 540,
    reservations: 18,
    image:
      "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=600",
  },
  {
    id: 2,
    titre: "Studio Cozy - Hassan",
    vues: 320,
    reservations: 12,
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600",
  },
];

const recentReservations = [
  {
    id: 1,
    logement: "Appartement Moderne",
    client: "Yassine B.",
    date: "Aujourd’hui",
    status: "Confirmée",
  },
  {
    id: 2,
    logement: "Studio Cozy",
    client: "Sofia M.",
    date: "Hier",
    status: "En attente",
  },
  {
    id: 3,
    logement: "Villa Luxe Rabat",
    client: "Omar A.",
    date: "Il y a 3 jours",
    status: "Confirmée",
  },
];

export default async function DashboardPage() {








  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold  text-gray-800">Tableau de bord</h1>
        <p className="text-gray-500">
          Suivez les performances de vos logements en un coup d’œil.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
        {stats.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl p-4 shadow-sm border ${item.bg}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{item.label}</p>
                <h2 className="text-2xl font-bold text-gray-800 mt-1">
                  {item.value}
                </h2>
              </div>
              <div
                className={`${item.iconBg} text-white p-3 rounded-lg shadow`}
              >
                <item.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GRID ZONE */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left: Reservations */}
        <div className="lg:col-span-2 bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Réservations récentes
            </h2>
            <button className="text-prim flex items-center text-sm font-medium hover:underline">
              Voir tout <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="divide-y">
            {recentReservations.map((res) => (
              <div key={res.id} className="py-3 flex justify-between">
                <div>
                  <p className="font-medium text-gray-800">{res.logement}</p>
                  <p className="text-sm text-gray-500">{res.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{res.date}</p>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      res.status === "Confirmée"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {res.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Top logements */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Vos meilleurs logements
          </h2>

          <div className="space-y-4">
            {topLogements.map((log) => (
              <div key={log.id} className="flex gap-4">
                <img
                  src={log.image}
                  alt="logement"
                  className="h-16 w-16 rounded-lg object-cover shadow"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{log.titre}</p>
                  <p className="text-sm text-gray-500">
                    {log.vues} vues • {log.reservations} réservations
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}

