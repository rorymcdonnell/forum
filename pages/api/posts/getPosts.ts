import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Fetch all posts
    try {
      const data = await prisma.post.findMany({
        //@ts-ignore
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(403).json({ error: "Error whilst fetching posts" });
    }
  }
}
