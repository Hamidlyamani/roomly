
import { TrendingUp, Home, Users, Calendar, ArrowRight } from "lucide-react";
import LoadingIcon from "../../components/loadingIcon";



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
    <LoadingIcon/>
  );
}

