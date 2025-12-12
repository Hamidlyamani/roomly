import DashboardLayout from '../../components/DashboardLayout';

export default function dashboardAdmin({children}) {
  return (
<DashboardLayout
  navItems = {[
  { name: 'Tableau de bord', href: '/admin', icon: "LayoutDashboard" },
  { name: 'Utilisateurs', href: '/admin/utilisateurs', icon: "Users" },
  { name: 'Logements', href: '/admin/logements', icon: "Home" },
  { name: 'Catégories', href: '/admin/categories', icon: "Shapes" },
]}
   theme={{
      sidebarBg: "bg-[#44422c]",
      activeBg: "bg-ter",
      textColor: "text-for",
      hoverBg:"text-for"
   }}
>
   {children}
</DashboardLayout>
  )}