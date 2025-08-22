import { buildApp } from "./app.js";
import { connectMongo } from "./db/mongo.js";
import { env } from "./config/env.js";

const app = buildApp();
connectMongo().then(()=>{
    app.listen(env.port, ()=>{
        console.log(`[HTTP] Listening on :${env.port}`)
    });
}).catch((err) => {
    console.error(`[DB] Faild to connect ${err}`)
    process.exit(1);
});