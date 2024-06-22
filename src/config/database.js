import mongoose from "mongoose";

const connectDb = (url) => mongoose.connect(url);

export default connectDb;
