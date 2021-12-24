import prisma from "../../utils/dbClient";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { AuthenticatedRequest } from "./AuthenticatedRequest";

export async function login(req: Request, res: Response, next: NextFunction) {
  // console.log("Inside login function:", req.body)
    const userCredentials = {
      ...req.body,
    };
  
    if (!userCredentials.email || !userCredentials.password) {
      res.status(400).json({ error: "Missing email or password." });
    }
  
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userCredentials.email,
        },
      });
  
      if (user) {
        const match = await bcrypt.compare(
          userCredentials.password,
          user.password
        );
  
        // console.log({
        //   passwordFromRequest: userCredentials.password,
        //   passwordFromDatabase: user.password,
        // });
  
        if (match) {
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
          );
          res.status(201).json({ token });
        } else {
          res.status(401).json({ error: "Authentication failed." });
        }
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error });
    }
  };

  export async function protect(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  // console.log("INSIDE MIDDLEWARE: ", { headers: req.headers })

  const token: string = req.headers.authorization as string

  jwt.verify(token, process.env.JWT_SECRET as string, async (err, payload) => {
    if (err) {
      res.status(401).json({ error: "Not Authorized" })
    }
if (payload === undefined) {
  res.status(401).json({ error: "Not Authorized" })
  return
}
    console.log({ payload })

    // Find the authenticated user in our DB
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    })

    console.log({ userInMiddleware: user })

    // Attach to request object in order to use in controllers
    req.user = user

    next()
  })
}