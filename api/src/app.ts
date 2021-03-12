import 'reflect-metadata';
import express from 'express';
import createConnection from "./database";
import { router } from './routes';
import cors from 'cors';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

// not sure if it's working fine (CORS)
const corsOptions = cors({ origin: "*" })
app.use(corsOptions);

app.get("/users", (req, res) => {
    return res.json( { message: "ok" } );
});

// app.post("/", (req, res) => {
//     return res.json( { message: "dados salvos com sucesso!" } );
// });

export { app }