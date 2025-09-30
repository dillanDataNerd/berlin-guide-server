"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
exports.default = prisma;
