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
    }
];


export default moduleRoutes;