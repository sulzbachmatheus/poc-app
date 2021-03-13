import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import createConnection from "./database";
import { router } from './routes';
import cors from 'cors';
import { AppError } from './errors/AppError';

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

//handling exceptions using middleware concept
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message
        });
    }
    return res.status(500).json({
        status: "Error",
        message: `Internal Server Error ${err.message}`
    })
});

//default route
app.get("/", (req, res) => {
    return res.json( { message: "root" } );
});

app.get("/users", (req, res) => {
    return res.json( { message: "ok" } );
});

export { app }