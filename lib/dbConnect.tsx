import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function dbConnect() {
  await mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
export default dbConnect;
