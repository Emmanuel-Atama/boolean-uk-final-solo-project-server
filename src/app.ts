import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import router from './resources/users/router';

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
app.use("/users", router)

app.get("*", (req: Request, res:Response) => {
    res.json({ Test: true });
});

// make server listen on some port
((port = process.env.APP_PORT || 4000) => {
    app.listen(port, () => console.log(`\n🚀 Server is running on http://localhost:${port}/\n`));
  })();