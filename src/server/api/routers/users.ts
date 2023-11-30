import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const usersRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email address").trim(),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long")
          .trim(),
      }),
    )
    .mutation(async ({ input: { email, password }, ctx }) => {
      const exist = await ctx.db.user.findUnique({ where: { email } });
      if (exist)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Email already in use",
        });

      const hpassword = await bcrypt.hash(password, 10);
      const user = await ctx.db.user.create({
        data: { email, hashedPassword: hpassword },
      });

      const { hashedPassword, ...userWithoutPassword } = user;

      return userWithoutPassword;
    }),
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
    });

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User could not be found",
      });

    const { hashedPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }),
  getInitialData: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const userPromise = ctx.db.user.findFirst({
      where: { id: userId },
    });
    const storesPromise = ctx.db.store.findMany({
      where: { ownerId: userId },
    });
    const [userWithPassword, stores] = await Promise.all([
      userPromise,
      storesPromise,
    ]);
    if (!userWithPassword) redirect("/login");
    const { hashedPassword, ...user } = userWithPassword;

    return { user, stores };
  }),
  getStores: protectedProcedure.query(async ({ ctx }) => {
    const stores = await ctx.db.store.findMany({
      where: { ownerId: ctx.session.user.id },
    });
    return stores;
  }),
  updateLastSelected: protectedProcedure
    .input(z.object({ storeId: z.string() }))
    .mutation(async ({ input: { storeId }, ctx }) => {
      const userId = ctx.session.user.id;
      const exist = await ctx.db.store.findFirst({
        where: {
          AND: [{ id: storeId }, { ownerId: userId }],
        },
      });

      if (!exist)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This store doesn't exist for this user",
        });

      await ctx.db.user.update({
        where: { id: userId },
        data: { lastSelected: storeId },
      });
    }),
});
