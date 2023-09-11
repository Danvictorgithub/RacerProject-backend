import express,{Express, urlencoded, Request,Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import logger from "morgan";
dotenv.config();
const app:Express = express();

const port = 8888;

app.use(logger("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended:true}));

app.use("/", (req:Request, res:Response) => {
    res.json({message:"Hello World"});
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})