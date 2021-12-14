import prisma from "../../utils/dbClient";
import { NextFunction, Request, Response } from "express";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  console.log("Inside getAll", getAll)
  try {
    const users = await prisma.user
      .findMany({
        include: {
          profile: true
        }
      })

    res.json(users)
  } catch (error) {
    res.status(500).json({ error });

  }
}

export async function getOneById(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.json(userData);
  } catch (error) {
    console.error("[ERROR] getAll: ", { error });
    res.status(500).json({ error });
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const targetId = parseInt(req.params.id)
  try {
    const userToDelete = await prisma.user.delete({
      where: {
        id: targetId,
      }
    })
    res.json({userToDelete})
  } catch (error) {
    res.status(500).json({message: "Delete successful"})
  }
}
