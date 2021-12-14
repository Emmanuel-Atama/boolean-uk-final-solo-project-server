import prisma from "../../utils/dbClient";
import { Prisma } from ".prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export async function register(req: Request, res: Response, next: NextFunction) {
    const { email, password, username, gender, city, area, sexuality } = req.body
  
  console.log("Request Body: ", req.body)
  
    const userToCreate = {
      email,
      password,
    };
  
  
    if (!userToCreate.email || !userToCreate.password) {
      res.status(400).json({ error: "Missing email or password." });
    }
  
    const hashedPassword: string = await bcrypt.hash(userToCreate.password, 8)
  
    console.log({
      plainPassword: userToCreate.password,
      securePassword: hashedPassword,
    })
  
    try {
      //Use brcypt to hash password on DB before storing it
      const user = await prisma.user.create({
        data: {
          ...userToCreate,
          password: hashedPassword,
          profile: {
            create: {
              username: req.body.username,
              gender: req.body.gender,
              city: req.body.city,
              area: req.body.area,
              sexuality: req.body.sexuality,
            },
          },
        },
      });
  
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRETE as string,
        { expiresIn: "1hr" }
      );
      res.status(201).json({ token });
    } catch (error) {
      console.error(error)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          res.status(501).json({
            error: {
              ...error,
              message: "User already exists.",
            },
          });
        } else {
          res.status(500).json({ error });
        }
      }
    }
  }