import { Types } from "mongoose";
import { AppError } from "../../utils/AppError";
import { IRider, IStatus } from "./rider.interfaces";
import { RiderRequest } from "./rider.model";

const createRiderRequest = async (payload: Partial<IRider>) => {
    const request = await RiderRequest.create(payload);
    return request
};

const cancleRideRequest = async (id: string, riderId: Types.ObjectId) => {
    const findRide = await RiderRequest.findById(id);

    if (!findRide?.rider.equals(riderId)) {
        throw new AppError(400, "You are not permitted to cancel this ride.");
    }

    if (!findRide) {
        throw new AppError(404, "Ride Request not found");
    };

    if (findRide.status === IStatus.cancelled) {
        throw new AppError(409, "Request already cancled");
    };

    if (findRide.status !== IStatus.requested) {
        throw new AppError(400, "Ride cannot be cancelled at this stage.");
    }

    const update = await RiderRequest.findByIdAndUpdate(findRide._id, { status: IStatus.cancelled }, { new: true });

    return update

};

const getAllRide = async (query: Record<string, string>) => {
    const searchTerm = query.searchTerm || "";
    const allRide = await RiderRequest.find({
        // status : {$regex : "c" , $options : "i"}
        $or: [
            { status: { $regex: searchTerm, $options: "1" } }
        ]
    });
    const totalData = await RiderRequest.countDocuments();
    return { allRide, totalData }
}

export const riderRequestServices = {
    createRiderRequest,
    cancleRideRequest,
    getAllRide
};