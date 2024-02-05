const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

const vendor = require('./routes/vendor');

mongoose
  .connect(
    "mongodb+srv://arunudhaya:Z0NpZBzoV8rKn4d4@cluster0.fqk5129.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/vendor',vendor);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
