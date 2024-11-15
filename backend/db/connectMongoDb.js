import mongoose from "mongoose";

const connectMongoDb = async () => {
    console.log(process.env.MONGO_URL)
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo DB connected: ${con.connection.host}`);
    } catch (error) {
        console.log(`Mongo DB connection failed: ${error.message}`);
        process.exit(1);
    }
}

export default connectMongoDb;