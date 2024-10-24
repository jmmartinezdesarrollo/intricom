/*
  Warnings:

  - You are about to drop the column `name` on the `HotelBooking` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HotelBooking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hotelId" INTEGER NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "HotelBooking_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HotelBooking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HotelBooking" ("clientId", "createDate", "hotelId", "id") SELECT "clientId", "createDate", "hotelId", "id" FROM "HotelBooking";
DROP TABLE "HotelBooking";
ALTER TABLE "new_HotelBooking" RENAME TO "HotelBooking";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
