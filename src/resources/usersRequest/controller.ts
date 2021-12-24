import prisma from "../../utils/dbClient";
import { NextFunction, Request, Response } from "express";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  // console.log("Inside getAll", getAll)
  try {
    const usersReq = await prisma.usersOnUsers.findMany({})
    res.json(usersReq)
  } catch (error) {
    res.status(500).json({ error });

  }
}
export async function sendRequest(req: Request, res: Response, next: NextFunction) {
    // console.log("Inside sendRequest", sendRequest)
    try {
      const usersReq = await prisma.usersOnUsers.create({
          data: {
              senderId: 9,
              receiverId: req.body.receiverId,
          }
      })
      res.json(usersReq)
    } catch (error) {
      res.status(500).json({ error });
  
    }
  }

  export async function updateOneById(req: Request, res: Response, next: NextFunction) {
    const { senderId, receiverId, accepted } =req.body
    try {
      const updateRequest = await prisma.usersOnUsers.update({
        where: {
          id: parseInt(req.params.id)
        },
        data: {
          ...req.body,
          senderId,
          receiverId, 
          accepted,
        }
      })
      res.json([updateRequest.senderId, updateRequest.receiverId, updateRequest.accepted])
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  export async function deleteUserRequest(req: Request, res: Response, next: NextFunction) {
    const targetId = parseInt(req.params.id)
    try {
      const profileToDelete = await prisma.usersOnUsers.delete({
        where: {
          id: targetId,
        }
      })
      res.json({profileToDelete})
    } catch (error) {
      res.status(500).json({message: "Delete successful"})
    }
  }