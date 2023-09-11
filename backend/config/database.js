const mongoose = require("mongoose");
exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    })
    .then((con) => console.log(`database is connected :${con.connection.host}`))
    .catch((err) => console.log(err));
};
