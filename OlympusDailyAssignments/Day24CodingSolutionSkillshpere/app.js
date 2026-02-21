import express from "express";
import coursesRoutes from "./routes/courses.js";
import usersRoutes from "./routes/users.js";

const app = express();

app.use(express.json());

app.use("/api/courses", coursesRoutes);
app.use("/api/users", usersRoutes);

export default app;
