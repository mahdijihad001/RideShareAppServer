import { AppError } from "../../utils/AppError";
import { IUser, Role } from "./user.interfaces";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
    if (payload.role === Role.DRIVER && !payload.driverLicenseNumber) {
        throw new AppError(400, "You are want to be a Draiver. Must be given your Draiver License Number.");
    };

    const isExistDraiverLicensno = await User.findOne({ driverLicenseNumber: payload.driverLicenseNumber });

    if (isExistDraiverLicensno) {
        throw new AppError(400, `${payload.driverLicenseNumber} already exist`);
    }

    const user = await User.create(payload);

    return { user };
};




export const userServices = {
    createUser
}