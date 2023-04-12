import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please log in to create a post." });
    }

    //get the title
    const title: string = req.body.title;

    // Get the user
    //@ts-ignore
    const prismaUser = await prisma.user.findUnique({
      //@ts-ignore
      where: { email: session.user.email },
    });

    //check title length
    if (title.length > 300) {
      return res
        .status(403)
        .json({ message: "Post should be a maximum of 300 characters" });
    }

    if (!title.length) {
      return res
        .status(403)
        .json({ message: "Please write a post of at least 1 character" });
    }

    // Create the post after going through above checks
    try {
      const result = await prisma.post.create({
        data: {
          title,
          //@ts-ignore
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ error: "Error whilst creating post" });
    }
  }
}
