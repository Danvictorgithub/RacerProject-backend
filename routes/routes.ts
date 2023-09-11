import express,{ Router,Request,Response } from "express";
import pollsRoutes from "./pollsRoutes";
import racesRoutes from "./racesRoutes";
const router:Router = express.Router();

router.get("/", (req:Request, res:Response) => {
    res.json({message:"Welcome to CSU Keyboard Warrior API! DdoSing is gay!"});
});
router.use("/races",racesRoutes);
router.use("/polls",pollsRoutes);

export default router;
