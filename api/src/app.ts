import 'reflect-metadata';
import express from 'express';
import createConnection from "./database";
import { router } from './routes';
import cors from 'cors';

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.get("/users", (req, res) => {
    return res.json( { message: "ok" } );
});

// app.post("/", (req, res) => {
//     return res.json( { message: "dados salvos com sucesso!" } );
// });

export { app }