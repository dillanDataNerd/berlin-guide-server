"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
router.get("/", (req, res, next) => {
    res.json("All good in here");
});
const activityRouter = require(`./activity.routes`);
router.use("/activities", activityRouter);
const tripRouter = require(`./trip.routes`);
router.use("/trips", tripRouter);
module.exports = router;
