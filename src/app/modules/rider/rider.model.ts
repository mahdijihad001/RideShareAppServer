import { model, Schema, Types } from "mongoose";
import { IRider, IStatus } from "./rider.interfaces";


const riderRequest = new Schema<IRider>({
    rider: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    pickup: {
        lat: Number,
        lng: Number,
        address: String
    },
    destination: {
        lat: Number,
        lng: Number,
        address: String
    },
    status : {
        type : String,
        enum : [...Object.values(IStatus)],
        default : IStatus.requested
    },
    fare : {
        type : Number
    }
}, { timestamps: true, versionKey: false });

export const RiderRequest = model("RiderRequest" , riderRequest);