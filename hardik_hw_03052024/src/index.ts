import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { checkLeapYear } from "./logic";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/split/CentraLogic_Employee", (req: Request, res: Response) => {
  return res.status(200).json({ revisedString: "CentraLogic Employee" });
});

app.get("/split/:param1/:param2", (req: Request, res: Response) => {
  const { param1, param2 } = req.params as { param1: string; param2: string };
  return res.status(200).json({ revisedString: `${param1}${param2}` });
});


app.post("/split", (req:Request, res:Response) => {
  const { year } = req.body;

  if (typeof year !== "number" || isNaN(year)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const isLeapYear = checkLeapYear(year);

  // return res.status(200).json({ isLeapYear });
  return res.status(200).json({ "isLeapYear":isLeapYear });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
