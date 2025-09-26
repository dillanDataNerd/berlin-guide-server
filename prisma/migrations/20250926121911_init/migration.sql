-- CreateEnum
CREATE TYPE "public"."ActivityTag" AS ENUM ('FOOD', 'HISTORIC', 'PARTY', 'DILLAN_SPECIAL', 'SEASON_SUMMER', 'SEASON_WINTER', 'SEASON_ALL');

-- CreateTable
CREATE TABLE "public"."Activity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "photoUrl" TEXT NOT NULL,
    "tags" "public"."ActivityTag"[],
    "fave" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "guests" TEXT[],
    "dateStarted" TIMESTAMP(3) NOT NULL,
    "daysInBerlin" INTEGER,
    "highlights" TEXT,
    "interestingThings" TEXT,
    "photoUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ActivityToTrip" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActivityToTrip_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_id_key" ON "public"."Activity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_id_key" ON "public"."Trip"("id");

-- CreateIndex
CREATE INDEX "_ActivityToTrip_B_index" ON "public"."_ActivityToTrip"("B");

-- AddForeignKey
ALTER TABLE "public"."_ActivityToTrip" ADD CONSTRAINT "_ActivityToTrip_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActivityToTrip" ADD CONSTRAINT "_ActivityToTrip_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
