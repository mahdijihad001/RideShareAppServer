export enum Role {
    RIDER = "RIDER",
    DRIVER = "DRIVER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
};

export enum IActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
};

export interface IUser{
    _id?: string;
    userName: string;
    email: string;
    password: string;
    phone: string;
    role: Role;
    active: IActive;
    nidNo: string;
    profilePicture?: string;
    diverLicenseNumber?: string;
};