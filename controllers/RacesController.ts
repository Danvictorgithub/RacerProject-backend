import {Request, Response} from "express";
import prisma from "../configs/prisma";
import { body,validationResult } from "express-validator";
import { Race } from "@prisma/client";

const Races = prisma.race;

export async function index(req: Request, res: Response) {
    return res.json(await Races.findMany());
}

export async function show(req:Request, res:Response) {
    const race:Race|null = await Races.findUnique({where:{id:Number(req.params.id)}});
    if (race !== null) {
        return res.json(race);
    }
    return res.status(404).json({message:"Race not found!"});
}

export const create = [
    body("wpm").trim().notEmpty().withMessage("WPM is required!").isLength({max:300}).withMessage("Cheating is not allowed"),
    body("school_id").trim().notEmpty().withMessage("School ID is required!").isLength({min:9,max:9}).withMessage("Invalid School ID"),
    async (req:Request, res:Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error:errors.array()});
        }
        if (!req.body.school_id.includes("-")) {
            return res.status(400).json({message:"Invalid School ID"});
        }
        //Todo: Implement Anti Cheat System
        const {wpm, school_id} = req.body;
        const checkRace = await Races.findFirst({where:{school_id:school_id}});
        if (checkRace !== null ) {
            return res.status(400).json({message:"School ID already exist"});
        }
        const newRace = await Races.create({data:{wpm:Number(wpm), school_id:school_id}});
        return res.json({message:"Successfully created Race"});
    }
];