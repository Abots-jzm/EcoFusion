import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const storesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .trim()
          .max(20, "Name is too long")
          .min(2, "Name is too short"),
      }),
    )
    .mutation(async ({ ctx, input: { name } }) => {
      const ownerId = ctx.session.user.id;
      const exist = await ctx.db.store.findFirst({ where: { name } });
      if (exist)
        throw new TRPCError({
          code: "CONFLICT",
          message: `A store with the name ${name} already exists`,
        });
      const store = await ctx.db.store.create({ data: { name, ownerId } });
      const { lastSelected } = await ctx.db.user.update({
        where: { id: ownerId },
        data: { lastSelected: store.id },
      });

      return lastSelected;
    }),
  edit: protectedProcedure
    .input(
      z.object({
        storeId: z.string(),
        name: z
          .string()
          .trim()
          .max(20, "Name is too long")
          .min(2, "Name is too short"),
      }),
    )
    .mutation(async ({ input: { storeId, name }, ctx }) => {
      const updatedStore = await ctx.db.store.update({
        where: { id: storeId, ownerId: ctx.session.user.id },
        data: { name },
      });

      if (!updatedStore)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Store could not be found",
        });
    }),
  delete: protectedProcedure
    .input(z.object({ storeId: z.string() }))
    .mutation(async ({ ctx, input: { storeId } }) => {
      const userId = ctx.session.user.id;
      await ctx.db.store.delete({ where: { id: storeId, ownerId: userId } });
      const nextStoreId = (
        await ctx.db.store.findFirst({ where: { ownerId: userId } })
      )?.id;

      await ctx.db.user.update({
        where: { id: userId },
        data: { lastSelected: nextStoreId ?? null },
      });

      return nextStoreId;
    }),
});
