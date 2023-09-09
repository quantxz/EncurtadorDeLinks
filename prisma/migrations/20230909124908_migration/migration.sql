-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_urls" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_urls" ("id", "url") SELECT "id", "url" FROM "urls";
DROP TABLE "urls";
ALTER TABLE "new_urls" RENAME TO "urls";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
