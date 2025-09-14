import { Types } from "mongoose";

export interface ILocation{
    lat : number,
    lng : number,
    address : string
};

export enum IStatus{
    requested = "requested",
    accepted = "accepted",
    pickedup = "pickedup",
    in_transit = "in_transit",
    completed = "completed",
    cancelled = "cancelled"
}

export interface IRider{
    _id ? : string,
    rider : Types.ObjectId,
    driver ?: string,
    pickup : ILocation,
    destination : ILocation,
    status: IStatus
    fare ? : number,
    createdAt ? : Date,
    updatedAt ? : Date
}