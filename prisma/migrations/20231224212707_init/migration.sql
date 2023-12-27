-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "referenceMonth" TEXT NOT NULL,
    "electricEnergyKwh" DOUBLE PRECISION NOT NULL,
    "electricEnergyValue" DOUBLE PRECISION NOT NULL,
    "sceeeEnergyKwh" DOUBLE PRECISION NOT NULL,
    "sceeeEnergyValue" DOUBLE PRECISION NOT NULL,
    "compensatedEnergyGdIKwh" DOUBLE PRECISION NOT NULL,
    "compensatedEnergyGdIValue" DOUBLE PRECISION NOT NULL,
    "municipalPublicLightingContributionValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
