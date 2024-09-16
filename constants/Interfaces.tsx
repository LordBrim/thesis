import { ReactNode } from "react";

export interface IAccountCard {
  href: string;
  icon: ReactNode;
  label: string;
  sublabel?: string;
}
