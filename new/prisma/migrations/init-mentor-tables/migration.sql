-- CreateTable
CREATE TABLE IF NOT EXISTS "Mentor" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "expertise" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "wallet" TEXT NOT NULL UNIQUE,
  "tx_hash" TEXT NOT NULL,
  "isApproved" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Project" (
  "id" SERIAL PRIMARY KEY,
  "projectName" TEXT NOT NULL,
  "projectDescription" TEXT NOT NULL,
  "skillArea" TEXT NOT NULL,
  "mentorWallet" TEXT NOT NULL,
  "studentWallet" TEXT,
  "tx_hash" TEXT NOT NULL,
  "isAssigned" BOOLEAN NOT NULL DEFAULT false,
  "isCompleted" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Project_mentorWallet_fkey" FOREIGN KEY ("mentorWallet") REFERENCES "Mentor" ("wallet") ON DELETE CASCADE ON UPDATE CASCADE
); 