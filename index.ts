import express, { Request, Response } from "express";
import moment from "moment";
import https from "https";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 443;

app.use(express.json());

app.get("/serverTime", ((req: Request, res: Response) => {
  const serverTime = moment().format("HH:mm:ss [GMT]Z");

  res.json({
    serverTime,
  });
  })
);

app.get("/name", ((req: Request, res: Response) => {
  res.json({
    name: "Angela Gao"
  });
  })
);

app.get("/serverIP", ((req: Request, res: Response) => {
  const serverIP = req.socket.localAddress;

  res.json({
    serverIP,
  });
  })
);

//Read SSL Certificates
const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");

// Start HTTPS Server
https.createServer({ key, cert }, app).listen(process.env.PORT, () => {
  console.log(`Secure server running at https://localhost:${process.env.PORT}`);
});