const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// Load environment variables from config.env file
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Connect to the MongoDB database using Mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connection successful ...");
  })
  .catch((err) => {
    console.log("ERROR: Database connection failed 💣", err);
  });

// Start the Express.js server
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port} ...`);
});
