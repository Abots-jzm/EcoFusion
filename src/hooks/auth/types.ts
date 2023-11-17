import { User as PrismaUserType } from "@prisma/client";

export type User = Omit<PrismaUserType, "hashedPassword">;
