// import { NextFunction, Request, Response } from "express";
// import prisma from "../../utils/dbClient"

// export async function getPotentialMatches(req: Request, res: Response, next: NextFunction) {
//     console.log("Inside Potential Matches: ", getPotentialMatches)
// try {
//     const allUsers = await prisma.user
//     .findMany({
//         include: {
//           hobbies: true
//         }
//     })
//     res.json(allUsers)
// } catch (error) {
//     res.status(500).json({ error });

//   }
// }