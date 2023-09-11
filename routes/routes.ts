import express,{ Router,Request,Response } from "express";

const router:Router = express.Router();

router.get("/", (req:Request, res:Response) => {
    res.json({message:"Welcome to CSU Keyboard Warrior API! DdoSing is gay!"});
});

export default router;
