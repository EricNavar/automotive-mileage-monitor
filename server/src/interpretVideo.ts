interface CarSpeed {
    stanfordClassId: string;
    speed: number;
}

interface MileageSpeed {
    mileage: number;
    speed: number;
}

interface Car {
    make: string;
    model: string;
    year: number;
}

async function stanfordClassToCar(stanfordClassId: string): Promise<Car> {
    throw new Error("Not implemented yet");
}

async function carToEpaId(car: Car): Promise<string> {
    return fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${car.year}&make=${car.make}&model=${car.model}`).then((response) => {
        return response.json();
    }).then((json) => {
        return json.menuItem[0].value;
    });
}

async function stanfordClassToEpaId(stanfordClassId: string): Promise<string> {
    const car = await stanfordClassToCar(stanfordClassId);
    return carToEpaId(car);
}

async function epaIdToMileage(epaId: string): Promise<number> {
    return fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${epaId}`).then((response) => {
        return response.json();
    }).then((data) => {
        return data.comb08;
    });
}

/**
 * Send video link to ML model and in return get the speed and the classId of each car in the video as an Array
 * 
 */ 
async function queryMLModel(videoLink: string): Promise<Array<CarSpeed>> {
    throw new Error("Not implemented yet");
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
        toReturn.push({mileage: mileage, speed: carSpeed.speed});
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

async function transformMileageUsingSpeed(mileageSpeedList: Array<MileageSpeed>): Promise<Array<number>> {
    const mileageTransform = (adMileage: number, speed: number) => adMileage * ((1/30)*(-1/120)*(speed - 55)^2+30);

    return mileageSpeedList.map((mileageSpeed) => mileageTransform(mileageSpeed.mileage, mileageSpeed.speed));
}

/**
 * Apply average miles driven per day to the mileage of each car and the state's gas prices
 * Gas prices here: https://collectapi.com/api/gasPrice/gas-prices-api
 * Return list of yearly fuel costs for each car in the video
 * 
 */
async function transformMileageToFuelCost(mileageList: Array<number>, stateAcronym: string): Promise<Array<number>> {
    throw new Error("Not implemented yet");
}

export async function getMileageFromVideo(videoLink: string): Promise<Array<number>> {
    const carsSpeedList: Array<CarSpeed> = await queryMLModel(videoLink);
    
    const mileageSpeedList: Array<MileageSpeed> = await carSpeedToMileageSpeedArray(carsSpeedList);

    const mileageList: Array<number> = await transformMileageUsingSpeed(mileageSpeedList);

    return mileageList;
}

export async function getFuelCostsFromVideo(videoLink: string, stateAcronym: string): Promise<Array<number>> {
    const fuelCosts: Array<number> = await transformMileageToFuelCost(await getMileageFromVideo(videoLink), stateAcronym);

    return fuelCosts;
}

