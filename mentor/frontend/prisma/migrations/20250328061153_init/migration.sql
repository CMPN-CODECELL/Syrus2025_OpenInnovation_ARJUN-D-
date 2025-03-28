-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "project_description" TEXT NOT NULL,
    "skill_area" TEXT NOT NULL,
    "mentor_wallet" TEXT NOT NULL,
    "tx_hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_mentor_wallet_key" ON "Project"("mentor_wallet");

-- CreateIndex
CREATE UNIQUE INDEX "Project_tx_hash_key" ON "Project"("tx_hash");
