import { AppError } from "../../utils/AppError";
import { IRider, IStatus } from "./rider.interfaces";
import { RiderRequest } from "./rider.model";

const createRiderRequest = async(payload : Partial<IRider>) =>{
    const request = await RiderRequest.create(payload);
    return request
};

const cancleRideRequest = async(id : string) =>{
    const findRide = await RiderRequest.findById(id);

    if(!findRide){
        throw new AppError(404 , "Ride Request not found");
    };

    if(findRide.status === IStatus.cancelled){
        throw new AppError(409 , "Request already cancled");
    };

    if(findRide.status !== IStatus.requested){
        throw new AppError(400 , "Ride cannot be cancelled at this stage.");
    }

    const update = await RiderRequest.findByIdAndUpdate(findRide._id , {status : IStatus.cancelled} , {new : true});

    return update

};


export const riderRequestServices = {
    createRiderRequest,
    cancleRideRequest
}