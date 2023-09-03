import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose, { mongo } from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.get("/", (req, res) => {
  return res.status(201).send("ITS WORKING");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
