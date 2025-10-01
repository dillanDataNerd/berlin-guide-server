import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import prisma from "../db/index";
import { Activity } from "../generated/prisma";
import { type } from "node:os";

//GET api/activity
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activities = await prisma.activity.findMany({
      include: { trips: true },
    });
    res.json(activities);
    return;
  } catch (err) {
    next(err);
  }
});

//GET api/activity/search/?title&fave&activity-tag

router.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query);
      const title: string | undefined = req.query.title || undefined;
      const fave: string | undefined = req.query.fave || undefined;
      const faveBoolean: boolean | undefined =
        typeof fave === "string" ? JSON.parse(fave) : undefined;
      const tagString: string | null = req.query.tags;
      const tagArray: string[] =
        typeof tagString === "string" ? tagString.split("-") : [];

      const where = {
        ...(title ? { title: { contains: title, mode: "insensitive" } } : {}),
        ...(typeof faveBoolean === "boolean" ? { fave: faveBoolean } : {}),
        ...(tagArray.length ? { tags: { hasSome: tagArray } } : {}),
      };

      const activities = await prisma.activity.findMany({
        where,
        include: { trips: true },
        orderBy: { title: "asc" },
      });

      res.json(activities);
    } catch (err) {
      next(err);
    }
  }
);

//GET api/activity/:activityId
router.get(
  "/:activityId",
  async (req: Request, res: Response, next: NextFunction) => {
    const activityId = req.params.activityId;
    try {
      const response = await prisma.activity.findUnique({
        where: { id: activityId },
        include: { trips: true },
      });
      res.status(201).json(response);
      return;
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
