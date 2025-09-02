import z from "zod";
import { IActive, Role } from "./user.interfaces";


export const createUserZodSchema = z.object({
    userName: z.string().min(3, "User name must be at lateast 3 characters"),
    email: z.string().email("Invalid email address").toLowerCase(),
    password: z.string().min(8, { message: "Password to short. Minimun 8 character long." })
        .regex(/\d/, { message: "Password must be contain at least one number" })
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: "Password must be at last one speacil character" })
        .regex(/[A-Z]/, { message: "Password must be contain must be one uppercase chacacter" })
        .regex(/[a-z]/, { message: "Password must be contain at last one lowarcast character" })
    ,
    phone: z.string()
        .regex(/^(?:\+?880|0)(13|14|15|16|17|18|19)[0-9]{8}$/, { message: "Invalid number formate. Please try valid bangladashi number" }),
    role: z.enum([Role.RIDER, Role.DRIVER]),
    active: z.enum([IActive.ACTIVE, IActive.INACTIVE, IActive.BLOCKED]).optional(),
    nidNo: z.string()
        .regex(/^\d{10}$|^\d{13}$|^\d{17}$/, { message: "Invalid NID number. Must be 10, 13, or 17 digits" }),
    driverLicenseNumber: z.string()
        .regex(/^[A-Z]{2}\d{7}$/, { message: "Invalid driver license number. Format: 2 letters + 7 digits, e.g., AB1234567" })
        .optional(),
    profilePicture: z.string().optional()
});


export const updateUserZodSchema = z.object({
    userName: z.string().min(3, "User name must be at lateast 3 characters").optional(),
    email: z.string().email("Invalid email address").toLowerCase().optional(),
    password: z.string().min(8, { message: "Password to short. Minimun 8 character long." })
        .regex(/\d/, { message: "Password must be contain at least one number" })
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: "Password must be at last one speacil character" })
        .regex(/[A-Z]/, { message: "Password must be contain must be one uppercase chacacter" })
        .regex(/[a-z]/, { message: "Password must be contain at last one lowarcast character" }).optional()
    ,
    phone: z.string()
        .regex(/^(?:\+?880|0)(13|14|15|16|17|18|19)[0-9]{8}$/, { message: "Invalid number formate. Please try valid bangladashi number" }).optional(),
    role: z.enum([Role.RIDER, Role.DRIVER]).optional(),
    active: z.enum([IActive.ACTIVE, IActive.INACTIVE, IActive.BLOCKED]).optional(),
    nidNo: z.string()
        .regex(/^\d{10}$|^\d{13}$|^\d{17}$/, { message: "Invalid NID number. Must be 10, 13, or 17 digits" })
        .optional(),
    driverLicenseNumber: z.string()
        .regex(/^[A-Z]{2}\d{7}$/, { message: "Invalid driver license number. Format: 2 letters + 7 digits, e.g., AB1234567" })
        .optional(),
    profilePicture: z.string().optional()
});