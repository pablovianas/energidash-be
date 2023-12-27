export function extractInformations(invoice: string[]): any {
    const result: any = {};

    for (let line = 0; line < invoice.length; line++) {
        if (invoice[line].includes('Nº DO CLIENTE')){
            const customerId = invoice[line + 1].trim().substring(0, 10)
            const instalationId = invoice[line + 1].trim().substring(18, 28);
            result.customerId = customerId
            result.instalationId = instalationId
        }

        if (invoice[line].includes('Referente a')) {
            const referenceMonth = invoice[line + 1].trim().substring(0, 8)
            result.referenceMonth = referenceMonth
        }

        if (invoice[line].includes('Energia ElétricakWh')) {
        
            const values = invoice[line].split(/\s+/).filter(Boolean);
            
            result.electricEnergy = {
                electricEnergyKwh: values[2],
                electricEnergyValue: values[4],
            };
        }

        if (invoice[line].includes('Energia SCEE s/ ICMS')) {
            const values = invoice[line].split(/\s+/).filter(Boolean);
            result.sceeeEnergy = {
                sceeeEnergyKwh: values[4],
                sceeeEnergyValue: values[6],
            };
        }

        if (invoice[line].includes('Energia compensada GD I')) {
            const values = invoice[line].split(/\s+/).filter(Boolean);
            result.compensatedEnergy = {
                compensatedEnergyGdIKwh: values[4],
                compensatedEnergyGdIValue: values[6],
            };
        }

        if (invoice[line].includes('Contrib Ilum Publica Municipal')) {
            result.municipalPublicLightingContributionValue = parseFloat(invoice[line].split('Contrib Ilum Publica Municipal')[1].trim().replace(',', '.'));
        }
    }
    return result;
}