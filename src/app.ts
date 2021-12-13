import express from "express";
import bodyParser from "body-parser";
import helment from "helmet";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user";
import HttpStatus from "./utils/Enums";
import hobbyRouter from "./routes/hobby";
import mLogger from "./utils/logger";
import mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

const PORT = process.env.PORT || 8000;
const mongoDbURL = process.env.mongoDbURL;
const app = express();

app.use("/api-reference", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helment());
app.use(mLogger);

// root route
app.all("/", (req: express.Request, res: express.Response) => {
  return res
    .status(HttpStatus.OK)
    .send({ success: true, message: "The API is working" });
});


app.use("/user", userRouter);
app.use("/hobby", hobbyRouter);


// Error handler
app.use((req: express.Request, res: express.Response): any => {
  return res.status(HttpStatus.BadRequest).send("Route not found");
});

mongoose
  .connect(mongoDbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database server connected");
    app.listen(PORT, () =>
      console.log(`Server is up and running at port ${PORT}`)
    );
  })
  .catch((err) => {
    console.log("Database Connection error: ", err.message);
  });

export default app;
