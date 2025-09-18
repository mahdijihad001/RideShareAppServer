import { AppError } from "../../utils/AppError";
import { IStatus } from "../rider/rider.interfaces";
import { RiderRequest } from "../rider/rider.model";


const acceptRequest = async (id: string) => {
    const findRequest = await RiderRequest.findById(id);
    if (!findRequest) {
        throw new AppError(404, "Request not found");
    }
    if (findRequest.driver && findRequest.status !== IStatus.requested) {
        throw new AppError(400, "Ride already taken");
    };
    const update = await RiderRequest.findByIdAndUpdate(id, { status: IStatus.accepted }, { new: true });
    return update;
};

export const driverServices = {
    acceptRequest
}