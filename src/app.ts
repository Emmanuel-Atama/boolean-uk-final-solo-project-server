import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import usersRouter from './resources/users/router'
import profileRouter from './resources/profile/router'
import hobbyRouter from './resources/hobby/router'
import registerRouter from './resources/register/router'
import loginRouter from './resources/login/router'
import usersRequestRouter from './resources/usersRequest/router'
import imagesRouter from './resources/images/router'

// load the environment variables from the .env file
dotenv.config();

const app = express();

/* SETUP MIDDLEWARE */
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

/* SETUP ROUTES */
app.use("/users", usersRouter)
app.use("/register", registerRouter)
app.use("/login", loginRouter)
app.use("/profile", profileRouter)
app.use("/hobby", hobbyRouter)
app.use("/usersRequest", usersRequestRouter)
app.use("/images", imagesRouter)


app.get("*", (req: Request, res:Response) => {
    res.json({ Test: true });
});

// make server listen on some port
const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`)
})