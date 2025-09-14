import bcrypt from "bcryptjs";
import { AppError } from "../../utils/AppError";
import { IUser, Role } from "./user.interfaces";
import { User } from "./user.model";
import { createjwtToken } from "../../utils/jwt";

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


const loginUser = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const existUser = await User.findOne({ email: email });

    if (!existUser) {
        throw new AppError(404, "User not found");
    };

    const matchPassword = await bcrypt.compare(password as string, existUser.password);

    if (!matchPassword) {
        throw new AppError(401, "Invalid password");
    };

    const token = await createjwtToken(existUser);
    const { password: pass, ...rest } = existUser.toObject();

    return { user: rest, token }

};




export const userServices = {
    createUser,
    loginUser
}