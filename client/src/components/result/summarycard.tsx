import Card from "@/components/common/card";
import { ImportSummary } from "@/types/api.types";

interface Props {
  summary: ImportSummary;
}

export default function SummaryCards({
  summary,
}: Props) {

  return (

    <div className="grid grid-cols-3 gap-6">

      <Card>

        <p className="text-gray-500">
          Total Records
        </p>

        <h1 className="text-5xl font-bold mt-3">
          {summary.totalRows}
        </h1>

      </Card>

      <Card>

        <p className="text-gray-500">
          Mapped Columns
        </p>

        <h1 className="text-5xl font-bold text-green-600 mt-3">
          {summary.mappedColumns}
        </h1>

      </Card>

      <Card>

        <p className="text-gray-500">
          Unmapped Columns
        </p>

        <h1 className="text-5xl font-bold text-red-600 mt-3">
          {summary.unmappedColumns}
        </h1>

      </Card>

    </div>

  );

}