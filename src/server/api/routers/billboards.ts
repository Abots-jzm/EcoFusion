import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const billboardsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        storeId: z.string(),
        imageUrl: z.string().url(),
        label: z.string().optional(),
      }),
    )
    .mutation(async ({ input: { storeId, imageUrl, label }, ctx }) => {
      await ctx.db.billboard.create({
        data: { storeId, imageUrl, label },
      });
    }),
});
