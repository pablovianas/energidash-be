export function formatMonth(month: string) {

    const months: { [key: string]: string }  ={
        'JAN': '01',
        'FEV': '02',
        'MAR': '03',
        'ABR': '04',
        'MAI': '05',
        'JUN': '06',
        'JUL': '07',
        'AGO': '08',
        'SET': '09',
        'OUT': '10',
        'NOV': '11',
        'DEZ': '12',
    };

    const [nameMonth, year] = month.split('/');

    const monthNumber = months[nameMonth.toUpperCase()];

    const monthFormatted = `${monthNumber}-${year}`;

    return monthFormatted;
}


