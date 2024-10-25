import { createContext } from "react";

export type UserRoleType = "client" | "staff" | "admin";

export const UserRoleContext = createContext<UserRoleType>("client");
