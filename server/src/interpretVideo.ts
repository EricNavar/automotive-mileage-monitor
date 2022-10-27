import fetch from "node-fetch";
import xml2js from "xml2js";
import cars from "./cars";

interface CarSpeed {
    stanfordClassId: string;
    speed: number;
}

interface MileageSpeed {
    mileage: number;
    speed: number;
}

export interface Car {
    make: string;
    model: string;
    type: string;
    year: string;
}

async function stanfordClassToCar(stanfordClassId: string): Promise<Car> {
    return cars[parseInt(stanfordClassId) + 1];
}

export async function carToEpaId(car: Car): Promise<string> {
    return fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${car.year}&make=${car.make}&model=${car.model}`).then((response) => {
        return response.text();
    }).then((xmlResponse: string) => {
        return xml2js.parseStringPromise(xmlResponse);
    }).then((jsonResponse: any) => {
        try {

            console.log(jsonResponse);
            let toReturn = jsonResponse.menuItems.menuItem[0].value[0];
            console.log(toReturn);
            return toReturn;
        }
        catch (e) {
            console.log("CAUGHT: " + e);
            return "40606";
        }
    });
}

async function stanfordClassToEpaId(stanfordClassId: string): Promise<string> {
    const car = await stanfordClassToCar(stanfordClassId);
    return carToEpaId(car);
}

export async function epaIdToMileage(epaId: string): Promise<number> {
    return fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${epaId}`).then((response) => {
        return response.text();
    }).then((xmlResponse: string) => {
        return xml2js.parseStringPromise(xmlResponse);
    }).then((data: any) => {
        return data.vehicle.comb08[0];
    });
}

/**
 * Send video link to ML model and in return get the speed and the classId of each car in the video as an Array
 * 
 */
async function queryMLModel(videoLink: string): Promise<Array<CarSpeed>> {
    return mlModelDummyData();
}

/**
 *  Get the mileage of the stanfordClassId for each car and return corresponding MileageSpeed array
 *  So essentially just replace stanfordClassId with the mileage of each car
 */
async function carSpeedToMileageSpeedArray(carSpeedList: Array<CarSpeed>): Promise<Array<MileageSpeed>> {
    let toReturn: Array<MileageSpeed> = [];

    for (const carSpeed of carSpeedList) {
        const epaId = await stanfordClassToEpaId(carSpeed.stanfordClassId);
        const mileage = await epaIdToMileage(epaId);
        toReturn.push({ mileage: mileage, speed: carSpeed.speed });
    }

    return toReturn;
}

/**
 * Reduce the mileage of each array entry by an amount corresponding to the speed of the car
 * Info here: https://www.mpgforspeed.com/
 * Return list of practical mileages (i.e. mileage with speed taken into account) for each car in the video
 * 
 * Approximate function for mileage based on speed: 
 *      practicalMileage = advertisedMileage*( (1/30)*(-1/120)*(speed - 55)^2+30)
 * 
 */

export async function transformMileageUsingSpeed(mileageSpeedList: Array<MileageSpeed>): Promise<Array<number>> {
    const mileageTransform = (adMileage: number, speed: number) => adMileage * ((1 / 30) * ((-1 / 120) * (Math.pow(speed - 55, 2)) + 30));

    return mileageSpeedList.map((mileageSpeed) => mileageTransform(mileageSpeed.mileage, mileageSpeed.speed));
}

/**
 * Apply average miles driven per day to the mileage of each car and the state's gas prices
 * Gas prices here: https://collectapi.com/api/gasPrice/gas-prices-api
 * Return list of yearly fuel costs for each car in the video
 * 
 * Average miles driven per year = 11,500
 * According to https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle#:~:text=typical%20passenger%20vehicle%3F-,A%20typical%20passenger%20vehicle%20emits%20about%204.6%20metric%20tons%20of,around%2011%2C500%20miles%20per%20year.
 * 
 */
export async function transformMileageToFuelCost(mileageList: Array<number>, stateAcronym: string): Promise<Array<number>> {
    const avgMilesDrivenPerYear: number = 11500;

    const gasPrice: number = await fetch(`https://api.collectapi.com/gasPrice/stateUsaPrice?state=${stateAcronym}`, {
        headers: {
            "content-type": "application/json",
            "authorization": "" + process.env.COLLECT_API_KEY
        }
    }).then((response) => {
        return response.json();
    }).then((json) => {
        return parseFloat(json.result.state.gasoline);
    });

    return mileageList.map((mileage) => Math.round(gasPrice / mileage * avgMilesDrivenPerYear * 100) / 100);
}

export async function getMileageFromVideo(videoLink: string): Promise<Array<number>> {
    const carsSpeedList: Array<CarSpeed> = await queryMLModel(videoLink);
    const mileageSpeedList: Array<MileageSpeed> = await carSpeedToMileageSpeedArray(carsSpeedList);
    const mileageList: Array<number> = (await transformMileageUsingSpeed(mileageSpeedList)).map((mileage) => Math.round(mileage * 1000) / 1000);

    return mileageList;
}

export async function getFuelCostsFromVideo(videoLink: string, stateAcronym: string): Promise<Array<number>> {
    const fuelCosts: Array<number> = await transformMileageToFuelCost(await getMileageFromVideo(videoLink), stateAcronym);

    return fuelCosts;
}

export async function getCombinedResultsFromVideo(videoLink: string, stateAcronym: string): Promise<Array<{ yearlyFuelCost: number, mileage: number, speed: number, make: string, model: string, year: string }>> {
    const carsSpeedList: Array<CarSpeed> = await queryMLModel(videoLink);
    const mileageSpeedList: Array<MileageSpeed> = await carSpeedToMileageSpeedArray(carsSpeedList);
    const mileageList: Array<number> = (await transformMileageUsingSpeed(mileageSpeedList)).map((mileage) => Math.round(mileage * 1000) / 1000);
    const fuelCosts: Array<number> = await transformMileageToFuelCost(mileageList, stateAcronym);
    
    let combinedObjectArray: Array<{ yearlyFuelCost: number, mileage: number, speed: number, make: string, model: string, year: string }> = [];
    
    for (let i = 0; i < carsSpeedList.length; i++) {
        let curCar: Car = await stanfordClassToCar(carsSpeedList[i].stanfordClassId);
        combinedObjectArray.push({yearlyFuelCost: fuelCosts[i], mileage: mileageList[i], speed: carsSpeedList[i].speed, make: curCar.make, model: curCar.model, year: curCar.year});
    }

    return combinedObjectArray;
}

function mlModelDummyData(): Array<CarSpeed> {
    return [
        { stanfordClassId: "1", speed: 10 },
        { stanfordClassId: "2", speed: 20 },
        { stanfordClassId: "3", speed: 30 },
        { stanfordClassId: "4", speed: 40 },
        { stanfordClassId: "5", speed: 50 },
        { stanfordClassId: "6", speed: 60 },
        { stanfordClassId: "7", speed: 70 },
        { stanfordClassId: "8", speed: 80 },
        { stanfordClassId: "9", speed: 90 },
        { stanfordClassId: "10", speed: 100 }
    ];
}