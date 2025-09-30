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
//GET api/activity
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield index_1.default.activity.findMany({ include: { trips: true } });
        res.json(activities);
        return;
    }
    catch (err) {
        next(err);
    }
}));
//GET api/activity/:activityId
router.get("/:activityId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const activityId = req.params.activityId;
    try {
        const response = yield index_1.default.activity.findUnique({ where: { id: activityId }, include: { trips: true } });
        res.status(201).json(response);
        return;
    }
    catch (err) {
        next(err);
    }
}));
module.exports = router;
