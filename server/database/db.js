import mongoose from "mongoose";
import { DB_NAME, MONGODB_URL } from "../config.js";

function mongodbConnect() {
  mongoose
    .connect(`${MONGODB_URL}/${DB_NAME}`)
    .then((res) => {
      console.log("Connection success");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default mongodbConnect;
