console.log("Hello world!");

interface CarsVelocityList {
    stanfordClassId: string;
    velocity: number;
}

interface MileageVelocityList {
    mileage: number;
    velocity: number;
}

async function queryMLModel(videoLink: string): Promise<CarsVelocityList> {
    // error not implemented yet
    throw new Error("Not implemented yet");
}

async function carListToMileageVelocityList(carsVelocityList: CarsVelocityList): Promise<MileageVelocityList> {
    // error not implemented yet
    throw new Error("Not implemented yet");
}

async function transformMileageUsingSpeed(mileageVelocityList: MileageVelocityList): Promise<Array<number>> {
    // error not implemented yet
    throw new Error("Not implemented yet");
}

async function transformMileageToFuelCost(mileageList: Array<number>): Promise<Array<number>> {
    // error not implemented yet
    throw new Error("Not implemented yet");
}

export async function getMileageFromVideo(videoLink: string): Promise<Array<number>> {
    const carsVelocityList: CarsVelocityList = await queryMLModel(videoLink);
    
    const mileageVelocityList: MileageVelocityList = await carListToMileageVelocityList(carsVelocityList);

    const mileageList: Array<number> = await transformMileageUsingSpeed(mileageVelocityList);

    return mileageList;
}

export async function getFuelCostsFromVideo(videoLink: string): Promise<Array<number>> {
    const carsVelocityList: CarsVelocityList = await queryMLModel(videoLink);
    
    const mileageVelocityList: MileageVelocityList = await carListToMileageVelocityList(carsVelocityList);

    const mileageList: Array<number> = await transformMileageUsingSpeed(mileageVelocityList);

    const fuelCosts: Array<number> = await transformMileageToFuelCost(mileageList);

    return fuelCosts;
}

