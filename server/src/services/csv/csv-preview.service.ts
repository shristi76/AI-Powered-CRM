// import { CSVRow } from "../../types/csv.types";

// export class CSVPreviewService {
//   static generate(rows: CSVRow[]) {
//     const firstRow = rows[0];

//     if (!firstRow) {
//       throw new Error("CSV contains no rows.");
//     }

//     return {
//       totalRows: rows.length,
//       headers: Object.keys(firstRow),
//       preview: rows.slice(0, 10),
//     };
//   }
// }
import { ParsedCSV } from "../../types/csv.types";

export class CSVPreviewService {
  static generate(parsedCSV: ParsedCSV) {
    return {
      totalRows: parsedCSV.totalRows,
      headers: parsedCSV.headers,
      preview: parsedCSV.rows.slice(0, 10),
    };
  }
}