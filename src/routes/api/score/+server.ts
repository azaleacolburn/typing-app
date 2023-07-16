import type { RequestEvent } from "@sveltejs/kit";
import type { CarbonData, Coords, WalkScoreData } from "../../../types";

export const POST = async (event: RequestEvent) => {
    let c: Coords = await event.request.json();
    let w: WalkScoreData = await walkscore(c);
    let carbon_footprint = 
}

async function walkscore(c: Coords): Promise<WalkScoreData> {
    let data: WalkScoreData = await fetch(`https://api.walkscore.com/score?format=json&address=1119%8th%20Avenue%20Seattle%20WA%2098101&lat=${c.lat}lon=-${c.long}&transit=1&bike=1&wsapikey={walkkey}`)
        .then((res) => res.json())

    if (data.status != 1) {
        console.log("Walkscore Problem");
        throw Error("Walkscore Problem");   
    }
    return data;
    
}

async function carbon_footprint(c: Coords): Promise<CarbonData> {
    const url = 'https://apis.wattbuy.com/v3/electricity/carbon-footprint';
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-api-key': 'rsFQKFKcYk9FOyZuaNne12QHdHeRACtOCT29m5uh'
        }
      };
}