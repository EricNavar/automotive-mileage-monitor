console.log("Hello world!");

interface CarVelocity {
    stanfordClassId: string;
    velocity: number;
}

interface MileageVelocity {
    mileage: number;
    velocity: number;
}

// Send video link to ML model and in return get the velocity and the classId of each car in the video as an Array
async function queryMLModel(videoLink: string): Promise<Array<CarVelocity>> {
    throw new Error("Not implemented yet");
}

// Get the mileage of the stanfordClassId for each car and return corresponding MileageVelocity array
// So essentially just replace stanfordClassId with the mileage of each car
async function CarVelocityToMileageVelocityList(carsVelocityList: Array<CarVelocity>): Promise<Array<MileageVelocity>> {
    throw new Error("Not implemented yet");
}

// Reduce the mileage of each array entry by an amount corresponding to the velocity of the car
// Info here: https://www.mpgforspeed.com/
// Return list of practical mileages (i.e. mileage with velocity taken into account) for each car in the video
async function transformMileageUsingSpeed(mileageVelocityList: Array<MileageVelocity>): Promise<Array<number>> {
    throw new Error("Not implemented yet");
}

// Apply average miles driven per day to the mileage of each car and the state's gas prices
// Gas prices here: https://collectapi.com/api/gasPrice/gas-prices-api
// Return list of yearly fuel costs for each car in the video
async function transformMileageToFuelCost(mileageList: Array<number>, stateAcronym: string): Promise<Array<number>> {
    throw new Error("Not implemented yet");
}

export async function getMileageFromVideo(videoLink: string): Promise<Array<number>> {
    const carsVelocityList: Array<CarVelocity> = await queryMLModel(videoLink);
    
    const mileageVelocityList: Array<MileageVelocity> = await CarVelocityToMileageVelocityList(carsVelocityList);

    const mileageList: Array<number> = await transformMileageUsingSpeed(mileageVelocityList);

    return mileageList;
}

export async function getFuelCostsFromVideo(videoLink: string, stateAcronym: string): Promise<Array<number>> {
    const fuelCosts: Array<number> = await transformMileageToFuelCost(await getMileageFromVideo(videoLink), stateAcronym);

    return fuelCosts;
}

