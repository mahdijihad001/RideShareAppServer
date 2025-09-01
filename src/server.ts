import { Server } from "http";
import { envVars } from "./app/config/env";
import mongoose from "mongoose";
import app from "./app";




let server: Server





const boostServer = async () => {
    try {

        await mongoose.connect(envVars.MONGO_URI);
        console.log("Mongoose Connected Success");
        server = app.listen(envVars.PORT, () => {
            console.log(`http://localhost:${envVars.PORT}`);
        });

    } catch (error: any) {
        console.log("Mongoose Connection Error", error.message);
    }
};


(async () => {
    await boostServer();
})();



process.on("SIGTERM", () => {
    console.log("Sigterm singnal detected... Server shuting down.");

    if (server) {
        server.close(() => {
            process.exit(0);
        })
    };
    process.exit(0);
});

process.on("SIGINT", () => {
    console.log("Sigint signal detected... Server shuting doen.");

    if (server) {
        server.close(() => {
            process.exit(0);
        })
    };
    process.exit(0);

});


process.on("uncaughtException", () => {
    console.log("UncaughtException detected... Server shuting doen.");

    if (server) {
        server.close(() => {
            process.exit(0);
        })
    };
    process.exit(0);

});

process.on("unhandledRejection", () => {
    console.log("UnhandledRejection detected... Server shuting doen.");

    if (server) {
        server.close(() => {
            process.exit(0);
        })
    };
    process.exit(0);

});