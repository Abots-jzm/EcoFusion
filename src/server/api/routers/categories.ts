import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const categoriesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        storeId: z.string(),
        billboardId: z.string(),
        colors: z
          .object({
            name: z.string(),
            hex: z.string(),
          })
          .array()
          .optional(),
        sizes: z
          .object({
            name: z.string(),
          })
          .array()
          .optional(),
      }),
    )
    .mutation(
      async ({ ctx, input: { name, storeId, billboardId, colors } }) => {
        const category = await ctx.db.category.create({
          data: {
            name,
            storeId,
            billboardId,
            colors: {
              create: colors,
            },
          },
        });
        return null;
      },
    ),
});
