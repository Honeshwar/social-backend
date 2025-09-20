const mongoose = require("mongoose");
// const configEnv = require("dotenv").config(); already use main.js
// // comment because vercel is serverless, this code on each req by user initialize db connection
// const db = mongoose
//   .connect(
//     `mongodb+srv://Honeshwar:${process.env.MONGODB_PASSWORD}@cluster0.o5zojlu.mongodb.net/?retryWrites=true&w=majority`
//   )
//   .then(
//     () => {
//       console.log("Database is connected");
//     },
//     (E) => {
//       console.error("Error: Database is not connecting \n", E);
//     }
//   );
//mongodb://dn

async function connectToMongoDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://Honeshwar:${process.env.MONGODB_PASSWORD}@cluster0.o5zojlu.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectToMongoDB;
// module.exports = db;
