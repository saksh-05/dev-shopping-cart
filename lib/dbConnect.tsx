import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  const db = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
export default dbConnect;
