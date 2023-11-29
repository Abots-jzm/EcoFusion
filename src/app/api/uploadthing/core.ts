import { createUploadthing, type FileRouter } from "uploadthing/next";
import { authoptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/libs/prismadb";

const f = createUploadthing();

const uploadInputParser = z.object({
  storeId: z.string(),
  label: z.string().optional(),
});

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(uploadInputParser)
    .middleware(async ({ input }) => {
      const serverSession = await getServerSession(authoptions);
      if (!serverSession) throw new Error("Unauthorized");
      return input;
    })
    .onUploadComplete(async ({ file, metadata }) => {
      await prisma.billboard.create({
        data: {
          storeId: metadata.storeId,
          imageUrl: file.url,
          label: metadata.label,
        },
      });

      return "Success";
    }),
} satisfies FileRouter;

export type UploadRouter = typeof ourFileRouter;
export type CreateBillBoardPayload = z.infer<typeof uploadInputParser> & {
  imageUrl: string;
};
