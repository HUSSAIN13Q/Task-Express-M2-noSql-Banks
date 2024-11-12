let accounts = require("./accounts");
const express = require("express");
const app = express();
const connectDB = require("./database");

connectDB();

const accountsRoutes = require("./api/routes/accounts.routes");

app.use(express.json());
app.use("/accounts", accountsRoutes);

const PORT = 8002;

app.listen(PORT, () => {
  console.log(`the app is running in port http://localhost:${PORT}`);
});
