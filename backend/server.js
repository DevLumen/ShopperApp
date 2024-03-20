import express from "express";
import cors from "cors";
import games from "./routes/game.js";
import login from "./routes/login.js";
import register from "./routes/register.js"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/game", games);
app.use("/register", register);
app.use("/login", login);
// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});