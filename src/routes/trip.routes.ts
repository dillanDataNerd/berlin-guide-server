import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import prisma from "../db/index";
import { Trip } from "../generated/prisma";

//GET api/trip
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trips: Trip[] = await prisma.trip.findMany({
      include: { activities: true },
    });
    res.status(201).json(trips);
  } catch (err) {
    next(err);
  }
});

//GET api/trip/:tripId
router.get(
  "/:tripId",
  async (req: Request, res: Response, next: NextFunction) => {
    const tripId = req.params.tripId;
    try {
      const tripResponse = await prisma.trip.findUnique({
        where: { id: tripId },
        include: { activities: true },
      });
      res.status(201).json(tripResponse);
    } catch (error) {
      next(error);
    }
  }
);

// POST api/trip/tripId

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  try {
    const trip = await prisma.trip.create({
      data: {
        title: body.title,
        guests: body.guests, // string[]
        dateStarted: body.dateStarted,
        daysInBerlin: body.daysInBerlin,
        highlights: body.highlights,
        interestingThings: body.interestingThings,
        photoUrl: body.photoUrl ?? null,
        activities: body.activities?? [],
      },
      include: { activities: true },
    });

    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
});

// Patch api/trip/tripId
router.patch(
  "/:tripId",
  async (req: Request, res: Response, next: NextFunction) => {
    const tripId: string = req.params.tripId;
    const newTripBody = req.body;

    try {
      const tripResponse = await prisma.trip.update({
        where: { id: tripId },
        data: newTripBody,
      });
      res.status(200).json(tripResponse);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
