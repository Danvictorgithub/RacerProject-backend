import {Request, Response} from "express";
import prisma from "../configs/prisma";
import { body,validationResult } from "express-validator";
import { Poll } from "@prisma/client";

const Polls = prisma.poll;

export async function index(req:Request, res:Response) {
    return res.json(await Polls.findMany());
}
export  async function show(req:Request, res:Response) {
    const {id} = req.params;
    const poll:Poll|null = await Polls.findUnique({where:{id: Number(id)}});
    if (poll !== null) {
        return res.json(poll);
    }
    return res.status(404).json({message:"Poll not found!"});
};

export const create = [
    body("title").trim().notEmpty().withMessage("Title is required!"),
    async (req:Request, res:Response) => { 
        const errors = validationResult(req);   
        if (!errors.isEmpty()) {
            return res.status(400).json({error:errors.array()});
        }
        const {title} = req.body;
        const newPoll = await Polls.create({data:{title:title}});
        return res.json({message:"Successfully created a Poll",newPoll});
    }
];

export const update = [
    body("option").isIn(['Yes','No']),
    async (req:Request,res:Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()});
        }
        const {id} = req.params;
        const isYes = (req.body.option === 'Yes');
        if (isYes) {
            await Polls.update({where:{id:Number(id)},data: {yesCount: {increment:1}}});
            return res.json({message:"Successfully incremented the poll!"});
        }
        else {
            await Polls.update({where:{id:Number(id)},data: {noCount: {increment:1}}});
            return res.json({message:"Successfully decremented the poll!"});
        }
    }
];