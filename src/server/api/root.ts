import { createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "./routers/users";
import { storesRouter } from "./routers/stores";
import { billboardsRouter } from "./routers/billboards";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  stores: storesRouter,
  billboards: billboardsRouter,
});

export type AppRouter = typeof appRouter;
