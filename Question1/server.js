const express = require("express");
const numbersRoute = require("./routes/numbers");

const app = express();
const PORT = 9876;

app.use("/numbers", numbersRoute);

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
