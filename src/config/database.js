import mongoose from "mongoose";

const connect = (url) => mongoose.connect(url);

const disconnect = () => mongoose.disconnect();

export default { connect, disconnect };
