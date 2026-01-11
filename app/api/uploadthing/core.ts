import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuthUser } from "@/lib/auth";
import { NextRequest } from "next/server";

const f = createUploadthing();

// Helper to get user from request
const getUser = async (req: NextRequest) => {
  const token = req.headers.get('cookie')?.match(/token=([^;]+)/)?.[1];
  if (!token) throw new Error("Unauthorized");
  
  const { verifyToken } = await import('@/lib/auth');
  return verifyToken(token);
};

export const ourFileRouter = {
  // Profile image uploader
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await getUser(req as unknown as NextRequest);
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Profile image uploaded for user:", metadata.userId);
      return { 
        url: file.url,
        userId: metadata.userId 
      };
    }),

  // Resume photo uploader
  resumePhoto: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await getUser(req as unknown as NextRequest);
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { 
        url: file.url,
        userId: metadata.userId 
      };
    }),

  // General file uploader
  generalUpload: f({ 
    image: { maxFileSize: "8MB" },
    pdf: { maxFileSize: "16MB" }
  })
    .middleware(async ({ req }) => {
      const user = await getUser(req as unknown as NextRequest);
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { 
        url: file.url,
        userId: metadata.userId,
        type: file.type 
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;