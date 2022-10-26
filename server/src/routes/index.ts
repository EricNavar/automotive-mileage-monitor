import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  console.log("Get request for / route received!");
  res.send("The / route is working"); 
});

export default router;