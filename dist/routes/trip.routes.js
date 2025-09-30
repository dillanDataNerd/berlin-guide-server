"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const index_1 = __importDefault(require("../db/index"));
//GET api/trip
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trips = yield index_1.default.trip.findMany({
            include: { activities: true },
        });
        res.status(201).json(trips);
    }
    catch (err) {
        next(err);
    }
}));
//GET api/trip/:tripId
router.get("/:tripId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tripId = req.params.tripId;
    try {
        const tripResponse = yield index_1.default.trip.findUnique({
            where: { id: tripId },
            include: { activities: true },
        });
        res.status(201).json(tripResponse);
    }
    catch (error) {
        next(error);
    }
}));
// POST api/trip/tripId
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const body = req.body;
    try {
        const trip = yield index_1.default.trip.create({
            data: {
                title: body.title,
                guests: body.guests, // string[]
                dateStarted: body.dateStarted,
                daysInBerlin: body.daysInBerlin,
                highlights: body.highlights,
                interestingThings: body.interestingThings,
                photoUrl: (_a = body.photoUrl) !== null && _a !== void 0 ? _a : null,
                activities: (_b = body.activities) !== null && _b !== void 0 ? _b : [],
            },
            include: { activities: true },
        });
        res.status(201).json(trip);
    }
    catch (error) {
        next(error);
    }
}));
// Patch api/trip/tripId
router.patch("/:tripId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tripId = req.params.tripId;
    const newTripBody = req.body;
    try {
        const tripResponse = yield index_1.default.trip.update({
            where: { id: tripId },
            data: newTripBody,
        });
        res.status(200).json(tripResponse);
    }
    catch (error) {
        next(error);
    }
}));
// DELETE api/trip/:tripId
router.delete("/:tripId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tripId = req.params.tripId;
    try {
        const tripResponse = yield index_1.default.trip.delete({
            where: { id: tripId },
        });
        res.status(200).json(tripResponse);
    }
    catch (error) {
        next(error);
    }
}));
module.exports = router;
