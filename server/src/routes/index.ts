import express, { Request, Response } from "express";
import { getMileageFromVideo, getFuelCostsFromVideo, carToEpaId, epaIdToMileage, transformMileageToFuelCost, transformMileageUsingSpeed, getCombinedResultsFromVideo } from "../interpretVideo";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  console.log("Get request for / route received!");
  res.send("The / route is working");
});

router.post("/mileage", async (req: Request, res: Response) => {
  let videoLink: string = req?.query?.videoLink as string || "";
  res.send(await getMileageFromVideo(videoLink));
});

router.post("/fuelCosts", async (req: Request, res: Response) => {
  let videoLink: string = req?.query?.videoLink as string || "";
  let stateAcronym: string = req?.query?.stateAcronym as string || "FL";
  res.send(await getFuelCostsFromVideo(videoLink, stateAcronym));
});

router.post("/combinedObject", async (req: Request, res: Response) => {
  let videoLink: string = req?.query?.videoLink as string || "";
  let stateAcronym: string = req?.query?.stateAcronym as string || "FL";
  res.send(await getCombinedResultsFromVideo(videoLink, stateAcronym));
});

router.get("/test", async (req: Request, res: Response) => {
  res.send(await carToEpaId({make: "Toyota", model: "Camry", type: "whatever", year: "2019"}));
});

router.get("/test2", async (req: Request, res: Response) => {
  res.send(await epaIdToMileage("40606"));
});

router.get("/test3", async (req: Request, res: Response) => {
  res.send(await transformMileageToFuelCost([25], "CA"));
});

router.get("/test4", async (req: Request, res: Response) => {
  res.send(await transformMileageUsingSpeed([{mileage: 25, speed: 60}]));
});

export default router;