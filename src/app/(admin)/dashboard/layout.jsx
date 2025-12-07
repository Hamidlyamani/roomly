import {
  LayoutDashboard,
  Users,
  Home,
  Shapes,
  BarChart3,
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

export const ICONS = {
  LayoutDashboard,
  Users,
  Home,
  Shapes,
  BarChart3,
};
export default function dashboardAdmin({children}) {
  return (
<DashboardLayout
  navItems = {[
  { name: 'Tableau de bord', href: '/dashboard', icon: "LayoutDashboard" },
  { name: 'Utilisateurs', href: '/dashboard/utilisateurs', icon: "Users" },
  { name: 'Logements', href: '/dashboard/logements', icon: "Home" },
  { name: 'Catégories', href: '/dashboard/categories', icon: "Shapes" },
]}
   theme={{
      sidebarBg: "bg-slate-900",
      activeBg: "bg-slate-700",
      textColor: "text-slate-300",
   }}
>
   {children}
</DashboardLayout>
  )}