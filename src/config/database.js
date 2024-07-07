import mongoose from "mongoose";

const connect = (url) => mongoose.connect(url);

const disconnect = () => mongoose.disconnect();

const start = mongoose.connection;

export default { connect, disconnect, start };
