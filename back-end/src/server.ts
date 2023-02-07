import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AddressInfo } from "net";

export const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = 8000;

const server = app.listen(process.env.PORT || PORT, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
   } else {
      console.error(`Failure upon starting server.`);
   };
});