import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IActive, IUser, Role } from "./user.interfaces";

const userSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: [true, "User name must be required."]
    },
    email: {
        type: String,
        required: [true, "Email must be required"],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password must be required"]
    },
    phone: {
        type: String,
        required: [true, "Phone no must be required"],
        unique: true
    },
    role: {
        type: String,
        enum: [...Object.values(Role)],
        default: Role.RIDER
    },
    active: {
        type: String,
        enum: [...Object.values(IActive)],
        default: IActive.ACTIVE
    },
    nidNo: {
        type: String,
        required: [true, "Nid number must be required"],
        unique: true
    },
    profilePicture: {
        type: String
    },
    driverLicenseNumber: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, versionKey: false });


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


export const User = model<IUser>("User", userSchema);