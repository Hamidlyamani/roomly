import DashboardLayout from '../../components/DashboardLayout';


export default async function dashboardProprietaire({ children }) {


  return (
    <DashboardLayout
      navItems={[
        { name: 'Tableau de bord', href: '/dashboard', icon: "LayoutDashboard" },
        { name: 'Mes Logements', href: '/dashboard/meslogements', icon: "Home" },
        { name: 'Messages', href: '/dashboard/messages', icon: "MessageCircle" },
        { name: 'Réservations', href: '/dashboard/reservations', icon: "Shapes" },
        { name: 'Avis', href: '/dashboard/avis', icon: "MessageSquareQuote" },
      ]}
      theme={{
        sidebarBg: "bg-purple-950",
        activeBg: "bg-prim",
        textColor: "text-sec",
      }}
      userparams="proprietaire"
    >
      {children}
    </DashboardLayout>
  )
}