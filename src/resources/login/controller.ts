import prisma from "../../utils/dbClient";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export async function login(req: Request, res: Response, next: NextFunction) {
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
  
        console.log({
          passwordFromRequest: userCredentials.password,
          passwordFromDatabase: user.password,
        });
  
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
      res.status(500).json({ error });
    }
  };
  