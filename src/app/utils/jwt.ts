import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interfaces";
import jwt from "jsonwebtoken";

export const createjwtToken = async (payload: Partial<IUser>) => {

    const data = {
        userId: payload._id,
        email: payload.email,
        role: payload.role
    };

    const accessToken = jwt.sign(data, envVars.JWT.ACCESS_SECRATE, { expiresIn: "7d" });
    const refreshToken = jwt.sign(data, envVars.JWT.REFRESH_SECRATE, { expiresIn: "30d" });

    return { accessToken, refreshToken };

};
