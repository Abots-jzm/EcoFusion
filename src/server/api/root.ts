import { createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "./routers/users";
import { storesRouter } from "./routers/stores";
import { billboardsRouter } from "./routers/billboards";
import { categoriesRouter } from "./routers/categories";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  stores: storesRouter,
  billboards: billboardsRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
