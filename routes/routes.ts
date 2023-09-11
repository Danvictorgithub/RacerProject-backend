import express,{ Router,Request,Response } from "express";
import postRoutes from "./pollsRoutes";
const router:Router = express.Router();

router.get("/", (req:Request, res:Response) => {
    res.json({message:"Welcome to CSU Keyboard Warrior API! DdoSing is gay!"});
});
router.use("/polls",postRoutes);
export default router;
