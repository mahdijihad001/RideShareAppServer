import { IRider } from "./rider.interfaces";
import { RiderRequest } from "./rider.model";

const createRiderRequest = async(payload : Partial<IRider>) =>{
    const request = await RiderRequest.create(payload);
    return request
};

export const riderRequestServices = {
    createRiderRequest
}