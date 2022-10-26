import express, { Request, Response } from "express";
import { getMileageFromVideo, getFuelCostsFromVideo } from "../interpretVideo";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  console.log("Get request for / route received!");
  res.send("The / route is working");
});

router.post("/mileage", (req: Request, res: Response) => {
  res.send(getMileageFromVideo(req.body.videoLink));
});

router.post("/fuelCosts", (req: Request, res: Response) => {
  res.send(getFuelCostsFromVideo(req.body.videoLink, req.body.stateAcronym));
});

export default router;