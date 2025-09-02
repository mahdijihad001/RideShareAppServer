import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHanle } from "./app/middleware/globalErrorHandler";
import { notFoundRoute } from "./app/middleware/notFoundRoute";
import moduleRoutes from "./app/route";

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Api Route
moduleRoutes.forEach((route) => app.use(route.path, route.route));

// Server Root Route
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "Ride share app runing successfully" });
});


app.use(globalErrorHanle);
app.use(notFoundRoute);


export default app