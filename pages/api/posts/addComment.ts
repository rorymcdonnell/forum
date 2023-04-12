import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Please log in to add a comment." });
  }
  //@ts-ignore
  const prismaUser = await prisma.user.findUnique({
    where: { email: session?.user?.email },
  });

  if (req.method === "POST") {
    // Add a comment

    const { title, postId } = req.body.data;
    console.log("in add comment: ", req.body);
    if (!title.length) {
      return res.status(401).json({ message: "Please enter something" });
    }
    try {
      //@ts-ignore
      const result = await prisma.comments.create({
        data: {
          message: title,
          userId: prismaUser?.id,
          postId,
        },
      });

      res.status(200).json(result);
    } catch (err) {
      res
        .status(403)
        .json({ err: "Error has occured whilst adding a comment" });
    }
  }
}
