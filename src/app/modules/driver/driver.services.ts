import { Types } from "mongoose";
import { AppError } from "../../utils/AppError";
import { IStatus } from "../rider/rider.interfaces";
import { RiderRequest } from "../rider/rider.model";


const acceptRequest = async (id: string, driver: string) => {
    const findRequest = await RiderRequest.findById(id);
    if (!findRequest) {
        throw new AppError(404, "Ride request not found");
    }
    if (findRequest.status === IStatus.cancelled) {
        throw new AppError(400, "Ride cancaled.");
    }
    if (findRequest.driver && findRequest.status !== IStatus.requested) {
        throw new AppError(400, "Ride already taken");
    };
    const update = await RiderRequest.findByIdAndUpdate(id, { status: IStatus.accepted, driver: driver }, { new: true });
    return update;
};

const updateRequestStatus = async (id: string, data: string, driverId : Types.ObjectId) => {
    const findRideRequest = await RiderRequest.findById(id);
    if (!findRideRequest){
        throw new AppError(404, "Request not found");
    };

    if (findRideRequest.driver && !findRideRequest?.driver.equals(driverId)){
        throw new AppError(400, "You are not permitted to update this ride.");
    };

    if(findRideRequest.status === IStatus.rejected || findRideRequest.status === IStatus.completed){
        throw new AppError(400 , `Request already ${findRideRequest.status}`);
    };

    const updateRide = await RiderRequest.findByIdAndUpdate(id, { status: data }, { new: true });
    return updateRide
};

export const driverServices = {
    acceptRequest,
    updateRequestStatus
};