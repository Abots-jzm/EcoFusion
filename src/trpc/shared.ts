import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";
import { type AppRouter } from "@/server/api/root";

export const transformer = superjson;

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutputs = inferRouterOutputs<AppRouter>;

export type Credentials = RouterInputs["users"]["register"];
export type User = RouterOutputs["users"]["getInitialData"]["user"];
export type Store = RouterOutputs["users"]["getInitialData"]["stores"][0];
export type Billboard = RouterOutputs["billboards"]["getStoreBillboards"][0];
export type StoreCategories = RouterOutputs["categories"]["getStoreCategories"];
