const router = require("express").Router();
import { Request,Response,NextFunction } from "express";

router.get("/", (req:Request, res:Response, next:NextFunction) => {
  res.json("All good in here");
});

const activityRouter= require (`./activity.routes`)
router.use("/activity",activityRouter)

// const tripRouter=require(`./trip.routes`)
// router.use("/trip",tripRouter)

module.exports = router;