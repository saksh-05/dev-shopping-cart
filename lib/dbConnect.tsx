import mongoose from "mongoose";

console.log("mongodb url: ", `${process.env.MONGODB_URI}`);
async function dbConnect() {
  await mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then((res) => console.log("connection made"))
    .catch((err) => console.log("error", err));
}
export default dbConnect;
