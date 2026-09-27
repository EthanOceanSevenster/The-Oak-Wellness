import {
  Backpack,
  BriefcaseBusiness,
  Leaf,
  MessageCircleHeart,
  Smile,
  Users,
  type LucideIcon,
} from "lucide-react";

// Keyed by the service slugs in the Django content.
const serviceIcons: Record<string, LucideIcon> = {
  children: Smile,
  youth: Backpack,
  families: Users,
  employees: BriefcaseBusiness,
  individuals: MessageCircleHeart,
};

export const serviceIcon = (slug: string) => serviceIcons[slug] ?? Leaf;
