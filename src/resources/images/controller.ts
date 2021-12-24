import { NextFunction, Request, Response } from "express";
import prisma from "../../utils/dbClient"


export async function getAllImages(req: Request, res: Response, next: NextFunction) {
  // console.log("Inside getAll", getAllImages)
  try {
    const userImage = await prisma.images.findMany({
        include: {
            profile: true,
        }
    })

    res.json(userImage)
  } catch (error) {
    res.status(500).json({ error });

  }
}