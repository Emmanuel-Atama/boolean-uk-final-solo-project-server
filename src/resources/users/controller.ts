import prisma from "../../utils/dbClient";
import { Prisma } from ".prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


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

export async function GetPotentialDates(req: Request, res: Response, next: NextFunction) {
//   const currentUser
}