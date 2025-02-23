import mongoose from "mongoose";
import { config } from "dotenv";
config();

export default (async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI!);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();
