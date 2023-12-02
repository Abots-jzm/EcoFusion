import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

const f = createUploadthing();

const uploadInputParser = z.object({
  storeId: z.string(),
  label: z.string().optional(),
  mode: z.enum(["edit", "create"]),
  billboardId: z.string().optional(),
});

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(uploadInputParser)
    .middleware(async ({ input }) => {
      const serverSession = await getServerAuthSession();
      if (!serverSession) throw new Error("Unauthorized");
      return input;
    })
    .onUploadComplete(async ({ file, metadata }) => {
      if (metadata.mode === "create")
        await db.billboard.create({
          data: {
            storeId: metadata.storeId,
            imageUrl: file.url,
            label: metadata.label,
          },
        });

      if (metadata.mode === "edit" && metadata.billboardId)
        await db.billboard.update({
          where: { id: metadata.billboardId },
          data: { imageUrl: file.url, label: metadata.label },
        });

      return "Success";
    }),
} satisfies FileRouter;

export type UploadRouter = typeof ourFileRouter;
export type CreateBillBoardPayload = z.infer<typeof uploadInputParser> & {
  imageUrl: string;
};
