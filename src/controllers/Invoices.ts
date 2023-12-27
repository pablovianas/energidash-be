import { invoices } from '../utils/pdf-reading'

import prisma from '../config/prisma'

class Invoice {
    async create(invoicesInformations:  typeof invoices) {
        try {
            invoicesInformations.map( async (informations)=>{
                await prisma.invoice.createMany({
                    data: {
                        customerId: informations.customerId,
                        instalationId: informations.instalationId,
                        referenceMonth: informations.referenceMonth,
                        electricEnergyKwh: parseFloat(informations.electricEnergy.electricEnergyKwh),
                        electricEnergyValue: parseFloat(informations.electricEnergy.electricEnergyValue.replace(',', '.')),
                        sceeeEnergyKwh: parseFloat(informations.sceeeEnergy.sceeeEnergyKwh),
                        sceeeEnergyValue: parseFloat(informations.sceeeEnergy.sceeeEnergyValue.replace(',', '.')),
                        compensatedEnergyGdIKwh: parseFloat(informations.compensatedEnergy.compensatedEnergyGdIKwh),
                        compensatedEnergyGdIValue: parseFloat(informations.compensatedEnergy.compensatedEnergyGdIValue.replace(',', '.')),
                        municipalPublicLightingContributionValue: informations.municipalPublicLightingContributionValue
                    }
                })
            })
            console.log('Invoices created successfully');
        } catch (error) {
            console.log(error);
        }finally{
            await prisma.$disconnect();
        }

    }
    async getByCustomerID(customerID: string){
        try {
            const result = await prisma.invoice.findMany({
                where: {
                    customerId: customerID
                }
            })
            return result
        } catch (error) {
            console.log(error);
        }finally{
            await prisma.$disconnect();
        }
    }

    async getAll(){
        try {
            const result = await prisma.invoice.findMany();
            return result
        } catch (error) {
            console.log(error);
        }finally{
            await prisma.$disconnect();
        }
    }

    async getFileDownload(customerId: string, referenceMonth: string){
        try {
            const result = await prisma.invoice.findFirst({
                where: {
                    customerId, 
                    referenceMonth
                }
            })
            return result
        } catch (error) {
            console.log(error);
        }finally{
            await prisma.$disconnect()
        }
    }
}

export { Invoice }