import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const PORT = 6000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All incoming routes will be sent to the userRoute for CRUD handling

// Local error handler
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req: Request, res: Response) => {
  console.log('Backend and frontend linked');
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
// Global error handler
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: err },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log("ERROR: ", errorObj.log);
  const errorStatus = errorObj.status || 500;
  return res.status(errorStatus).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;