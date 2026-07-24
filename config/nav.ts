import type { Icon } from "iconsax-reactjs";
import {
  WalletMoney,
  DiscountShape,
  MessageQuestion,
  KeySquare,
  I3DSquare,
  UserSquare,
} from "iconsax-reactjs";

export interface NavItem {
  label: string;
  href: string;
  icon: Icon;
  hasSubmenu?: boolean;
}

export const DASHBOARD_NAV: NavItem[] = [
  { label: "Dashboard", href: "#", icon: KeySquare },
  { label: "Product", href: "#", icon: I3DSquare, hasSubmenu: true },
  {
    label: "Customers",
    href: "/dashboard/customers",
    icon: UserSquare,
    hasSubmenu: true,
  },
  { label: "Income", href: "#", icon: WalletMoney, hasSubmenu: true },
  { label: "Promote", href: "#", icon: DiscountShape, hasSubmenu: true },
  { label: "Help", href: "#", icon: MessageQuestion, hasSubmenu: true },
];
