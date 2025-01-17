import { NextFunction, Request, Response } from "express";
import prisma from "../../utils/dbClient"


export async function getAllProfile(req: Request, res: Response, next: NextFunction) {
  // console.log("Inside getAll", getAllProfile)
  try {
    const userProfile = await prisma.profile.findMany({
      include: {
        Images: true,
      }
    })

    res.json(userProfile)
  } catch (error) {
    res.status(500).json({ error });

  }
}

export async function getMyProfile(req: Request, res: Response, next: NextFunction) {
  // console.log("Inside getAll", getMyProfile)
  try {
    const userProfile = await prisma.user.findUnique({
      where: {
        id: 1,
      },
      include: {
        profile:true,
        sentRequest:true,
        receivedRequest:true,
      }
    })

    res.json(userProfile)
  } catch (error) {
    res.status(500).json({ error });

  }
}

export async function getOneProfileById(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);
  try {
    const userProfile = await prisma.profile.findUnique({
      where: {
        id: userId,
      },
    });
    res.json(userProfile);
  } catch (error) {
    console.error("[ERROR] getAll: ", { error });
    res.status(500).json({ error });
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {

  try {
    const updateOneProfile = await prisma.profile.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: {
username: req.body.username,
city: req.body.city,
area: req.body.area,
sexuality: req.body.sexuality,
      }
    })
    res.json({data: updateOneProfile})
  } catch (error) {
    res.status(500).json({ error });
  }
  }

  export async function deleteProfile(req: Request, res: Response, next: NextFunction) {
    const targetId = parseInt(req.params.id)
    try {
      const profileToDelete = await prisma.profile.delete({
        where: {
          id: targetId,
        }
      })
      res.json({profileToDelete})
    } catch (error) {
      res.status(500).json({message: "Delete successful"})
    }
  }