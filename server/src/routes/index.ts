import express, { Request, Response } from "express";
import { getMileageFromVideo, getFuelCostsFromVideo, carToEpaId, epaIdToMileage } from "../interpretVideo";

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

router.get("/test", async (req: Request, res: Response) => {
  res.send(await carToEpaId({make: "Toyota", model: "Camry", year: 2019}));
});

router.get("/test2", async (req: Request, res: Response) => {
  res.send(await epaIdToMileage("40606"));
});

export default router;