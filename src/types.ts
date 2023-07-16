export type Coords = {
    long: number;
    lat: number;
}

export type WalkScoreData = {
    status: number;
    walkscore: number;
    description: string;
    transit: TransitData,
    bike: BikeData
}

export type TransitData = {
    score: number;
    description: string;
    summary: string;
}

export type BikeData = {
    score: number;
    description: string;
}

export type CarbonData = {
       
}