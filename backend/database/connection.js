import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MANGO_URI)
        console.log(`MangoDb Connection Made succcessfull @ : ${connection.connection.host}`);
    } catch (error) {
        console.error(`cannot connect to database\nerror message : ${error.message}` );
        process.exit(1);
    }
}

export default connectDb;