import { NextFunction, Request, Response } from "express";
import prisma from "../../utils/dbClient"

export async function createHobby(req: Request, res: Response, next: NextFunction) {
const { name } = req.body

console.log("Request Body: ", req.body)

try {
    const hobbies = await prisma.hobby.create({
data: {
    names: req.body.names
}
    })
    res.json(hobbies)
} catch (error) {
    res.status(500).json({message: "Hobby created successfully"})
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
    console.log("Inside getAll", getAll)
    try {
      const users = await prisma.hobby.findMany({})
  
      res.json(users)
    } catch (error) {
      res.status(500).json({ error });
  
    }
  }
  
  export async function getOneById(req: Request, res: Response, next: NextFunction) {
    const userId = parseInt(req.params.id);
    try {
      const userData = await prisma.hobby.findUnique({
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

  export async function updateOneById(req: Request, res: Response, next: NextFunction) {
const { names } =req.body
try {
  const updateHobby = await prisma.hobby.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: {
      ...req.body,
      names
    }
  })
  res.json(updateHobby.names)
} catch (error) {
  res.status(500).json({ error });
}
  }

  export async function deleteHobby(req: Request, res: Response, next: NextFunction) {
    const targetId = parseInt(req.params.id)
    try {
      const hobbyToDelete = await prisma.hobby.delete({
        where: {
          id: targetId,
        }
      })
      res.json({hobbyToDelete})
    } catch (error) {
      res.status(500).json({message: "Delete successful"})
    }
  }