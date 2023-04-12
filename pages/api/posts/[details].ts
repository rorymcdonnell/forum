import prisma from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Get authenticated users posts
    try {
      console.log("req query", req.query);
      const data = await prisma.post.findUnique({
        where: {
          id: req.query.details,
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      });

      res.status(200).json(data);
    } catch (error) {
      res
        .status(403)
        .json({ error: "Error whilst fetching details of the post" });
    }
  }
}
