const express = require("express");
const app = express();

app.use(express.json());

app.use("/admin",require ("./Router/adminRouter"));
app.use("/user",require ("./Router/userRouter"));
app.use("/reservasi",require ("./Router/reservasiRouter"));
app.use("/table",require ("./Router/tableRouter"));
app.use("/menu",require ("./Router/menuRouter"));
app.use("/review",require ("./Router/reviewRouter"));

module.exports = app