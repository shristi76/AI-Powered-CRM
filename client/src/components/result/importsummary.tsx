import { ImportSummary as SummaryType } from "@/types/api.types";

interface Props {
  summary: SummaryType;
}

export default function ImportSummary({
  summary,
}: Props) {
  return (
    <div className="mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Step 4 · Import Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">

          <p className="text-gray-500">
            Total Records
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {summary.totalRows}
          </h1>

        </div>

        <div className="bg-green-100 rounded-xl shadow-lg p-6">

          <p className="text-green-700">
            Imported Successfully
          </p>

          <h1 className="text-4xl font-bold mt-2 text-green-700">
            {summary.mappedColumns}
          </h1>

        </div>

        <div className="bg-red-100 rounded-xl shadow-lg p-6">

          <p className="text-red-700">
            Unmapped Columns
          </p>

          <h1 className="text-4xl font-bold mt-2 text-red-700">
            {summary.unmappedColumns}
          </h1>

        </div>

      </div>

    </div>
  );
}