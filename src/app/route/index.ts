import driverRouter from "../modules/driver/driver.router";
import riderRequestRouter from "../modules/rider/rider.router";
import userRouter from "../modules/user/user.router";

const moduleRoutes = [
    {
        path: "/user",
        route: userRouter
    },
    {
        path : "/rider",
        route : riderRequestRouter
    },
    {
        path : "/driver",
        route : driverRouter
    }
];


export default moduleRoutes;