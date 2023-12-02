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
  getUserBillboards: protectedProcedure
    .input(z.object({ storeId: z.string() }))
    .query(async ({ ctx, input: { storeId } }) => {
      return await ctx.db.billboard.findMany({
        where: { storeId },
        orderBy: [{ createdAt: "asc" }],
      });
    }),
  getBillboard: protectedProcedure
    .input(z.object({ storeId: z.string(), id: z.string() }))
    .query(async ({ ctx, input: { storeId, id } }) => {
      return await ctx.db.billboard.findFirstOrThrow({
        where: { storeId, id },
      });
    }),
  editBillboard: protectedProcedure
    .input(
      z.object({
        storeId: z.string(),
        id: z.string(),
        imageUrl: z.string().url().optional(),
        label: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input: { storeId, id, imageUrl, label } }) => {
      return await ctx.db.billboard.update({
        where: { storeId, id },
        data: { imageUrl, label },
      });
    }),
  deleteBillboard: protectedProcedure
    .input(z.object({ id: z.string(), storeId: z.string() }))
    .mutation(async ({ ctx, input: { id, storeId } }) => {
      await ctx.db.billboard.delete({
        where: { id, storeId },
      });
    }),
});
