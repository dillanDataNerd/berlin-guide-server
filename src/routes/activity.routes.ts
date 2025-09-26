import express, { Request, Response, NextFunction } from "express";
const router = express.Router()
import prisma from '../db/index'
import { Activity } from "../generated/prisma";

//GET api/activity
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activities = await prisma.activity.findMany();
    res.json(activities);
  } catch (err) {
    next(err); 
  }
});

//GET api/activity/:activityId
router.get("/:activityId", async (req:Request,res:Response,next:NextFunction)=>{
    const activityId=req.params.activityId
    try{
        const response: Activity[]=await prisma.activity.findUnique({where: {id:activityId}})
        res.status(201).json(response)
    }catch(err){
        next(err)
    }

})


module.exports= router;
