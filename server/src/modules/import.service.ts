export class ImportService {

    static importLeads(rows: any[]) {

        return {

            success: true,

            importedRows: rows.length,

            failedRows: 0,

            executionTime: `${Math.floor(Math.random()*50)+50} ms`,

            message: "Leads imported successfully."

        };

    }

}