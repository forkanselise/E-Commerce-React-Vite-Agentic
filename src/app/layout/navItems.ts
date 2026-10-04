import { Bus, UserRound } from "lucide-react";

export const navItems = [
  { href: "/", labelKey: "nav.booking", icon: Bus },
  { href: "/profile", labelKey: "nav.profile", icon: UserRound }
] as const;
