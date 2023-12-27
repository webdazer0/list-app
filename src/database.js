const mongoose = require("mongoose");

// this options not needed anymore
// const dbOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URI)
  .then((db) => console.log("Database connected!!!"))
  .catch((err) => console.log(err));
