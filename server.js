const mongoose = require("mongoose");

const app = require('./app');

// const { DB_HOST, PORT = 3001 } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://sandrabrovska:QhcCxRVOMKX7NM0N@cluster0.ngut3ky.mongodb.net/db-products?retryWrites=true&w=majority")
  .then(() => {
    // app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })

