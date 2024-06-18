import mongoose from "mongoose";
import { config } from "dotenv";
config();

const MONGODB_URL = process.env.MONGODB_URL;
const DB_NAME = process.env.DB_NAME

function mongodbConnect() {
  mongoose
    .connect(MONGODB_URL+DB_NAME)
    .then((res) => {
      console.log("Connection success");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default mongodbConnect;
